import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// setting types
type InitialStateType = {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
  password: string;
};

// initial variable
const initialState: InitialStateType = {
  isLoggedIn: false,
  token: null,
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData: (state) => {
      const data = { email: "dask2@gmail.com", password: "alds" };
      state.email = data.email;
      state.isLoggedIn = true;
    },
    setUserData: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setCredentials: (state, action) => {
      const { email, token } = action.payload
      state.email = email;
      state.token = token
    },
    setLogout: (state) => {
      state.isLoggedIn = false,
      state.email = null;
      state.token = null
    }
  }, 
});

export default userSlice.reducer;
export const todoAction = userSlice.actions;

// for authApi.ts as hook only works for react
export const { setCredentials, setLogout } = userSlice.actions