import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../features/userRegistration/state/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
