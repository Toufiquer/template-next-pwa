'use client';

import React, { useState } from 'react';
import ViewUsersTable from './components/ViewUsersTable';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import SingleViewUser from './components/SingleViewUser';

// Define user interface
export interface IUser {
  id: string;
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}

const UserManagementPage: React.FC = () => {
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

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button onClick={() => setIsAddModalOpen(true)}>Add User</button>
      </div>

      <ViewUsersTable
        users={users}
        onView={user => {
          setSelectedUser(user);
          setIsViewModalOpen(true);
        }}
        onEdit={user => {
          setSelectedUser(user);
          setIsEditModalOpen(true);
        }}
        onDelete={user => {
          setSelectedUser(user);
          setIsDeleteModalOpen(true);
        }}
      />

      <AddUser
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={newUser => setUsers([...users, newUser])}
      />

      <EditUser
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onEdit={updatedUser =>
          setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)))
        }
      />

      <DeleteUser
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
        onDelete={userId => setUsers(users.filter(u => u.id !== userId))}
      />

      <SingleViewUser
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagementPage;
