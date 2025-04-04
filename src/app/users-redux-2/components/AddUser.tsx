import React from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAddUserMutation } from '@/redux/features/users/usersApi';

import { useUserStore } from '../store/userStore';
import { ScrollArea } from '@/components/ui/scroll-area';

const InputField: React.FC<{
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, label, type = 'text', value, onChange }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-right">
      {label}
    </Label>
    <Input id={id} name={name} type={type} value={value} onChange={onChange} className="col-span-3" />
  </div>
);

const AddUser: React.FC = () => {
  const { toggleAddModal, isAddModalOpen, users, newUser, setNewUser, setUsers } = useUserStore();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setNewUser({ ...newUser, role: value as 'user' | 'admin' | 'moderator' });
  };

  const handleAddUser = async () => {
    const user = {
      name: newUser.name || '',
      email: newUser.email || '',
      passCode: newUser.passCode || '',
      alias: newUser.alias || '',
      role: (newUser.role as 'user' | 'admin' | 'moderator') || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const addedUser = await addUser(user).unwrap(); // Get the returned data
      setUsers([...users, addedUser]); // Use the returned data instead of the local `user` object
      toggleAddModal(false);
      setNewUser({ name: '', email: '', passCode: '', alias: '', role: 'user' });
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <InputField id="name" name="name" label="Name" value={(newUser.name as string) || ''} onChange={handleInputChange} />
            <InputField id="email" name="email" label="Email" type="email" value={(newUser.email as string) || ''} onChange={handleInputChange} />
            <InputField
              id="passCode"
              name="passCode"
              label="Pass Code"
              type="password"
              value={(newUser.passCode as string) || ''}
              onChange={handleInputChange}
            />
            <InputField id="alias" name="alias" label="Alias" value={(newUser.alias as string) || ''} onChange={handleInputChange} />
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
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(false)}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="outline" className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={handleAddUser}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
