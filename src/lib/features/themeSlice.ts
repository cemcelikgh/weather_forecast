import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'system-theme',
  reducers: {
    setDarkTheme: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
    setLightTheme: (_state, action: PayloadAction<string>) => {
      return action.payload;
    }
  }
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
