import { IUser } from '@/app/api/v1/users/userModel';

export interface UserStore {
  users: IUser[];
  selectedUser: IUser | null;
  newUser: Partial<IUser>;
  isAddModalOpen: boolean;
  isViewModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setNewUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  isBulkEditModalOpen: boolean;
  isBulkDeleteModalOpen: boolean;
  bulkData: IUser[];
  set_1_template_: (users: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
  toggleBulkEditModal: (user: boolean) => void;
  toggleBulkDeleteModal: (user: boolean) => void;
  setBulkData: (bulkData: IUser[]) => void;
}
