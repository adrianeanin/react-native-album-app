import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./albumSlice";

const store = configureStore({
  reducer: {
    albums: albumReducer,
  },
});

export default store;
