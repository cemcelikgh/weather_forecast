import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './features/citySlice';
import themeReducer from './features/themeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      city: cityReducer,
      theme: themeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
