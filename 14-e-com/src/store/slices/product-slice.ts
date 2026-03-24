import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { ProductsState, Product, ProductFormData } from '../../types';
import {
  getProductsFromStorage,
  saveProductToStorage,
} from '../../utils/local-storage';

const initialState: ProductsState = {
  products: getProductsFromStorage(),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductFormData>) => {
      const newProduct: Product = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.products.push(newProduct);
      saveProductToStorage(state.products);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: string; data: ProductFormData }>
    ) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload.data,
        };
        saveProductToStorage(state.products);
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveProductToStorage(state.products);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;