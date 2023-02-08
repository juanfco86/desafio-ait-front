import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "users",
    initialState: {
        isLogged: false,
        userLogged: null
    },
    reducers: {
        setUserList: (state, action) => {
            state.userLogged = action.payload;
        }
        // setUserLogged: (state, action) => {
        //     state.userLogged = action.payload;
        //     state.isLogged = true;
        // },
        // setUserLogOut: (state) => {
        //     state.isLogged = false;
        //     state.userLogged = null;
        // }
    }
});

export const { setUserList } = userSlice.actions;

export default userSlice.reducer;