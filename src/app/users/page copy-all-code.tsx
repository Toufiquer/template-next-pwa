// components/UserTable.tsx
'use client'


import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';

// Define user interface
interface IUser {
  id: string; // Added for unique identification
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}

const UserTable: React.FC = () => {
  // Sample users data
  const [users, setUsers] = useState<IUser[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      passCode: 'pass123',
      alias: 'johndoe',
      role: 'admin',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-04-01'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      passCode: 'pass456',
      alias: 'janesmith',
      role: 'moderator',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-28'),
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      passCode: 'pass789',
      alias: 'bobjohnson',
      role: 'user',
      createdAt: new Date('2024-03-25'),
      updatedAt: new Date('2024-03-27'),
    },
  ]);

  // State for modal dialogs
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    name: '',
    email: '',
    passCode: '',
    alias: '',
    role: 'user',
  });

  // Modal handlers
  const openViewModal = (user: IUser) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openEditModal = (user: IUser) => {
    setSelectedUser(user);
    setNewUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user: IUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Form handlers
  const handleAddUser = () => {
    const user: IUser = {
      id: Date.now().toString(),
      name: newUser.name || '',
      email: newUser.email || '',
      passCode: newUser.passCode || '',
      alias: newUser.alias || '',
      role: (newUser.role as 'user' | 'admin' | 'moderator') || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setUsers([...users, user]);
    setIsAddModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      passCode: '',
      alias: '',
      role: 'user',
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user =>
      user.id === selectedUser.id
        ? {
            ...user,
            ...newUser,
            updatedAt: new Date(),
          }
        : user,
    );

    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteModalOpen(false);
  };

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // Role change handler
  const handleRoleChange = (value: string) => {
    setNewUser({
      ...newUser,
      role: value as 'user' | 'admin' | 'moderator',
    });
  };

  // Function to format date
  const formatDate = (date?: Date) => {
    return date ? format(date, 'MMM dd, yyyy') : 'N/A';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
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
                  <TableHead>Actions</TableHead>
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
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
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
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="passCode" className="text-right">
                Pass Code
              </Label>
              <Input
                id="passCode"
                name="passCode"
                type="password"
                value={newUser.passCode}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alias" className="text-right">
                Alias
              </Label>
              <Input
                id="alias"
                name="alias"
                value={newUser.alias}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange} defaultValue="user">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Name:</div>
                <div className="col-span-2">{selectedUser.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Email:</div>
                <div className="col-span-2">{selectedUser.email}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Pass Code:</div>
                <div className="col-span-2">{selectedUser.passCode}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Alias:</div>
                <div className="col-span-2">{selectedUser.alias}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Role:</div>
                <div className="col-span-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.role === 'admin'
                        ? 'bg-amber-100 text-amber-700'
                        : selectedUser.role === 'moderator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Created At:</div>
                <div className="col-span-2">{formatDate(selectedUser.createdAt)}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Updated At:</div>
                <div className="col-span-2">{formatDate(selectedUser.updatedAt)}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information by modifying the fields below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-passCode" className="text-right">
                Pass Code
              </Label>
              <Input
                id="edit-passCode"
                name="passCode"
                type="password"
                value={newUser.passCode}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alias" className="text-right">
                Alias
              </Label>
              <Input
                id="edit-alias"
                name="alias"
                value={newUser.alias}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange} defaultValue={newUser.role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleEditUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p>
                You are about to delete user:{' '}
                <span className="font-semibold">{selectedUser.name}</span>
              </p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
