import { configureStore } from '@reduxjs/toolkit';


//import Slices
import productReducer from '../slices/products';
import userSlice from '../slices/user';
import orderSlices from '../slices/orders';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userSlice,
    order: orderSlices
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;

