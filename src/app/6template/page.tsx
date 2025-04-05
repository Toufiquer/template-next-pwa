'use client';

import React from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { use_3_template_Store } from '@/app/6template/store/filename7Store';
import View_1_template_Table from '@/app/6template/components/ViewFilename8Table';
import { useGet_1_template_Query } from '@/redux/features/6template/filename7Api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import AddFilename8 from '@/app/6template/components/AddFilename8';
import EditFilename8 from '@/app/6template/components/EditFilename8';
import ViewFilename8 from '@/app/6template/components/ViewFilename8';
import DeleteFilename8 from '@/app/6template/components/DeleteFilename8';
import BulkDeleteFilename8 from '@/app/6template/components/BulkDeleteFilename8';
import BulkEditFilename8 from '@/app/6template/components/BulkEditFilename8';
import TooManyRequests from '@/app/6template/components/TooManyRequest';

const Filename8Table: React.FC = () => {
  const { toggleAddModal } = use_3_template_Store();
  const {
    data: getResponseData,
    isSuccess,
    status: statusCode,
  } = useGet_1_template_Query(
    { page: 1, limit: 1 },
    {
      selectFromResult: ({ data, isSuccess, status, error }) => ({
        data,
        isSuccess,
        status: 'status' in (error || {}) ? (error as FetchBaseQueryError).status : status, // Extract HTTP status code
        error,
      }),
    },
  );

  const modals = [AddFilename8, ViewFilename8, BulkDeleteFilename8, BulkEditFilename8, EditFilename8, DeleteFilename8];
  let renderUI = (
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
  if (statusCode === 429) {
    renderUI = <TooManyRequests />;
  }
  return renderUI;
};

export default Filename8Table;
