// Products Slice - TP9
import { createSlice } from '@reduxjs/toolkit';
import products from '../data/products';

const initialState = {
  products: products,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // On peut ajouter des actions plus tard (tri, filtrage, etc.)
  },
});

export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (id) => (state) =>
  state.products.products.find((product) => product.id === id);

export default productsSlice.reducer;
