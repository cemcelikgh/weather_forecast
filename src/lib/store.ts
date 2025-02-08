import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './features/citySlice';
import themeReducer from './features/themeSlice';
import loaderReducer from './features/loaderSlice';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    loader: loaderReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
