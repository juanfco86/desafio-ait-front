import { createSlice } from "@reduxjs/toolkit";


export const giftSlice = createSlice({
    name: "gifts",
    initialState: {
        start: false,
    },
    reducers: {
        setGiftList: (state, action) => {
            state.list = action.payload;
            state.start = true;
        },
        setGiftListSearch: (state, action) => {
            state.list = action.payload
            state.start = true;
        }
    }
});

export const { setGiftList, setGiftListSearch } = giftSlice.actions;

export default giftSlice.reducer;