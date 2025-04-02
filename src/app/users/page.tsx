'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import ViewUsersTable from './components/ViewUsersTable';
import AddUser from './components/AddUser';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import { IUser } from '@/app/api/v1/users/userModel';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      name: 'John Doe',
      email: 'john@example.com',
      passCode: 'pass123',
      alias: 'johndoe',
      role: 'admin',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-04-01'),
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      passCode: 'pass456',
      alias: 'janesmith',
      role: 'moderator',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-28'),
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      passCode: 'pass789',
      alias: 'bobjohnson',
      role: 'user',
      createdAt: new Date('2024-03-25'),
      updatedAt: new Date('2024-03-27'),
    },
  ]);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      <ViewUsersTable
        users={users}
        setSelectedUser={setSelectedUser}
        setIsViewModalOpen={setIsViewModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <AddUser
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        setUsers={setUsers}
        users={users}
      />
      <ViewUser
        isOpen={isViewModalOpen}
        setIsOpen={setIsViewModalOpen}
        selectedUser={selectedUser}
      />
      <EditUser
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        selectedUser={selectedUser}
        newUser={newUser}
        setNewUser={setNewUser}
        setUsers={setUsers}
        users={users}
      />
      <DeleteUser
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        selectedUser={selectedUser}
        setUsers={setUsers}
        users={users}
      />
    </div>
  );
};

export default UserTable;
