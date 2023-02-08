
import { createSlice } from "@reduxjs/toolkit";

export const giftNewSlice = createSlice({
    name: "new gift",
    initialState: {
        start: false,
        list: []
    },
    reducers: {
        setAddGift: (state, action) => {
            state.list = [...state.list, action.payload]
        }, 
        setMyGiftList: (state, action) => {
            state.list = action.payload
        }
    }
});

export const { setAddGift, setMyGiftList } = giftNewSlice.actions;

export default giftNewSlice.reducer;