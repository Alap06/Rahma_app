// Cart Slice - TP6, TP9
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { product, size, quantity }
  deliveryFee: 15, // Frais de livraison fixes
  favorites: [], // IDs des produits favoris
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajouter un produit au panier (TP6)
    addToCart: (state, action) => {
      const { product, size } = action.payload;
      
      // Vérifier si le produit avec cette taille existe déjà
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          size,
          quantity: 1,
        });
      }
    },

    // Incrémenter la quantité
    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // Décrémenter la quantité
    decrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Supprimer un article du panier
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.size === size)
      );
    },

    // Ajouter/Retirer des favoris
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }
    },
  },
});

// Sélecteurs (TP9)
export const selectCartItems = (state) => state.cart.items;
export const selectDeliveryFee = (state) => state.cart.deliveryFee;
export const selectFavorites = (state) => state.cart.favorites;

// Sélecteur pour vérifier si un produit est favori
export const selectIsFavorite = (productId) => (state) =>
  state.cart.favorites.includes(productId);

// Sélecteur pour le nombre total d'articles
export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Sélecteur pour le sous-total
export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

// Sélecteur pour le total final (TP6)
export const selectTotal = (state) => {
  const subtotal = selectSubtotal(state);
  const delivery = state.cart.deliveryFee;
  return subtotal + delivery;
};

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, toggleFavorite } =
  cartSlice.actions;

export default cartSlice.reducer;
