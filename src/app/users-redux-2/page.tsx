'use client';

import React from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useUserStore } from './store/userStore';

import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import DeleteUser from './components/DeleteUser';
import ViewUsersTable from './components/ViewUsersTable';
import { useGetUsersQuery } from '@/redux/features/users/usersApi';

const UserTable: React.FC = () => {
  const { toggleAddModal } = useUserStore();

  const { data: getResponseData } = useGetUsersQuery({ page: 1, limit: 1 });
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          User Management <sup className="text-xs">(total:{getResponseData?.total || '...'})</sup>
        </h1>
        <Button
          className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
          onClick={() => {
            toggleAddModal(true);
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
