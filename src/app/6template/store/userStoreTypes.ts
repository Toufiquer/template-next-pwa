import { IUser } from '@/app/api/v1/6template/7filenameModel';

export interface UserStore {
  _2_template_: IUser[];
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
  set_1_template_: (_2_template_: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
  toggleBulkEditModal: (user: boolean) => void;
  toggleBulkDeleteModal: (user: boolean) => void;
  setBulkData: (bulkData: IUser[]) => void;
}
