import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CityType } from '@/types/SelectCityTypes';
import type { RootState } from '@/lib/store';

export const citySlice = createSlice({
  name: 'city',
  initialState: { 'id': '34', 'name' : 'İstanbul'},
  reducers: {
    setCity: (_state, action: PayloadAction<CityType>) => {
      return action.payload;
    }
  }
})

export const { setCity } = citySlice.actions;

export const selectCity = (state: RootState) => state.city;

export default citySlice.reducer;
