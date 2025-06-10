import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import movieReducer from "./Slices/movieSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },  
})

export default store;