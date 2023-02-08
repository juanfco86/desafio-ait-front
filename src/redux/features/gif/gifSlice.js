import { createSlice } from "@reduxjs/toolkit";

export const gifSlice = createSlice({
  name: "gifs",
  initialState: {
    start: false,
  },
  reducers: {
    setGifList: (state, action) => {
      state.list = action.payload;
      state.start = true;
    }
  },
});

export const { setGifList, setGifListSearch } = gifSlice.actions;

export default gifSlice.reducer;
