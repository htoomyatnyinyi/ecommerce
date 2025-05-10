import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInInput, SignUpInput, ResponseUserData } from "@/types/AuthType";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
    // credentials: "include",
    prepareHeaders: (headers) => {
      // Get token from storage
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    authMe: builder.query<ResponseUserData, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        // Store token on successful register
        console.log(response, "rtk register");
        localStorage.setItem("token", response.token);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        // Store token on successful login
        console.log(response, "rtk login");
        localStorage.setItem("token", response.token);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),

    protectedData: builder.query({
      query: () => "protected-data",
    }),

    // signUp: builder.mutation<void, SignUpInput>({
    //   query: (data) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    // signIn: builder.mutation<void, SignInInput>({
    //   query: (data) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useAuthMeQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = authApi;

// type UserData = {
//   id: string;
//   email: string;
//   // add other user properties as needed.
// };

// type SignUpInput = {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// type SignInInput = {
//   email: string;
//   password: string;
// };
