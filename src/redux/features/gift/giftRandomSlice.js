import { createSlice } from "@reduxjs/toolkit";


export const giftRandomSlice = createSlice({
    name: "gift random",
    initialState: {
        start: false,
    },
    reducers: {
        setGiftRandom: (state, action) => {
            state.list = action.payload
            state.start = true;
        }
    }
});

export const { setGiftRandom } = giftRandomSlice.actions;

export default giftRandomSlice.reducer;