import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: false,
  reducers: {
    setLoader: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    }
  }
})

export const { setLoader } = loaderSlice.actions;

export const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;
