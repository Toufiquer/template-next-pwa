import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { IUser } from '@/app/api/v1/users/userModel';
import { ScrollArea } from '@/components/ui/scroll-area';

const EditUser: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: IUser | null;
  newUser: Partial<IUser>;
  setNewUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  users: IUser[];
}> = ({ isOpen, setIsOpen, selectedUser, newUser, setNewUser, setUsers, users }) => {
  useEffect(() => {
    console.log('selectedUser : ', selectedUser);
    if (selectedUser) {
      setNewUser(selectedUser);
    }
  }, [selectedUser, setNewUser]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  console.log('selectedUser : ', selectedUser);
  const handleRoleChange = (value: string) => {
    setNewUser({ ...newUser, role: value as 'user' | 'admin' | 'moderator' });
  };

  const handleEditUser = () => {
    console.log('handle log');
    console.log('newUser', newUser);
    if (!selectedUser) return;
    const updatedUsers = users.map(user =>
      user.email === selectedUser.email ? { ...user, ...newUser, updatedAt: new Date() } : user,
    );
    console.log('');
    setUsers(updatedUsers);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-passCode" className="text-right">
                Pass Code
              </Label>
              <Input
                id="edit-passCode"
                name="passCode"
                type="password"
                value={newUser.passCode}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alias" className="text-right">
                Alias
              </Label>
              <Input
                id="edit-alias"
                name="alias"
                value={newUser.alias}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange} defaultValue={newUser.role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-12 pt-12" />
        </ScrollArea>
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditUser}
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
