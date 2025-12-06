/**
 * FitPulse Store Configuration
 * Fichier de configuration centralisée pour l'application
 */

export const APP_CONFIG = {
  // App Info
  appName: 'FitPulse Store',
  version: '1.0.0',
  
  // API Config (prêt pour intégration backend)
  api: {
    baseURL: 'https://api.fitpulse.com',
    timeout: 10000,
  },
  
  // Feature Flags
  features: {
    darkMode: true,
    notifications: true,
    socialSharing: true,
    reviews: true,
    wishlists: true,
  },
  
  // Cache Config
  cache: {
    enabled: true,
    duration: 3600, // secondes
  },
  
  // Analytics
  analytics: {
    enabled: false, // Activer après intégration
    trackPageViews: true,
    trackUserActions: true,
  },
  
  // Shipping
  shipping: {
    baseCost: 9.99,
    freeShippingThreshold: 100,
    estimatedDays: '2-3',
  },
  
  // Promo Codes
  promoCodes: {
    FITPULSE20: { discount: 0.2, description: '-20%' },
    WELCOME10: { discount: 0.1, description: '-10%' },
  },
  
  // Pagination
  pagination: {
    itemsPerPage: 20,
  },
};

export default APP_CONFIG;
