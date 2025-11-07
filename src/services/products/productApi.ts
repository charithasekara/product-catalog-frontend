import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const baseQueryWithRetry = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Product'],
  endpoints: (builder) => 
    
    ({

    getAllProducts: builder.query<ProductDto[], void>({
      query: () => 'Products',
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation<number, Omit<ProductDto, 'id'>>({
      query: (product) => ({
        url: 'Products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<void, { id: number; product: Omit<ProductDto, 'id'> }>({
      query: ({ id, product }) => ({
        url: `Products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `Products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;