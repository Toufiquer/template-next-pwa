'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import ViewTable from './components-2/ViewTable';
import ViewUser from './components-2/ViewUser';
import UpdateUser from './components-2/UpdateUser';
import DeleteUser from './components-2/DeleteUser';

// Define user interface
interface IUser {
  id: string;
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}

const UserTable: React.FC = () => {
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <ViewTable
        users={users}
        openViewModal={openViewModal}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      <ViewUser
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
      />

      <UpdateUser
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={newUser}
        onInputChange={e => {
          const { name, value } = e.target;
          setNewUser({ ...newUser, [name]: value });
        }}
        onRoleChange={value =>
          setNewUser({ ...newUser, role: value as 'user' | 'admin' | 'moderator' })
        }
        onSave={handleEditUser}
      />

      <DeleteUser
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default UserTable;
