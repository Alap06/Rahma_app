import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],
      addToCart: (product, quantity = 1, selectedColor, selectedSize) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.id === product.id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity,
                selectedColor,
                selectedSize,
                cartItemId: `${product.id}-${selectedColor}-${selectedSize}`,
              },
            ],
          };
        }),

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        })),

      updateCartQuantity: (cartItemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      // Favorites State
      favorites: [],
      addToFavorites: (product) =>
        set((state) => {
          const exists = state.favorites.some((item) => item.id === product.id);
          if (exists) return state;
          return { favorites: [...state.favorites, product] };
        }),

      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        })),

      toggleFavorite: (product) =>
        set((state) => {
          const isFavorite = state.favorites.some((item) => item.id === product.id);
          if (isFavorite) {
            return {
              favorites: state.favorites.filter((item) => item.id !== product.id),
            };
          }
          return { favorites: [...state.favorites, product] };
        }),

      isFavorite: (productId) => {
        const state = get();
        return state.favorites.some((item) => item.id === productId);
      },

      // Theme State
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User State
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      // Orders History
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            {
              ...order,
              id: `ORDER-${Date.now()}`,
              timestamp: new Date().toISOString(),
            },
            ...state.orders,
          ],
        })),

      // Onboarding State
      hasSeenOnboarding: false,
      setOnboardingComplete: () => set({ hasSeenOnboarding: true }),

      // Promo Code
      appliedPromo: null,
      applyPromo: (code) => {
        // Mock promo validation
        if (code === 'FITPULSE20') {
          set({ appliedPromo: { code, discount: 0.2 } });
        } else if (code === 'WELCOME10') {
          set({ appliedPromo: { code, discount: 0.1 } });
        }
      },
      removePromo: () => set({ appliedPromo: null }),

      // Search History
      searchHistory: [],
      addSearchHistory: (query) =>
        set((state) => {
          const filtered = state.searchHistory.filter((s) => s !== query);
          return { searchHistory: [query, ...filtered].slice(0, 10) };
        }),

      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'fitpulse-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        isDarkMode: state.isDarkMode,
        user: state.user,
        orders: state.orders,
        hasSeenOnboarding: state.hasSeenOnboarding,
        appliedPromo: state.appliedPromo,
        searchHistory: state.searchHistory,
      }),
    }
  )
);

export default useStore;
