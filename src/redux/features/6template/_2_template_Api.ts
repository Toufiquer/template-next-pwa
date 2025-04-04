/*
|-----------------------------------------
| setting up _1_template_Api for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api

import { toast } from 'react-toastify';

import { apiSlice } from '@/redux/api/apiSlice';
import { IUser } from '@/app/api/v1/6template/userModel';

export const _2_template_Api = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    get_1_template_: builder.query({
      query: ({ page, limit }) => `/api/v1/6template?page=${page || 1}&limit=${limit || 2}`,
      providesTags: [{ type: '_5_template_tags_', id: 'LIST' }], // Add tag for cache invalidation
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
      query: id => `/api/v1/6template?id=${id}`,
    }),
    addUser: builder.mutation({
      query: newUser => ({
        url: '/api/v1/6template',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }], // Automatically invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IUser; message: string } } = await queryFulfilled;

          toast.success(data.message, {
            toastId: (Math.random() * 1000).toFixed(0),
          });

          // Invalidate cache for get_1_template_ to trigger re-fetch
          dispatch(_2_template_Api.util.invalidateTags([{ type: '_5_template_tags_' }]));
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
        url: `/api/v1/6template`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }], // Invalidate cache after mutation
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
        url: `/api/v1/6template`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }], // Invalidate cache after mutation
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
    bulkUpdate_1_template_: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/6template?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }], // Invalidate cache after mutation
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
    bulkDelete_1_template_: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/6template?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }], // Invalidate cache after mutation
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
  useGet_1_template_Query,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkUpdate_1_template_Mutation,
  useBulkDelete_1_template_Mutation,
  useGetUserByIdQuery,
} = _2_template_Api;
