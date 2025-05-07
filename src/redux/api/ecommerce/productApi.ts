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

// note

// // src/redux/api/orderApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { CartItem } from "../slice/cartSlice"; // Assuming CartItem is exported from your cartSlice

// // Define the structure of the response you expect from the backend after checkout
// export interface OrderResponse {
//   orderId: string;
//   message: string;
//   // Add any other relevant fields from your backend's response
// }

// // Define the structure of the payload to be sent for creating an order
// export interface CreateOrderPayload {
//   items: CartItem[];
//   // You might want to add other details like userId, shippingAddress, etc.
//   // For this example, we'll just send the cart items.
//   totalAmount: number;
// }

// // Define a service using a base URL and expected endpoints
// export const orderApi = createApi({
//   reducerPath: "orderApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api", // Adjust this to your backend API base URL
//     // prepareHeaders: (headers, { getState }) => {
//     //   // If you need to send a token or other headers:
//     //   // const token = (getState() as RootState).auth.token;
//     //   // if (token) {
//     //   //   headers.set('authorization', `Bearer ${token}`);
//     //   // }
//     //   return headers;
//     // },
//   }),
//   tagTypes: ["Order"], // Define tags for caching and invalidation if needed
//   endpoints: (builder) => ({
//     createOrder: builder.mutation<OrderResponse, CreateOrderPayload>({
//       query: (orderDetails) => ({
//         url: "orders", // The endpoint path, e.g., /api/orders
//         method: "POST",
//         body: orderDetails,
//       }),
//       // invalidatesTags: ['Order'], // Uncomment if you want to invalidate 'Order' tags after mutation
//     }),
//     // You can add other order-related endpoints here, e.g., getOrderById, getOrderHistory
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useCreateOrderMutation } = orderApi;

// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // type PorductType = {
// //   id: number;
// //   image: URL;
// //   title: string;
// //   description: string;
// //   price: number;
// // };

// // // type ProductById = {
// // //   id: number;
// // // };

// // export const productApi = createApi({
// //   reducerPath: "productApi",
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
// //     credentials: "include",
// //   }),

// //   endpoints: (builder) => ({
// //     getAllProducts: builder.query<PorductType[], void>({
// //       query: () => "/api/products",
// //     }),

// //     // getProductById: builder.query<PorductType, { id: number }>({
// //     getProductById: builder.query<PorductType, { id: number }>({
// //       query: (id) => `/api/products/${id}`,
// //     }),
// //   }),
// // });

// // export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
