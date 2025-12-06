/**
 * Constantes globales de l'application
 */

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple-pay',
  GOOGLE_PAY: 'google-pay',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Product Filters
export const PRODUCT_FILTERS = {
  TRENDING: 'trending',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  RATING: 'rating',
  NEWEST: 'newest',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SUPPORT: 'support',
};

// API Endpoints (pour future intégration)
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USERS: '/users',
  AUTH: '/auth',
  PAYMENTS: '/payments',
  REVIEWS: '/reviews',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: '@fitpulse_user',
  CART: '@fitpulse_cart',
  FAVORITES: '@fitpulse_favorites',
  THEME: '@fitpulse_theme',
  ONBOARDING: '@fitpulse_onboarding',
  ORDERS: '@fitpulse_orders',
  SEARCH_HISTORY: '@fitpulse_search_history',
};

// Validation Regex
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  ZIP_CODE: /^\d{5}$/,
  CARD_NUMBER: /^\d{16}$/,
  CVV: /^\d{3,4}$/,
};

// Size Charts
export const SIZE_CHARTS = {
  SHOES: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  CLOTHING: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  EQUIPMENT: ['S', 'M', 'L', 'XL', 'Unique'],
};

// Messages
export const MESSAGES = {
  LOADING: 'Chargement...',
  EMPTY_CART: 'Votre panier est vide',
  ADD_TO_CART_SUCCESS: 'Produit ajouté au panier',
  REMOVE_CART_SUCCESS: 'Produit supprimé du panier',
  FAVORITE_ADDED: 'Ajouté aux favoris',
  FAVORITE_REMOVED: 'Supprimé des favoris',
  ORDER_SUCCESS: 'Commande confirmée!',
  ERROR_GENERIC: 'Une erreur est survenue',
  NETWORK_ERROR: 'Erreur de connexion',
  INVALID_PROMO: 'Code promo invalide',
};

// Timing
export const TIMING = {
  ANIMATION_DURATION: 300,
  TRANSITION_DURATION: 500,
  SPLASH_SCREEN: 2000,
  TOAST_DURATION: 3000,
};
