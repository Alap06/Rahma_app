// Design System & Theme
export const COLORS = {
  primary: '#0066FF',
  secondary: '#00D4AA',
  accent: '#FF6B35',
  dark: '#0F172A',
  light: '#F8FAFC',
  success: '#10B981',
  warning: '#F59E0B',
  gray: '#64748B',
  lightGray: '#E2E8F0',
};

export const THEME = {
  light: {
    background: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    card: '#F8FAFC',
  },
  dark: {
    background: '#0F172A',
    text: '#F8FAFC',
    border: '#1E293B',
    card: '#1E293B',
  },
};

// Spacing & Sizing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

// Border Radius
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Animation Durations
export const DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
};

// Screen Dimensions
export const SCREEN_HEIGHT = 812;
export const SCREEN_WIDTH = 375;

// Categories
export const CATEGORIES = [
  { id: '1', name: 'Chaussures', icon: 'shoe-prints' },
  { id: '2', name: 'Vêtements', icon: 'shirt' },
  { id: '3', name: 'Accessoires', icon: 'watch' },
  { id: '4', name: 'Équipement', icon: 'dumbbell' },
];

// Status Codes
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
