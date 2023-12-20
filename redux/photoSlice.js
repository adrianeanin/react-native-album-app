import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photos",
  initialState: { data: [] },
  // loading state when fetching
  loading: false,
  allPhotosLoaded: false,
  reducers: {
    setPhotos: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllPhotosLoaded: (state, action) => {
      state.allPhotosLoaded = action.payload;
    },
  },
});

export const { setPhotos, setLoading, setAllPhotosLoaded } = photoSlice.actions;
export default photoSlice.reducer;
