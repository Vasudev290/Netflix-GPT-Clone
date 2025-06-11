import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import movieReducer from "./Slices/movieSlice";
import gptReducer from "./Slices/gptSlice";
import configReducer from "./Slices/configSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    config: configReducer
  },
});

export default store;
