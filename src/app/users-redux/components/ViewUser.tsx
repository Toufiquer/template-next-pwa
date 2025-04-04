import React, { useEffect } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useUserStore } from '../store/userStore';
import { baseIUser } from '../store/userStoreConstants';
import { useGetUserByIdQuery } from '@/redux/features/users/usersApi';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IUser } from '@/app/api/v1/users/userModel';

const ViewUser: React.FC = () => {
  const { isViewModalOpen, selectedUser, toggleViewModal, setSelectedUser } = useUserStore();
  const { data: userData, refetch } = useGetUserByIdQuery(selectedUser?._id, { skip: !selectedUser?._id });

  useEffect(() => {
    if (selectedUser?._id) {
      refetch(); // Fetch the latest user data
    }
  }, [selectedUser?._id, refetch]);

  useEffect(() => {
    if (userData?.data) {
      setSelectedUser(userData.data); // Update selectedUser with the latest data
    }
  }, [userData, setSelectedUser]);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="grid grid-cols-3 gap-2">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || 'N/A'}</div>
    </div>
  );

  return (
    <Dialog open={isViewModalOpen} onOpenChange={toggleViewModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid gap-2">
              <DetailRow label="Name" value={selectedUser.name as string} />
              <DetailRow label="Email" value={selectedUser.email as string} />
              <DetailRow label="Pass Code" value={selectedUser.passCode as string} />
              <DetailRow label="Alias" value={selectedUser.alias as string} />
              <DetailRow
                label="Role"
                value={
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.role === 'admin'
                        ? 'bg-amber-100 text-amber-700'
                        : selectedUser.role === 'moderator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {selectedUser.role as string}
                  </span>
                }
              />
              <DetailRow label="Created At" value={formatDate(selectedUser.createdAt)} />
              <DetailRow label="Updated At" value={formatDate(selectedUser.updatedAt)} />
            </div>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            onClick={() => {
              toggleViewModal(false);
              setSelectedUser({ ...baseIUser } as IUser);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUser;
