import { create } from 'zustand';
import { I_3_template_ } from '@/app/api/v1/6template/7filenameModel';
import { _3_template_Store } from '@/app/6template/store/userStoreTypes';
import { baseI_3_template_ } from '@/app/6template/store/userStoreConstants';

export const use_3_template_Store = create<_3_template_Store>(set => ({
  _2_template_: [],
  selected_3_template_: null,
  new_3_template_: baseI_3_template_,
  isBulkEditModalOpen: false,
  isBulkDeleteModalOpen: false,
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  bulkData: [],
  setBulkData: (bulkData: I_3_template_[]) => set({ bulkData }),
  set_1_template_: (_2_template_: I_3_template_[]) => set({ _2_template_ }),
  setSelected_3_template_: user => set({ selected_3_template_: user }),
  setNew_3_template_: user =>
    set(state => ({
      new_3_template_: typeof user === 'function' ? user(state.new_3_template_) : user,
    })),
  toggleAddModal: data => set({ isAddModalOpen: data }),
  toggleViewModal: data => set({ isViewModalOpen: data }),
  toggleEditModal: data => set({ isEditModalOpen: data }),
  toggleDeleteModal: data => set({ isDeleteModalOpen: data }),
  toggleBulkEditModal: data => set({ isBulkEditModalOpen: data }),
  toggleBulkDeleteModal: data => set({ isBulkDeleteModalOpen: data }),
}));
