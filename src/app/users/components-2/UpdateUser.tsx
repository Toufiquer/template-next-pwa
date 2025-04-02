import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IUser {
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
}

interface UpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: Partial<IUser>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (value: string) => void;
  onSave: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({
  isOpen,
  onClose,
  user,
  onInputChange,
  onRoleChange,
  onSave,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information by modifying the fields below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* ...existing input fields for editing user... */}</div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
