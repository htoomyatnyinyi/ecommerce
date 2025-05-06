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
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type PorductType = {
//   id: number;
//   image: URL;
//   title: string;
//   description: string;
//   price: number;
// };

// // type ProductById = {
// //   id: number;
// // };

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
//     credentials: "include",
//   }),

//   endpoints: (builder) => ({
//     getAllProducts: builder.query<PorductType[], void>({
//       query: () => "/api/products",
//     }),

//     // getProductById: builder.query<PorductType, { id: number }>({
//     getProductById: builder.query<PorductType, { id: number }>({
//       query: (id) => `/api/products/${id}`,
//     }),
//   }),
// });

// export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
