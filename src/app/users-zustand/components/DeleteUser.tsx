import React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useUserStore } from '../store/userStore';

const DeleteUser: React.FC = () => {
  const { toggleDeleteModal, isDeleteModalOpen, users, selectedUser, setUsers } = useUserStore();
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.filter(user => user.email !== selectedUser.email);
    setUsers(updatedUsers);
    toggleDeleteModal(false);
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
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={() => toggleDeleteModal(false)}>
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
