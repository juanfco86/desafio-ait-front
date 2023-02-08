import { configureStore } from "@reduxjs/toolkit";
// reducer
import userSlice from "./features/user/userSlice";
import gifSlice from "./features/gif/gifSlice";
import gifRandomSlice from "./features/gif/gifRandomSlice";
import gifNewSlice from "./features/gif/gifNewSlice";
import gifSearchSlice from "./features/gif/gifSearchSlice";

export default configureStore({
  reducer: {
    userSlice,
    gifSlice,
    gifRandomSlice,
    gifNewSlice,
    gifSearchSlice
  },
});
