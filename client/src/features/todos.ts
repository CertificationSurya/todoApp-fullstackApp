import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// setting types
interface todosTypes {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
}

type InitialStateType = {
  isLoggedIn: boolean;
  todos: todosTypes[];
  completedTodos: todosTypes[];
};

// initial variable
const initialState: InitialStateType = {
  isLoggedIn: true,
  todos: [
    { id: "kdalasd", title: "dd", description: "string", completed: false },
    { id: "addb", title: "Mow", description: "a lon", completed: false },
  ],
  completedTodos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setTodos: (state, action: PayloadAction<todosTypes[]>) => {
      state.todos = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const todoAction = todoSlice.actions;
