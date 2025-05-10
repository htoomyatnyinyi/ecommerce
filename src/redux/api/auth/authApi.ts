import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInInput, SignUpInput, ResponseUserData } from "@/types/AuthType";
// type ResCredentials = {

// }
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

    signUp: builder.mutation<void, SignUpInput>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        console.log(response);
        // Store token on successful register
        const userInfo = JSON.stringify(response.data);
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userInfo", userInfo);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),

    signIn: builder.mutation<void, SignInInput>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        console.log(response, "rtk login");
        // Store token on successful login
        const userInfo = JSON.stringify(response.data);
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userInfo", userInfo);
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
