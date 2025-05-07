import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TypeScript
import { Product } from "@/types/ProductType";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    checkOutOrder: builder.mutation({
      query: (orderData) => ({
        url: "/products/checkout",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCheckOutOrderMutation,
} = productApi;
