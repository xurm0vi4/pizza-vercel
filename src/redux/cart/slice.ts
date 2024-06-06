import { createSlice } from '@reduxjs/toolkit';
import { CartItemProps, CartSliceState } from './types';

const getCartFromStorage: any = () => {
  const data = localStorage.getItem('cart');
  if (data) {
    const cartData: CartItemProps[] = JSON.parse(data);
    const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.count, 0);
    return { totalPrice, cartData };
  } else {
    console.warn('Local storage is empty');
    return {totalPrice: 0, cartData: []}
  }
};

const initialState: CartSliceState = {
  items: getCartFromStorage().cartData,
  totalPrice: getCartFromStorage().totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
