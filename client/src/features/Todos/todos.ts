import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// our todo data type
import { requiredTodosType } from "../../services/todoAPI";

type InitialStateType = {
  todos: requiredTodosType[];
  completedTodos: requiredTodosType[];
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
    setTodos: (state, action: PayloadAction<requiredTodosType[]>) => {
      state.todos = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const todoAction = todoSlice.actions;
