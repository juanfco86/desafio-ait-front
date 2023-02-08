import { createSlice } from "@reduxjs/toolkit";

export const gifNewSlice = createSlice({
  name: "new gif",
  initialState: {
    start: false,
    list: [],
  },
  reducers: {
    setAddGif: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    setMyGifList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setAddGif, setMyGifList } = gifNewSlice.actions;

export default gifNewSlice.reducer;
