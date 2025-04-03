import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IUser } from '@/app/api/v1/users/userModel';
import { useUserStore } from '../store/userStore';

const DeleteUser: React.FC = () => {
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
    isOpen,
  } = useUserStore();
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.filter(user => user.email !== selectedUser.email);
    setUsers(updatedUsers);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="py-4">
            <p>
              You are about to delete user:{' '}
              <span className="font-semibold">{selectedUser.name}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer border-1 border-rose-400 hover:border-rose-500 text-rose-500"
            variant="outline"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
