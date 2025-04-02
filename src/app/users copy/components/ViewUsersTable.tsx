import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';
import { IUser } from '@/app/api/v1/users/userModel';

const ViewUsersTable: React.FC<{
  users: IUser[];
  setNewUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  users,
  setNewUser,
  setSelectedUser,
  setIsViewModalOpen,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
}) => {
  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=" font-bold text-slate-900">Name</TableHead>
          <TableHead className="hidden md:table-cell font-bold text-slate-900">Email</TableHead>
          <TableHead className="hidden lg:table-cell font-bold text-slate-900">Pass Code</TableHead>
          <TableHead className="hidden md:table-cell font-bold text-slate-900">Alias</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden lg:table-cell font-bold text-slate-900">
            Created At
          </TableHead>
          <TableHead className=" font-bold text-slate-900 justify-end flex">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: IUser, index) => (
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
                    setIsViewModalOpen(true);
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
                    setNewUser(user);
                    setIsEditModalOpen(true);
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
                    setIsDeleteModalOpen(true);
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
  );
};

export default ViewUsersTable;
