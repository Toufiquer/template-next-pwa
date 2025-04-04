'use client';

import React from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/app/users-redux/store/userStore';
import ViewUsersTable from '@/app/users-redux/components/ViewUsersTable';
import { useGetUsersQuery } from '@/redux/features/users/usersApi';

import AddUser from '@/app/users-redux/components/AddUser';
import EditUser from '@/app/users-redux/components/EditUser';
import ViewUser from '@/app/users-redux/components/ViewUser';
import DeleteUser from '@/app/users-redux/components/DeleteUser';
import BulkDeleteUser from '@/app/users-redux/components/BulkDeleteUser';
import BulkEditUser from '@/app/users-redux/components/BulkEditUser';

const UserTable: React.FC = () => {
  const { toggleAddModal } = useUserStore();
  const { data: getResponseData, isSuccess } = useGetUsersQuery({ page: 1, limit: 1 });

  const modals = [AddUser, ViewUser, BulkDeleteUser, BulkEditUser, EditUser, DeleteUser];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management {isSuccess && <sup className="text-xs">(total:{getResponseData?.data?.total || '00'})</sup>}</h1>
        <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      <ViewUsersTable />
      {modals.map((ModalComponent, index) => (
        <ModalComponent key={index} />
      ))}
    </div>
  );
};

export default UserTable;
