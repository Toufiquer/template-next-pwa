import { IUser } from '@/app/api/v1/users/userModel';
import { useState } from 'react';

const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
const [newUser, setNewUser] = useState<Partial<IUser>>({
  name: '',
  email: '',
  passCode: '',
  alias: '',
  role: 'user',
});

const openViewModal = (user: IUser) => {
  setSelectedUser(user);
  setIsViewModalOpen(true);
};

const openEditModal = (user: IUser) => {
  setSelectedUser(user);
  setNewUser(user);
  setIsEditModalOpen(true);
};

const openDeleteModal = (user: IUser) => {
  setSelectedUser(user);
  setIsDeleteModalOpen(true);
};

const handleEditUser = () => {
  if (!selectedUser) return;

  const updatedUsers = users.map(user =>
    user.id === selectedUser.id
      ? {
          ...user,
          ...newUser,
          updatedAt: new Date(),
        }
      : user,
  );

  setUsers(updatedUsers);
  setIsEditModalOpen(false);
};

const handleDeleteUser = () => {
  if (!selectedUser) return;

  const updatedUsers = users.filter(user => user.id !== selectedUser.id);
  setUsers(updatedUsers);
  setIsDeleteModalOpen(false);
};

interface AddUserProps {
  setIsOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
  onAdd: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ isOpen, setIsOpen, onClose, user, onAdd }) => {
  {
    /* Add User Modal */
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="passCode" className="text-right">
              Pass Code
            </Label>
            <Input
              id="passCode"
              name="passCode"
              type="password"
              value={newUser.passCode}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alias" className="text-right">
              Alias
            </Label>
            <Input
              id="alias"
              name="alias"
              value={newUser.alias}
              onChange={handleInputChange}
              className="col-span-3"
            />
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
          <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAddUser}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
