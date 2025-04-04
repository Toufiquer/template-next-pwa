import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUserStore } from '@/app/6template/store/userStore';
import { baseIUser } from '@/app/6template/store/userStoreConstants';
import { useDeleteUserMutation } from '@/redux/features/6template/_2_template_Api';
import { IUser } from '@/app/api/v1/6template/userModel';

const DeleteUser: React.FC = () => {
  const { toggleDeleteModal, isDeleteModalOpen, selectedUser, setSelectedUser } = useUserStore();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteUser({ id: selectedUser._id }).unwrap();
        toggleDeleteModal(false);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleCancel = () => {
    toggleDeleteModal(false);
    setSelectedUser({ ...baseIUser } as IUser);
  };

  const { name = '' } = selectedUser || {};

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={toggleDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="py-4">
            <p>
              You are about to delete user: <span className="font-semibold">{(name as string) || ''}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="cursor-pointer border-1 border-rose-400 hover:border-rose-500 text-rose-500" variant="outline" onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
