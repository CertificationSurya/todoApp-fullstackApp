import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/todo";

// FaunaDB Response types
export type requiredTodosType = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}


interface responseType {
  ref: {
    '@ref': {
      id: string;
      collection: {
        '@ref': {
          id: string;
          collection: {
            '@ref': {
              id: string;
            };
          };
        };
      };
    };
  };
  ts: number;
  data: requiredTodosType
  ttl: {
    '@ts': string;
  };
}

interface singleTodoResponseType {
  message: string;
  document: responseType
}

export const todosAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Get all todos from DB
    getAllTodos: builder.query<requiredTodosType[], void>({
      query: () => "/get-todos",
      // transformResponse: (dbResponse: responseType[], meta: unknown, arg: unknown) => {
    transformResponse: (dbResponse: responseType[]) : requiredTodosType[] => {
        const todos = dbResponse.map(todo => {
          const id = todo.ref['@ref'].id;
          return {...todo.data, id}
        })
        return todos
      }
    }),

    // Get single Todo
    // getSingleTodo: builder.query<requiredTodosType, string>({
    //   query: (id) => `/${id}`,
    //   transformErrorResponse: (dbResponse : singleTodoResponseType) : requiredTodosType=>{
    //     console.log(dbResponse.document.data)
    //     const todo = dbResponse.document.data;
    //     const todoData = {...todo, id: dbResponse.document.ref['@ref'].id}
    //     return todoData
    //   }
    // })
    
  }),
});

export const { useGetAllTodosQuery, useGetSingleTodoQuery } = todosAPI