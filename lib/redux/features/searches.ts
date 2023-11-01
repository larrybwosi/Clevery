import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Search {
  query: string;
  date: string;
}

interface SearchState {
  searches: Search[];
}

const initialState: SearchState = {
  searches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<Search>) => {
      state.searches.push(action.payload);
    },
    removeSearch: (state, action: PayloadAction<number>) => {
      state.searches.splice(action.payload, 1);
    },
    clearSearch: (state) => {
      state.searches = [];
    },
  },
});

export const { addSearch, removeSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;