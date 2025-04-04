'use client';

import React from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { use_3_template_Store } from '@/app/6template/store/userStore';
import View_1_template_Table from '@/app/6template/components/View7filenameTable';
import { useGet_1_template_Query } from '@/redux/features/6template/7filenameApi';

import AddUser from '@/app/6template/components/AddUser';
import EditUser from '@/app/6template/components/EditUser';
import ViewUser from '@/app/6template/components/ViewUser';
import DeleteUser from '@/app/6template/components/DeleteUser';
import BulkDeleteUser from '@/app/6template/components/BulkDeleteUser';
import BulkEditUser from '@/app/6template/components/BulkEditUser';

const Filename8Table: React.FC = () => {
  const { toggleAddModal } = use_3_template_Store();
  const { data: getResponseData, isSuccess } = useGet_1_template_Query({ page: 1, limit: 1 });

  const modals = [AddUser, ViewUser, BulkDeleteUser, BulkEditUser, EditUser, DeleteUser];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          _3_template_ Management {isSuccess && <sup className="text-xs">(total:{getResponseData?.data?.total || '00'})</sup>}
        </h1>
        <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add _3_template_
        </Button>
      </div>
      <View_1_template_Table />
      {modals.map((ModalComponent, index) => (
        <ModalComponent key={index} />
      ))}
    </div>
  );
};

export default Filename8Table;
