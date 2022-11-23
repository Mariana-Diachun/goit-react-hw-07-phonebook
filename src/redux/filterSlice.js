import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    searchByName(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { searchByName } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
