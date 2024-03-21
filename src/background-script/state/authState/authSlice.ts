import { createSlice } from "@reduxjs/toolkit";

interface authState {
  user: null | string;
  isLoggedIn: boolean;
}

const initialState: authState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
