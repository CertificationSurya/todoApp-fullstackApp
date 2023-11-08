import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/auth";

interface createResponseType {
  message: string;
  id: string;
  email? : string
}

interface getUserResponseType {
  message: string;
  ref_id: string;
  email: string;
}

import { formDataType } from "../../components/Signup";


// user related APIs
export const authAPI = createApi({
  reducerPath: "api1",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // required for sending cookie
    // prepareHeaders: (headers, {getState}) => {
    //   const token = getState().user.token
    //   if (token){
    //     headers.set("authorization", `Bearer ${token}`)
    //   }
    //   return headers
    // }
  }),

  endpoints: (builder) => ({
    // Get user. Basically cookie checker
    getUser: builder.query< getUserResponseType, void> ({
      query: () => '/get-user'
    }),

    // Create user req
    createUser: builder.mutation<createResponseType, formDataType>({
      query: (userData) => ({
        url: "/create-user",
        method: "POST",
        body: userData,
      }),
    }),

    // login user
    loginUser: builder.mutation<unknown, formDataType>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData
      })
    }),

    // logout user
    logoutUser: builder.mutation<unknown, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      })
    })

  }),
});

export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery } = authAPI;
