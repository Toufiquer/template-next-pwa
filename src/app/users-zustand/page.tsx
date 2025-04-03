'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import ViewUsersTable from './components/ViewUsersTable';
import AddUser from './components/AddUser';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import { useUserStore } from './store/userStore';

const UserTable: React.FC = () => {
  const {
    toggleAddModal,
    isAddModalOpen,
    isViewModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    users,
    newUser,
    selectedUser,
    setNewUser,
    setSelectedUser,
    setUsers,
    setIsOpen,
  } = useUserStore();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button
          className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
          onClick={() => {
            toggleAddModal(true);
            setIsOpen(true);
          }}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      <ViewUsersTable />
      <AddUser />
      <ViewUser />
      <EditUser />
      <DeleteUser />
    </div>
  );
};

export default UserTable;
