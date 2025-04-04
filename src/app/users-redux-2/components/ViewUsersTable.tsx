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
import { Checkbox } from '@/components/ui/checkbox';

const ViewUsersTable: React.FC = () => {
  const pageLimitArr = [2, 10, 50, 100, 200];
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(pageLimitArr[0]);
  const { setSelectedUser, toggleBulkEditModal, toggleViewModal, toggleEditModal, toggleDeleteModal, bulkData, setBulkData, toggleBulkDeleteModal } =
    useUserStore();
  const [sortConfig, setSortConfig] = useState<{ key: keyof IUser; direction: 'asc' | 'desc' } | null>(null);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const { data: getResponseData, isLoading, isError, error } = useGetUsersQuery({ page, limit });
  const handleBulkDeleteModalOpen = () => {
    toggleBulkDeleteModal(true);
  };
  const handleBulkEditModalOpen = () => {
    toggleBulkEditModal(true);
  };
  const getAllUsersData = getResponseData?.data || [];
  const handleSort = (key: keyof IUser) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedUsersData = React.useMemo(() => {
    if (!sortConfig) return getAllUsersData;
    const sortedData = [...getAllUsersData];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [getAllUsersData, sortConfig]);

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

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setBulkData(getAllUsersData);
    } else {
      setBulkData([]);
    }
  };

  const handleSelectRow = (isChecked: boolean, user: IUser) => {
    if (isChecked) {
      setBulkData([...bulkData, user]);
    } else {
      setBulkData(bulkData.filter(item => item.email !== user.email));
    }
  };

  if (getAllUsersData.length === 0 && !isLoading) {
    renderUI = <div className="py-12 text-2xl text-slate-500">Ops! Nothing was found.</div>;
  }
  if (getAllUsersData.length > 0) {
    renderUI = (
      <div className="w-full flex flex-col">
        <div className="w-full my-4">
          <div className="w-full flex items-center justify-between gap-4 pb-2 border-b-1 border-slat-400">
            <div className="px-2 gap-2 flex items-center justify-start w-full">
              Total Selected <span className="text-xs text-slate-500">({bulkData.length})</span>
            </div>
            <div className="px-2 flex items-center justify-end w-full">
              <div className="w-full flex items-center justify-end gap-4">
                <Button variant="outline" className="cursor-pointer" size="sm" onClick={handleBulkEditModalOpen} disabled={bulkData.length === 0}>
                  <PencilIcon className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDeleteModalOpen}
                  className="text-rose-400 hover:text-rose-500 cursor-pointer"
                  disabled={bulkData.length === 0}
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader className="bg-slate-600 text-slate-50 rounded overflow-hidden border-1 border-slate-600">
            <TableRow>
              <TableHead className="font-bold text-slate-50">
                <Checkbox onCheckedChange={checked => handleSelectAll(!!checked)} checked={bulkData.length === getAllUsersData.length} />
              </TableHead>
              <TableHead className="font-bold text-slate-50 cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-50 cursor-pointer" onClick={() => handleSort('email')}>
                Email {sortConfig?.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-50 cursor-pointer" onClick={() => handleSort('passCode')}>
                Pass Code {sortConfig?.key === 'passCode' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-50 cursor-pointer" onClick={() => handleSort('alias')}>
                Alias {sortConfig?.key === 'alias' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-50 cursor-pointer" onClick={() => handleSort('role')}>
                Role {sortConfig?.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-50 cursor-pointer" onClick={() => handleSort('createdAt')}>
                Created At {sortConfig?.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-50 text-end pr-4 ">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-1 border-slate-600">
            {sortedUsersData.map((user: IUser, index: number) => (
              <TableRow key={(user.email as string) || '' || index}>
                <TableCell>
                  <Checkbox onCheckedChange={checked => handleSelectRow(!!checked, user)} checked={bulkData.some(item => item.email === user.email)} />
                </TableCell>
                <TableCell className="font-medium">{(user.name as string) || ''}</TableCell>
                <TableCell className="hidden md:table-cell">{(user.email as string) || ''}</TableCell>
                <TableCell className="hidden lg:table-cell">{(user.passCode as string) || ''}</TableCell>
                <TableCell className="hidden md:table-cell">{(user.alias as string) || ''}</TableCell>
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
                    {(user.role as string) || ''}
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
          <Label htmlFor="set-limit" className="text-right text-slate-500 font-thin pl-2">
            User per page
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
