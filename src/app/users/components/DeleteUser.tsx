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

const DeleteUser: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: IUser | null;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  users: IUser[];
}> = ({ isOpen, setIsOpen, selectedUser, setUsers, users }) => {
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
