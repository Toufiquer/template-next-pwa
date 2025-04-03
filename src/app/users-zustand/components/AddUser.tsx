import React from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IUser } from '@/app/api/v1/users/userModel';

import { useUserStore } from '../store/userStore';

const AddUser: React.FC = () => {
  const { toggleAddModal, isAddModalOpen, users, newUser, setNewUser, setUsers } = useUserStore();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setNewUser({ ...newUser, role: value as 'user' | 'admin' | 'moderator' });
  };

  const handleAddUser = () => {
    const user: IUser = {
      name: newUser.name || '',
      email: newUser.email || '',
      passCode: newUser.passCode || '',
      alias: newUser.alias || '',
      role: (newUser.role as 'user' | 'admin' | 'moderator') || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUsers([...users, user]);
    toggleAddModal(false);
    setNewUser({ name: '', email: '', passCode: '', alias: '', role: 'user' });
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" value={newUser.name} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" value={newUser.email} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="passCode" className="text-right">
              Pass Code
            </Label>
            <Input id="passCode" name="passCode" type="password" value={newUser.passCode} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alias" className="text-right">
              Alias
            </Label>
            <Input id="alias" name="alias" value={newUser.alias} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select onValueChange={handleRoleChange} defaultValue="user">
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
        <DialogFooter>
          <Button variant="outline" className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(false)}>
            Cancel
          </Button>
          <Button variant="outline" className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={handleAddUser}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
