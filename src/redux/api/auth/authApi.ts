import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserData } from "@/types/AuthType";

// type UserData = {
//   id: string;
//   email: string;
//   // add other user properties as needed.
// };

type SignUpInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignInInput = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
    credentials: "include",
  }),

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    authMe: builder.query<UserData, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    signUp: builder.mutation<void, SignUpInput>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    signIn: builder.mutation<void, SignInInput>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

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
