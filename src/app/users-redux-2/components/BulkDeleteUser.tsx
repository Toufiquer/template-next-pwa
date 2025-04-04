import React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useUserStore } from '../store/userStore';
import { useBulkDeleteUsersMutation } from '@/redux/features/users/usersApi';

const BulkDeleteUser: React.FC = () => {
  const { isBulkDeleteModalOpen, toggleBulkDeleteModal, bulkData, setBulkData } = useUserStore();
  const [bulkDeleteUsers] = useBulkDeleteUsersMutation();

  const handleBulkDeleteUser = async () => {
    if (bulkData.length === 0) {
      return;
    }
    try {
      const newBulkData = bulkData.map(user => user._id);
      console.log('newBulkData', newBulkData);
      await bulkDeleteUsers({ ids: newBulkData }).unwrap();
      toggleBulkDeleteModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <Dialog open={isBulkDeleteModalOpen} onOpenChange={toggleBulkDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {bulkData.length > 0 && (
          <div className="pt-4">
            <p>
              You are about to delete <span className="font-semibold">({bulkData.length})</span> users
            </p>
          </div>
        )}
        <div className="w-full flex flex-col">
          {bulkData.map((curr, idx) => (
            <span key={curr._id} className="text-xs">
              {idx + 1}. {curr.name}
            </span>
          ))}
        </div>
        <DialogFooter>
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={() => toggleBulkDeleteModal(false)}>
            Cancel
          </Button>
          <Button className="cursor-pointer border-1 border-rose-400 hover:border-rose-500 text-rose-500" variant="outline" onClick={handleBulkDeleteUser}>
            Delete Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDeleteUser;
