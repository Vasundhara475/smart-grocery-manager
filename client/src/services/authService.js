import api from './api';

// Note: backend routes use capitalized paths (/auth/Register, /auth/Login, /auth/Profile)
export const register   = (userData) => api.post('/auth/Register', userData);
export const login      = (userData) => api.post('/auth/Login', userData);
export const getProfile = ()         => api.get('/auth/Profile');