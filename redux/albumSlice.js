import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "albums",
  initialState: { data: [] },
  reducers: {
    setAlbums: (state, action) => {
      state.data = action.payload;
    },
    deleteAlbum: (state, action) => {
      state.data = state.data.filter((album) => album.id !== action.payload);
    },
  },
});

export const { setAlbums, deleteAlbum } = albumSlice.actions;
export default albumSlice.reducer;
