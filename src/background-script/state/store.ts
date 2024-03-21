import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingState/settingSlice";
import authReducer from "./authState/authSlice";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
