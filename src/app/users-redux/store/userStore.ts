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
  setUsers: (users: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
  setNewUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
}

export const useUserStore = create<UserStore>(set => ({
  users: [],
  selectedUser: null,
  newUser: { name: '', email: '', passCode: '', alias: '', role: 'user' },

  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  setUsers: (users: IUser[]) => set({ users }),
  setSelectedUser: user => set({ selectedUser: user }),
  setNewUser: user =>
    set(state => ({
      newUser: typeof user === 'function' ? user(state.newUser) : user,
    })),
  toggleAddModal: isOpen => set({ isAddModalOpen: isOpen }),
  toggleViewModal: isOpen => set({ isViewModalOpen: isOpen }),
  toggleEditModal: isOpen => set({ isEditModalOpen: isOpen }),
  toggleDeleteModal: isOpen => set({ isDeleteModalOpen: isOpen }),
}));
