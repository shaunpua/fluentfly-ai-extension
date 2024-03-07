import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectSettingState = (state: RootState) => state.setting;

export const selectSettingDictionaryEnabled = createSelector(
  [selectSettingState],
  (setting) => setting.dictionaryEnabled
);

export const selectSettingIsDarkTheme = createSelector(
  [selectSettingState],
  (setting) => setting.isDarkTheme
);
