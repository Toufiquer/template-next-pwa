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
import { pushAllData } from './usersSlice';
import { IUser } from '@/app/api/v1/users/userModel';
export const usersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    getUsers: builder.query({
      query: () => `/users`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const query = await queryFulfilled;
          // default all users is fetching.
          // after query is completed dispatch to usersSlice.
          query.data.forEach((i: IUser) => dispatch(pushAllData(i)));
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
export const { useGetUsersQuery } = usersApi;
