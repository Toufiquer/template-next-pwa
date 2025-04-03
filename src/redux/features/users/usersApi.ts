/*
|-----------------------------------------
| setting up UsersApi for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api

import { toast } from 'react-toastify';

import { apiSlice } from '@/redux/api/apiSlice';
import { IUser } from '@/app/api/v1/users/userModel';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    getUsers: builder.query({
      query: ({ page, limit }) => `/api/v1/users?page=${page || 1}&limit=${limit || 2}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const query = await queryFulfilled;
          console.log('query : ', query);
        } catch (e: unknown) {
          if (e instanceof Error) {
            toast.error(e.message, {
              toastId: (Math.random() * 1000).toFixed(0),
            });
          }
        }
      },
    }),
    addUser: builder.mutation({
      query: newUser => ({
        url: '/api/v1/users',
        method: 'POST',
        body: newUser,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IUser; message: string } } = await queryFulfilled;

          toast.success(data.message, {
            toastId: (Math.random() * 1000).toFixed(0),
          });

          // Update cache for getUsers
          dispatch(
            usersApi.util.updateQueryData('getUsers', { page: 1, limit: 2 }, draft => {
              draft.data.push(data.data); // Assuming `data.user` contains the new user
              draft.data.total = draft.data.total + 1; // Increment total count
            }),
          );
        } catch (e: unknown) {
          if (e instanceof Error) {
            toast.error(e.message, {
              toastId: (Math.random() * 1000).toFixed(0),
            });
          }
        }
      },
    }),
  }),
});
export const { useGetUsersQuery, useAddUserMutation } = usersApi;
