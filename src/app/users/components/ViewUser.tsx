import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { IUser } from '@/app/api/v1/users/userModel';

const ViewUser: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: IUser | null;
}> = ({ isOpen, setIsOpen, selectedUser }) => {
  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="grid gap-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Name:</div>
              <div className="col-span-2">{selectedUser.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Email:</div>
              <div className="col-span-2">{selectedUser.email}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Pass Code:</div>
              <div className="col-span-2">{selectedUser.passCode}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Alias:</div>
              <div className="col-span-2">{selectedUser.alias}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Role:</div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedUser.role === 'admin'
                      ? 'bg-amber-100 text-amber-700'
                      : selectedUser.role === 'moderator'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedUser.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Created At:</div>
              <div className="col-span-2">{formatDate(selectedUser.createdAt)}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold">Updated At:</div>
              <div className="col-span-2">{formatDate(selectedUser.updatedAt)}</div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUser;
