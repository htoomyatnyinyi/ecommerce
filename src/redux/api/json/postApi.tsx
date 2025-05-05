import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "@/types/PostType";

// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getPostById: builder.query<Post[], number>({
      query: (id) => `/posts/${id}`,
    }),

    // getPost: builder.query<Post[], null>({
    getPost: builder.query<Post[], { offset: number; limit: number }>({
      query: ({ offset, limit }) => ({
        // url: "/posts",
        url: `/posts?_start=${offset}&_limit=${limit}`,
        method: "GET",
      }),
    }),

    // Get paginated posts (with offset & limit)
    // getPaginatedPosts: builder.query<Post[], { offset: number; limit: number }>(
    //   {
    //     query: ({ offset, limit }) => ({
    //       url: `/posts?_start=${offset}&_limit=${limit}`,
    //       method: "GET",
    //     }),
    //   }
    // ),
  }),
});

export const {
  useGetPostQuery,
  useGetPostByIdQuery,
  // useLazyGetPaginatedPostsQuery,
} = postApi;
