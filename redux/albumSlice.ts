import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Album {
  id: number;
  title: string;
}

interface AlbumState {
  data: Album[];
}

const initialState: AlbumState = {
  data: [],
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.data = action.payload;
    },
    deleteAlbum: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((album) => album.id !== action.payload);
    },
  },
});

export const { setAlbums, deleteAlbum } = albumSlice.actions;
export default albumSlice.reducer;
