import { create } from 'zustand';
import { IUser } from '@/app/api/v1/users/userModel';
import { UserStore } from '@/app/users-redux/store/userStoreTypes';
import { baseIUser } from '@/app/users-redux/store/userStoreConstants';

export const useUserStore = create<UserStore>(set => ({
  users: [],
  selectedUser: null,
  newUser: baseIUser,
  isBulkEditModalOpen: false,
  isBulkDeleteModalOpen: false,
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  bulkData: [],
  setBulkData: (bulkData: IUser[]) => set({ bulkData }),
  set_1_template_: (users: IUser[]) => set({ users }),
  setSelectedUser: user => set({ selectedUser: user }),
  setNewUser: user =>
    set(state => ({
      newUser: typeof user === 'function' ? user(state.newUser) : user,
    })),
  toggleAddModal: data => set({ isAddModalOpen: data }),
  toggleViewModal: data => set({ isViewModalOpen: data }),
  toggleEditModal: data => set({ isEditModalOpen: data }),
  toggleDeleteModal: data => set({ isDeleteModalOpen: data }),
  toggleBulkEditModal: data => set({ isBulkEditModalOpen: data }),
  toggleBulkDeleteModal: data => set({ isBulkDeleteModalOpen: data }),
}));
