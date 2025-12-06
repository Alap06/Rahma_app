import { useCallback } from 'react';
import useStore from '../store/useStore';

/**
 * Hook pour gérer le panier
 */
export const useCart = () => {
  const { cart, addToCart, removeFromCart, updateCartQuantity, clearCart, appliedPromo } = useStore();

  const cartTotal = useCallback(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
    return subtotal - discountAmount;
  }, [cart, appliedPromo]);

  const cartCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal: cartTotal(),
    cartCount: cartCount(),
  };
};

/**
 * Hook pour gérer les favoris
 */
export const useFavorites = () => {
  const { favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite } = useStore();

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    favoriteCount: favorites.length,
  };
};

/**
 * Hook pour les animations réutilisables
 */
export const useAnimations = () => {
  const animateButton = useCallback((animatedValue) => {
    // Implémentation personnalisée
    return animatedValue;
  }, []);

  const animateList = useCallback((animatedValue) => {
    // Implémentation personnalisée
    return animatedValue;
  }, []);

  return {
    animateButton,
    animateList,
  };
};

/**
 * Hook pour les thèmes
 */
export const useTheme = () => {
  const { isDarkMode, toggleTheme } = useStore();
  
  const theme = isDarkMode ? 'dark' : 'light';

  return {
    isDarkMode,
    toggleTheme,
    theme,
  };
};

/**
 * Hook pour les commandes
 */
export const useOrders = () => {
  const { orders, addOrder } = useStore();

  return {
    orders,
    addOrder,
    orderCount: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
  };
};
