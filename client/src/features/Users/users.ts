import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// setting types
type InitialStateType = {
  isLoggedIn: boolean;
  userMail: string ;
  password: string;
};

// initial variable
const initialState: InitialStateType = {
  isLoggedIn: false,
  userMail: '',
  password: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData: (state) => {
        const data = {email: 'dask2@gmail.com', password: 'alds'}
        state.userMail = data.email;
        state.isLoggedIn = true
    }
    ,
    setUserData: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default userSlice.reducer;
export const todoAction = userSlice.actions;
