import { create } from 'zustand';
import { IUser } from '@/app/api/v1/6template/7filenameModel';
import { UserStore } from '@/app/6template/store/userStoreTypes';
import { baseIUser } from '@/app/6template/store/userStoreConstants';

export const useUserStore = create<UserStore>(set => ({
  _2_template_: [],
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
  set_1_template_: (_2_template_: IUser[]) => set({ _2_template_ }),
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
