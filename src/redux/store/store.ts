import { configureStore } from '@reduxjs/toolkit';


//import Slices
import productReducer from '../slices/products';


const store = configureStore({
  reducer: {
    product: productReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;

