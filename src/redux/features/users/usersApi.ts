/*
|-----------------------------------------
| setting up UsersApi for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api

import { toast } from 'react-toastify';

import { getAllUsersRTK } from './usersSlice';

import { apiSlice } from '@/redux/api/apiSlice';
import { IUser } from '@/app/api/v1/users/userModel';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    getUsers: builder.query({
      query: ({ page, limit }) => `/api/v1/users?page=${page || 1}&limit=${limit || 10}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const query = await queryFulfilled;
          console.log('query : ', query);
          // default all users is fetching.
          // after query is completed dispatch to usersSlice.
          query.data.data.forEach((i: IUser) => dispatch(getAllUsersRTK(i)));
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
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message, {
            toastId: (Math.random() * 1000).toFixed(0),
          });
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
