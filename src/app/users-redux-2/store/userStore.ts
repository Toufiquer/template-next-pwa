import { create } from 'zustand';
import { IUser } from '@/app/api/v1/users/userModel';

interface UserStore {
  users: IUser[];
  selectedUser: IUser | null;
  newUser: Partial<IUser>;
  isAddModalOpen: boolean;
  isViewModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setNewUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  isOpenBulkModal: boolean;
  bulkData: IUser[];
  setUsers: (users: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
  toggleOpenBulkModal: (user: boolean) => void;
  setBulkData: (bulkData: IUser[]) => void;
}

export const useUserStore = create<UserStore>(set => ({
  users: [],
  selectedUser: null,
  newUser: { name: '', email: '', passCode: '', alias: '', role: 'user' },
  isOpenBulkModal: false,
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  bulkData: [],
  setBulkData: (bulkData: IUser[]) => set({ bulkData }),
  setUsers: (users: IUser[]) => set({ users }),
  setSelectedUser: user => set({ selectedUser: user }),
  setNewUser: user =>
    set(state => ({
      newUser: typeof user === 'function' ? user(state.newUser) : user,
    })),
  toggleAddModal: data => set({ isAddModalOpen: data }),
  toggleViewModal: data => set({ isViewModalOpen: data }),
  toggleEditModal: data => set({ isEditModalOpen: data }),
  toggleDeleteModal: data => set({ isDeleteModalOpen: data }),
  toggleOpenBulkModal: data => set({ isOpenBulkModal: data }),
}));
