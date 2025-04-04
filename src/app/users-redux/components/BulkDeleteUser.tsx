import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUserStore } from '@/app/users-redux/store/userStore';
import { useBulkDelete_1_template_Mutation } from '@/redux/features/users/usersApi';
import { ScrollArea } from '@/components/ui/scroll-area';

const BulkDeleteUser: React.FC = () => {
  const { isBulkDeleteModalOpen, toggleBulkDeleteModal, bulkData, setBulkData } = useUserStore();
  const [bulkDelete_1_template_, { isLoading }] = useBulkDelete_1_template_Mutation();

  const handleBulkDeleteUser = async () => {
    if (!bulkData?.length) return;
    try {
      const ids = bulkData.map(user => user._id);
      await bulkDelete_1_template_({ ids }).unwrap();
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
        {bulkData?.length > 0 && (
          <div className="pt-4">
            <p>
              You are about to delete <span className="font-semibold">({bulkData.length})</span> users
            </p>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col">
            {bulkData.map((user, idx) => (
              <span key={(user._id as string) + idx} className="text-xs">
                {idx + 1}. {(user.name as string) || ''}
              </span>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={() => toggleBulkDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            className="cursor-pointer text-rose-500 border-rose-400 hover:border-rose-500"
            onClick={handleBulkDeleteUser}
          >
            Delete Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDeleteUser;
