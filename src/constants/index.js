// Note types for categorization
export const NOTE_TYPES = {
  NOTE: 'note',
  SERMON: 'sermon', 
  PRAYER: 'prayer',
  REFLECTION: 'reflection',
  STUDY: 'study'
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3
};

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  NOTES: '/api/notes',
  AUTH: '/api/auth',
  USERS: '/api/users'
};

// Application routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  NOTES: '/notes',
  NOTE_NEW: '/notes/new',
  NOTE_EDIT: '/notes/:id/edit'
};

// UI Constants
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const Z_INDEX = {
  MODAL: 1000,
  DROPDOWN: 100,
  HEADER: 50,
  OVERLAY: 10
};

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'JD Notes',
  VERSION: import.meta.env.VITE_APP_VERSION || '2.0.0',
  ENV: import.meta.env.VITE_APP_ENV || 'production',
  DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true' || false
};
