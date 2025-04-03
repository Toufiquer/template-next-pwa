import { create } from 'zustand';
import { IUser } from '@/app/api/v1/users/userModel';

interface UserStore {
  users: IUser[];
  selectedUser: IUser | null;
  newUser: Partial<IUser>;
  isOpen: boolean;
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
  setIsOpen: (isOpen: boolean) => void;
}

export const useUserStore = create<UserStore>(set => ({
  users: [
    {
      name: 'John Doe',
      email: 'john@example.com',
      passCode: 'pass123',
      alias: 'johndoe',
      role: 'admin',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-04-01'),
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      passCode: 'pass456',
      alias: 'janesmith',
      role: 'moderator',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-28'),
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      passCode: 'pass789',
      alias: 'bobjohnson',
      role: 'user',
      createdAt: new Date('2024-03-25'),
      updatedAt: new Date('2024-03-27'),
    },
  ],
  selectedUser: null,
  newUser: { name: '', email: '', passCode: '', alias: '', role: 'user' },
  isOpen: false,
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  setUsers: (users: IUser[]) => set({ users }),
  setSelectedUser: user => set({ selectedUser: user }),
  setNewUser: user => set(state => ({
    newUser: typeof user === 'function' ? user(state.newUser) : user,
  })),
  toggleAddModal: isOpen => set({ isAddModalOpen: isOpen }),
  toggleViewModal: isOpen => set({ isViewModalOpen: isOpen }),
  toggleEditModal: isOpen => set({ isEditModalOpen: isOpen }),
  toggleDeleteModal: isOpen => set({ isDeleteModalOpen: isOpen }),
  setIsOpen: isOpen => set({ isOpen }),
}));
