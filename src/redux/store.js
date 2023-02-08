import { configureStore } from '@reduxjs/toolkit';
// reducer
import userSlice from './features/user/userSlice';
import giftSlice from './features/gift/giftSlice';
import giftRandomSlice from './features/gift/giftRandomSlice';
import giftNewSlice from './features/gift/giftNewSlice';

export default configureStore({
    reducer: {
        userSlice,
        giftSlice,
        giftRandomSlice,
        giftNewSlice
    }
});