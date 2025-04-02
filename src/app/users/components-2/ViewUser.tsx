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

interface IUser {
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}

interface ViewUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

const ViewUser: React.FC<ViewUserProps> = ({ isOpen, onClose, user }) => {
  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        {user && <div className="grid gap-2">{/* ...existing user details... */}</div>}
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUser;
