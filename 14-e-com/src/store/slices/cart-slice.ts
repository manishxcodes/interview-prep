import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartSliceState, CouponState, Product } from '../../types';
import {
  getCartFromStorage,
  saveCartToStorage,
} from '../../utils/local-storage';

const getSavedCoupon = (): CouponState | null => {
  try {
    const saved = localStorage.getItem('cart_coupon');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

const initialState: CartSliceState = {
  items: getCartFromStorage(),
  coupon: getSavedCoupon()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToStorage(state.items);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    applyCoupon: (state, action: PayloadAction<CouponState>) => {
      state.coupon = action.payload;
      localStorage.setItem('cart_coupon', JSON.stringify(action.payload))
    },
    removeCoupon: (state) => {
      state.coupon = null;
      localStorage.removeItem('cart_coupon');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  applyCoupon,
  removeCoupon
} = cartSlice.actions;
export default cartSlice.reducer;