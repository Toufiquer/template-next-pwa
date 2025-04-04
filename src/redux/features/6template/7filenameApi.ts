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
import { I_3_template_ } from '@/app/api/v1/6template/7filenameModel';

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
    get_3_template_ById: builder.query({
      query: id => `/api/v1/6template?id=${id}`,
    }),
    add_3_template_: builder.mutation({
      query: new_3_template_ => ({
        url: '/api/v1/6template',
        method: 'POST',
        body: new_3_template_,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }], // Automatically invalidate cache after mutation
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: I_3_template_; message: string } } = await queryFulfilled;

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
    update_3_template_: builder.mutation({
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
    delete_3_template_: builder.mutation({
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
  useAdd_3_template_Mutation,
  useUpdate_3_template_Mutation,
  useDelete_3_template_Mutation,
  useBulkUpdate_1_template_Mutation,
  useBulkDelete_1_template_Mutation,
  useGet_3_template_ByIdQuery,
} = _2_template_Api;
