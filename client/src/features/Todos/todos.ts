import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// our todo data type
import { RequiredTodoType } from "../../app/services/todoAPI";

type InitialStateType = {
  todos: RequiredTodoType[];
  completedTodos: RequiredTodoType[];
};

// initial variable
const initialState: InitialStateType = {
  todos: [],
  completedTodos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<RequiredTodoType[]>) => {
      state.todos = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const todoAction = todoSlice.actions;
