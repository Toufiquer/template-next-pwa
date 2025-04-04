/*
|-----------------------------------------
| setting up _1_template_Slice for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// If you want to update store then this file help you to update
import { IUser } from '@/app/api/v1/users/userModel';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: IUser[];
} = {
  isLoading: false,
  isError: false,
  error: '',
  data: [],
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pushAllData: (state, action) => {
      state.data.push(action.payload);
    },
    addOneUser: (state, action) => {
      // Add the new user to the state data array.
      state.data.push(action.payload);
    },
    removeOneUser: (state, action) => {
      const idx = state.data.indexOf(action.payload);
      if (idx !== -1) {
        state.data.splice(idx, 1);
      }
    },
  },
});
export const { pushAllData, addOneUser, removeOneUser } = usersSlice.actions;
export default usersSlice.reducer;
