import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photos",
  initialState: { data: [] },
  reducers: {
    setPhotos: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPhotos } = photoSlice.actions;
export default photoSlice.reducer;
