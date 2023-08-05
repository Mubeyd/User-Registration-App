import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../db/types';

interface CounterState {
  contacts: Contact[];
}

const initialState: CounterState = {
  contacts: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setContacts: (state, action: PayloadAction<{ contacts: Contact[] }>) => {
      state.contacts = action.payload.contacts;
    },
  },
});

export const { setContacts } = counterSlice.actions;

export default counterSlice.reducer;
