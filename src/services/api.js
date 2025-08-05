/**
 * API Client for making HTTP requests
 */

import { API_CONFIG } from '../constants/index.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || API_CONFIG.BASE_URL;

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Makes an HTTP request with timeout and retry logic
   * @param {string} endpoint - API endpoint
   * @param {object} options - Request options
   * @returns {Promise} Response promise
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let lastError;
    
    // Retry logic
    for (let attempt = 0; attempt < API_CONFIG.RETRY_ATTEMPTS; attempt++) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new APIError(response.status, errorText || response.statusText);
        }

        // Handle empty responses
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        }
        
        return await response.text();
      } catch (error) {
        lastError = error;
        
        if (error instanceof APIError) {
          // Don't retry on client errors (4xx)
          if (error.status >= 400 && error.status < 500) {
            throw error;
          }
        }
        
        // Don't retry on the last attempt
        if (attempt === API_CONFIG.RETRY_ATTEMPTS - 1) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    throw new APIError(0, lastError?.message || 'Network error occurred');
  }

  // HTTP method helpers
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * Custom API Error class
 */
export class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

// Export singleton instance
export const apiClient = new APIClient();
