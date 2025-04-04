import React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useUserStore } from '../store/userStore';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { userRole } from './EditUser';
import { IUser } from '@/app/api/v1/users/userModel';
import { useBulkUpdateUsersMutation } from '@/redux/features/users/usersApi';
import { ScrollArea } from '@/components/ui/scroll-area';

const BulkEditUser: React.FC = () => {
  const { isBulkEditModalOpen, toggleBulkEditModal, bulkData, setBulkData } = useUserStore();
  const [bulkUpdateUsers, { isLoading }] = useBulkUpdateUsersMutation();

  const handleBulkEditUser = async () => {
    if (bulkData.length === 0) {
      return;
    }
    try {
      const newBulkData = bulkData.map(user => ({ id: user._id, updateData: user }));
      await bulkUpdateUsers(newBulkData).unwrap();
      toggleBulkEditModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit users:', error);
    }
  };
  const handleRoleChange = (user: IUser, role: string) => {
    const updatedBulkData = bulkData.map(curr => {
      if (curr._id === user._id) {
        return { ...curr, role: role };
      }
      return curr;
    });
    setBulkData(updatedBulkData as IUser[]);
    console.log('Updated bulkData:', bulkData);
  };
  return (
    <Dialog open={isBulkEditModalOpen} onOpenChange={toggleBulkEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Update</DialogTitle>
        </DialogHeader>
        {bulkData.length > 0 && (
          <div className="pt-4">
            <p>
              You are about to update <span className="font-semibold">({bulkData.length})</span> users
            </p>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="w-full flex flex-col">
            {bulkData.map((curr, idx) => (
              <div key={(curr._id as string) || idx} className="w-full flex items-center justify-between gap-2 mt-1">
                <div className="">
                  {idx + 1}. {(curr.name as string) || ''}
                </div>
                <div className="flex justify-between items-center gap-4 min-w-[180px]">
                  <Label htmlFor="edit-role" className="text-right">
                    Role
                  </Label>
                  <Select onValueChange={e => handleRoleChange(curr, e)} defaultValue={(curr.role as string) || ''}>
                    <SelectTrigger className="col-span-3 bg-slate-50">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className=" bg-slate-50">
                      {userRole?.map((i, index) => (
                        <SelectItem key={i + index} className="cursor-pointer hover:bg-slate-200" value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={() => toggleBulkEditModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            className="cursor-pointer border-1 border-green-400 hover:border-green-500 text-green-500"
            variant="outline"
            onClick={handleBulkEditUser}
          >
            Update Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEditUser;
