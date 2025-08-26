import { favouriteMovieSlice } from '@/features/favourites/favouriteMovieSlice'
import { configureStore } from '@reduxjs/toolkit'
import searchHistoryReducer from  '@/features/searchHistory/searchHistorySlice' 
import themeReducer from '@/features/themeToggle/themeSlice'
export const store = configureStore({
  reducer: {
    favourites: favouriteMovieSlice.reducer,
    searchHistory: searchHistoryReducer,
     theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
