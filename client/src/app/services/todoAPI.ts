import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/todo";

// FaunaDB Response types
export type RequiredTodoType = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

interface responseType {
  ref: {
    "@ref": {
      id: string;
      collection: {
        "@ref": {
          id: string;
          collection: {
            "@ref": {
              id: string;
            };
          };
        };
      };
    };
  };
  ts: number;
  data: RequiredTodoType;
  ttl: {
    "@ts": string;
  };
}

interface singleTodoResponseType {
  message: string;
  document: responseType;
}

// export type FetchBaseQueryError  = {
//   message: string;
// };

export const todosAPI = createApi({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    // Get all todos from DB
    getAllTodos: builder.query<RequiredTodoType[], void>({
      query: () => "/get-todos",
      // transformResponse: (dbResponse: responseType[], meta: unknown, arg: unknown) => {
      transformResponse: (dbResponse: responseType[]): RequiredTodoType[] => {
        const todos = dbResponse.map((todo) => {
          const id = todo.ref["@ref"].id;
          return { ...todo.data, id };
        });
        return todos;
      },
    }),

    // Get single Todo
    getSingleTodo: builder.query<RequiredTodoType, string | undefined>({
      query: (id) => `/${id}`,
      transformResponse: (
        dbResponse: singleTodoResponseType
      ): RequiredTodoType => {
        const todo = dbResponse.document.data;
        const todoData = { ...todo, id: dbResponse.document.ref["@ref"].id };
        return todoData;
      },
    }),
    
    // update single Todo
    updateSingleTodo: builder.mutation<singleTodoResponseType, RequiredTodoType>({
      query: (todo: RequiredTodoType) => ({
        url: todo.id,
        method: "PATCH",
        body: todo,
      }),
    }),

    // create single Todo
    createSingleTodo: builder.mutation<singleTodoResponseType, RequiredTodoType>({
      query: (newTodo: RequiredTodoType) => ({
        url: "/add-todo",
        method: "POST",
        body: newTodo
      }),
    }),

    // delete single Todo
    deleteSingleTodo: builder.mutation<singleTodoResponseType, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    })
  }),
});

export const {
  useGetAllTodosQuery,
  useGetSingleTodoQuery,
  useUpdateSingleTodoMutation,
  useCreateSingleTodoMutation,
  useDeleteSingleTodoMutation
} = todosAPI;
