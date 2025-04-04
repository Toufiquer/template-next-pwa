import React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useUserStore } from '../store/userStore';
import { baseIUser } from '../store/userStoreConstants';
import { useDeleteUserMutation } from '@/redux/features/users/usersApi';

const DeleteUser: React.FC = () => {
  const { toggleDeleteModal, isDeleteModalOpen, selectedUser, setSelectedUser } = useUserStore();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser({ id: selectedUser._id }).unwrap();
      toggleDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={toggleDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="py-4">
            <p>
              You are about to delete user: <span className="font-semibold">{selectedUser.name}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            variant="outline"
            onClick={() => {
              toggleDeleteModal(false);
              setSelectedUser(baseIUser);
            }}
          >
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
