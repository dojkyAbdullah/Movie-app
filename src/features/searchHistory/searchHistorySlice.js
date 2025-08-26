// features/search/searchHistorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


 
const searchHistorySlice = createSlice({
 
  name: "searchHistory",
 initialState: {
    history: []
  },
  reducers: {
    addSearchTerm: (state, action) => {
      const term = action.payload.trim();

      if (term) {
        state.history.unshift(term); // add to beginning
      }

  
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addSearchTerm, clearHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
