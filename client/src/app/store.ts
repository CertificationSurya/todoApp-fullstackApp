import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from "../features/Todos/todos"
import userReducer from "../features/Users/users"

// API import RTK-Query
import { todosAPI } from "../services/todoAPI";

const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
        [ todosAPI.reducerPath ] : todosAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosAPI.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch