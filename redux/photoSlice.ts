import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Photo {
  id: number;
  url: string;
}

interface PhotoState {
  data: Photo[];
  loading: boolean;
}

const initialState: PhotoState = {
  data: [],
  loading: true,
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPhotos, setLoading } = photoSlice.actions;
export default photoSlice.reducer;
