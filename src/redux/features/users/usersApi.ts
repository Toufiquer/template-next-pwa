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
      providesTags: [{ type: 'Users', id: 'LIST' }], // Add tag for cache invalidation
      async onQueryStarted() {
        try {
        } catch (e: unknown) {
          if (e instanceof Error) {
            toast.error(e.message, {
              toastId: (Math.random() * 1000).toFixed(0),
            });
          }
        }
      },
    }),
    getUserById: builder.query({
      query: id => `/api/v1/users?id=${id}`,
    }),
    addUser: builder.mutation({
      query: newUser => ({
        url: '/api/v1/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'Users' }], // Automatically invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IUser; message: string } } = await queryFulfilled;

          toast.success(data.message, {
            toastId: (Math.random() * 1000).toFixed(0),
          });

          // Invalidate cache for getUsers to trigger re-fetch
          dispatch(usersApi.util.invalidateTags([{ type: 'Users' }]));
        } catch (e: unknown) {
          if (e instanceof Error) {
            toast.error(e.message, {
              toastId: (Math.random() * 1000).toFixed(0),
            });
          }
        }
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/users`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: 'Users' }], // Invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;

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
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/users`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'Users' }], // Invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;

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
    bulkUpdateUsers: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/users?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: 'Users' }], // Invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;

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
    bulkDeleteUsers: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/users?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: 'Users' }], // Invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;

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
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkUpdateUsersMutation,
  useBulkDeleteUsersMutation,
  useGetUserByIdQuery,
} = usersApi;
