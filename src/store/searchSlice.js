import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    searchResults: [],
  },
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { updateSearchTerm, updateSearchResults } = searchSlice.actions;

export default searchSlice.reducer;