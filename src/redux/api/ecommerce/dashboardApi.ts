import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category, Product } from "@/types/DashboardType";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    //products
    fetchAllProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),

    fetchProductById: builder.query<Product, number>({
      query: (productId) => `/products/${productId}`,
    }),

    createNewProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),

    updateProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "PATCH",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),

    // categories
    fetchAllCategory: builder.query<Category[], void>({
      query: () => "/categories",
    }),

    fetchCategoryById: builder.query<Category, number>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),

    createNewCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
    }),

    updateCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "PATCH",
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // product
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useCreateNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  //category
  useFetchAllCategoryQuery,
  useFetchCategoryByIdQuery,
  useCreateNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = dashboardApi;
