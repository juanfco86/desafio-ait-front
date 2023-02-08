import { createSlice } from "@reduxjs/toolkit";

export const gifRandomSlice = createSlice({
  name: "gif random",
  initialState: {
    start: false,
  },
  reducers: {
    setGifRandom: (state, action) => {
      state.list = action.payload;
      state.start = true;
    },
  },
});

export const { setGifRandom } = gifRandomSlice.actions;

export default gifRandomSlice.reducer;
