import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./albumSlice";
import photoReducer from "./photoSlice";

const store = configureStore({
  reducer: {
    albums: albumReducer,
    photos: photoReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
