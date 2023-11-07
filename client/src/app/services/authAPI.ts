import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/auth";

interface createResponseType {
  message: string,
  authToken: string
}
import { formDataType } from "../../components/Signup";


export const authAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    // Create user req
    createUser: builder.mutation<createResponseType, formDataType>({
      query: (userData) => ({
        url: "/create-user",
        method: "POST",
        body: userData,
      }),

    }),
  }),
});


export const { useCreateUserMutation } = authAPI