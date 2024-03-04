import { createSlice } from "@reduxjs/toolkit";

interface SettingState {
  dictionaryEnabled: boolean;
  isDarkTheme: boolean;
}

const initialState: SettingState = {
  dictionaryEnabled: true,
  isDarkTheme: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    switchDictionary: (state) => {
      state.dictionaryEnabled = !state.dictionaryEnabled;
    },
    switchTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { switchDictionary, switchTheme } = settingSlice.actions;

export default settingSlice.reducer;
