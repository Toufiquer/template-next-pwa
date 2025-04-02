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

interface IUser {
  id: string;
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
}

interface ViewTableProps {
  users: IUser[];
  openViewModal: (user: IUser) => void;
  openEditModal: (user: IUser) => void;
  openDeleteModal: (user: IUser) => void;
}

const ViewUsersTable: React.FC<ViewTableProps> = ({
  users,
  openViewModal,
  openEditModal,
  openDeleteModal,
}) => {
  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');
  console.log('users : ', users);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Pass Code</TableHead>
            <TableHead className="hidden md:table-cell">Alias</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden lg:table-cell">Created At</TableHead>
            <TableHead className="flex justify-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
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

              <TableCell>
                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openViewModal(user)}
                    className="flex items-center justify-center"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    <span className="sm:hidden md:inline">View</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(user)}
                    className="flex items-center justify-center"
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    <span className="sm:hidden md:inline">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteModal(user)}
                    className="flex items-center justify-center text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    <span className="sm:hidden md:inline">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewUsersTable;
