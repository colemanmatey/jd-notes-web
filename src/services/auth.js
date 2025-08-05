/**
 * Auth Service - Handles authentication operations
 */

import { apiClient } from './api.js';
import { API_ENDPOINTS } from '../constants/index.js';

export class AuthService {
  /**
   * Logs in a user
   * @param {object} credentials - Login credentials
   * @returns {Promise<object>} User data and token
   */
  async login(credentials) {
    const response = await apiClient.post(`${API_ENDPOINTS.AUTH}/login`, credentials);
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * Registers a new user
   * @param {object} userData - Registration data
   * @returns {Promise<object>} User data and token
   */
  async register(userData) {
    const response = await apiClient.post(`${API_ENDPOINTS.AUTH}/register`, userData);
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * Logs out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await apiClient.post(`${API_ENDPOINTS.AUTH}/logout`);
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Refreshes the authentication token
   * @returns {Promise<object>} New token data
   */
  async refreshToken() {
    const response = await apiClient.post(`${API_ENDPOINTS.AUTH}/refresh`);
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  }

  /**
   * Verifies the current token
   * @returns {Promise<object>} User data
   */
  async verifyToken() {
    return apiClient.get(`${API_ENDPOINTS.AUTH}/verify`);
  }

  /**
   * Requests a password reset
   * @param {string} email - User email
   * @returns {Promise<void>}
   */
  async requestPasswordReset(email) {
    return apiClient.post(`${API_ENDPOINTS.AUTH}/forgot-password`, { email });
  }

  /**
   * Resets password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<void>}
   */
  async resetPassword(token, newPassword) {
    return apiClient.post(`${API_ENDPOINTS.AUTH}/reset-password`, {
      token,
      password: newPassword,
    });
  }

  /**
   * Gets current user from localStorage
   * @returns {object|null} User data
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Gets current auth token
   * @returns {string|null} Auth token
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Checks if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Clears authentication data
   */
  clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}

// Export singleton instance
export const authService = new AuthService();
