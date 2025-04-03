'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';
import { IUser } from '@/app/api/v1/users/userModel';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Errer';
import { useGetUsersQuery } from '@/redux/features/users/usersApi';
import { useUserStore } from '../store/userStore';
import Pagination from './Pagination';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

const ViewUsersTable: React.FC = () => {
  const pageLimitArr = [2, 10, 50, 100, 200];
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(pageLimitArr[0]);
  const { setSelectedUser, toggleViewModal, toggleEditModal, toggleDeleteModal } = useUserStore();

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const { data: getResponseData, isLoading, isError, error } = useGetUsersQuery({ page, limit });

  const getAllUsersData = getResponseData?.data || [];
  let renderUI = <div>first Load</div>;
  if (isLoading && !isError) {
    renderUI = <LoadingComponent />;
  }
  if (!isLoading && isError) {
    if (error) {
      renderUI = <ErrorMessageComponent message={error} />;
    } else {
      renderUI = <div className="py-12 text-rose-700">{error}</div>;
    }
  }

  if (getAllUsersData.length === 0 && !isLoading) {
    renderUI = <div className="py-12 text-2xl text-slate-500">Ops! Nothing was found.</div>;
  }
  if (getAllUsersData.length > 0) {
    renderUI = (
      <div className="w-full flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-slate-900">Sl</TableHead>
              <TableHead className="font-bold text-slate-900">Name</TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-900">Email</TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-900">Pass Code</TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-900">Alias</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-900">Created At</TableHead>
              <TableHead className="font-bold text-slate-900 justify-end flex">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-1 border-slate-600">
            {getAllUsersData.map((user: IUser, index: number) => (
              <TableRow key={user.email || index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{user.passCode}</TableCell>
                <TableCell className="hidden md:table-cell">{user.alias}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-amber-100 text-amber-700'
                        : user.role === 'moderator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{formatDate(user.createdAt)}</TableCell>
                <TableCell className="justify-end flex">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        toggleViewModal(true);
                      }}
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        toggleEditModal(true);
                      }}
                    >
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        toggleDeleteModal(true);
                      }}
                      className="text-rose-400 hover:text-rose-500 cursor-pointer"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination currentPage={page} itemsPerPage={limit} onPageChange={setPage} totalItems={getResponseData.total} />
        <div className="max-w-[380px] flex items-center justify-between pl-2 gap-4 border-1 border-slate-200 rounded-xl w-full mx-auto mt-8">
          <Label htmlFor="set-limit" className="text-right text-slate-500 font-thin">
            User per page <div className="text-xs">(total:{getResponseData.total})</div>
          </Label>
          <Select
            onValueChange={value => {
              setLimit(Number(value));
              setPage(1);
            }}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="col-span-4">
              <SelectValue placeholder="Select a limit" />
            </SelectTrigger>
            <SelectContent>
              {pageLimitArr.map(i => (
                <SelectItem key={i} className="cursor-pointer hover:bg-slate-200" value={i.toString()}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
  return renderUI;
};

export default ViewUsersTable;
