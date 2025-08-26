import { createSlice } from '@reduxjs/toolkit'

export const favouriteMovieSlice = createSlice({
  name: 'favouriteMovies',
  initialState: {
    movies: []
  },
  reducers: {
       addToFavourites: (state, action) => {
        state.movies.push(action.payload)
       },
       removeFromFavourites: (state, action) => {
  state.movies = state.movies.filter(movie => movie.id !== action.payload);
},

  
  }
})

// Action creators are generated for each case reducer function
export const { addToFavourites, removeFromFavourites } = favouriteMovieSlice.actions

export default favouriteMovieSlice.reducer