import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUserStore } from '@/app/users-redux/store/userStore';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { userRole } from '@/app/users-redux/store/userStoreConstants';
import { IUser } from '@/app/api/v1/users/userModel';
import { useBulkUpdateUsersMutation } from '@/redux/features/users/usersApi';
import { ScrollArea } from '@/components/ui/scroll-area';

const BulkEditUser: React.FC = () => {
  const { isBulkEditModalOpen, toggleBulkEditModal, bulkData, setBulkData } = useUserStore();
  const [bulkUpdateUsers, { isLoading }] = useBulkUpdateUsersMutation();

  const handleBulkEditUser = async () => {
    if (!bulkData.length) return;
    try {
      const newBulkData = bulkData.map(({ _id, ...rest }) => ({ id: _id, updateData: rest }));
      await bulkUpdateUsers(newBulkData).unwrap();
      toggleBulkEditModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit users:', error);
    }
  };

  const handleRoleChange = (userId: string, role: string) => {
    setBulkData(bulkData.map(user => (user._id === userId ? { ...user, role } : user)) as IUser[]);
  };

  return (
    <Dialog open={isBulkEditModalOpen} onOpenChange={toggleBulkEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Update</DialogTitle>
        </DialogHeader>
        {bulkData.length > 0 && (
          <p className="pt-4">
            You are about to update <span className="font-semibold">({bulkData.length})</span> users
          </p>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {bulkData.map((user, idx) => (
              <div key={(user._id as string) || idx} className="flex items-center justify-between">
                <span>
                  {idx + 1}. {(user.name as string) || ''}
                </span>
                <div className="flex items-center gap-4 min-w-[180px]">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select onValueChange={role => handleRoleChange(user._id as string, role)} defaultValue={(user.role as string) || ''}>
                    <SelectTrigger className="bg-slate-50">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {userRole?.map((role, index) => (
                        <SelectItem key={role + index} value={role} className="cursor-pointer hover:bg-slate-200">
                          {role}
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
          <Button variant="outline" onClick={() => toggleBulkEditModal(false)} className="cursor-pointer border-slate-400 hover:border-slate-500">
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={handleBulkEditUser}
            className="cursor-pointer border-green-400 hover:border-green-500 text-green-500"
          >
            Update Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEditUser;
