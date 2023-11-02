import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Todos/todos"
import userReducer from "../features/Users/users"

const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch