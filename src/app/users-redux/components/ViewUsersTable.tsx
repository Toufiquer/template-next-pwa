import React from 'react';
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

const ViewUsersTable: React.FC = () => {
  const { setSelectedUser, toggleViewModal, toggleEditModal, toggleDeleteModal } = useUserStore();

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const { data: getResponseData, isLoading, isError, error } = useGetUsersQuery({ page: 1, limit: 10 });

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
              <TableHead className=" font-bold text-slate-900">Name</TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-900">Email</TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-900">Pass Code</TableHead>
              <TableHead className="hidden md:table-cell font-bold text-slate-900">Alias</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden lg:table-cell font-bold text-slate-900">Created At</TableHead>
              <TableHead className=" font-bold text-slate-900 justify-end flex">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAllUsersData.map((user: IUser, index: number) => (
              <TableRow key={user.email || index}>
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
        <Pagination currentPage={1} itemsPerPage={10} onPageChange={() => ''} totalItems={100} />
      </div>
    );
  }
  return renderUI;
};

export default ViewUsersTable;
