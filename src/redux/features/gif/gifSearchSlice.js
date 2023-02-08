import { createSlice } from "@reduxjs/toolkit";

export const gifSearchSlice = createSlice({
    name: "search gifs",
    initialState: {
        start: false,
    },
    reducers: {
        setGifListSearch: (state, action) => {
            state.list = action.payload;
            state.start = true;
        }
    },
});

export const { setGifListSearch } = gifSearchSlice.actions;

export default gifSearchSlice.reducer;

