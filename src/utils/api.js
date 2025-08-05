// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Request interceptor for adding auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: getAuthHeaders(),
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    const data = isJson ? await response.json() : await response.text();
    
    if (!response.ok) {
      throw new Error(data.message || data || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    });
  },

  forgotPassword: async (email) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token, password) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },
};

// User profile API calls
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/user/profile');
  },

  updateProfile: async (profileData) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    return apiRequest('/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  deleteAccount: async () => {
    return apiRequest('/user/account', {
      method: 'DELETE',
    });
  },
};

// Notes API calls
export const notesAPI = {
  // Get all notes with optional filters
  getNotes: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/notes${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  // Get a single note by ID
  getNote: async (id) => {
    return apiRequest(`/notes/${id}`);
  },

  // Create a new note
  createNote: async (noteData) => {
    return apiRequest('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  },

  // Update an existing note
  updateNote: async (id, noteData) => {
    return apiRequest(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    });
  },

  // Delete a note
  deleteNote: async (id) => {
    return apiRequest(`/notes/${id}`, {
      method: 'DELETE',
    });
  },

  // Search notes
  searchNotes: async (query, filters = {}) => {
    const searchParams = new URLSearchParams({ q: query });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        searchParams.append(key, value);
      }
    });
    
    return apiRequest(`/notes/search?${searchParams.toString()}`);
  },
};

// Categories API calls
export const categoriesAPI = {
  getCategories: async () => {
    return apiRequest('/categories');
  },

  createCategory: async (categoryData) => {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (id, categoryData) => {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (id) => {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Tags API calls
export const tagsAPI = {
  getTags: async () => {
    return apiRequest('/tags');
  },

  createTag: async (tagData) => {
    return apiRequest('/tags', {
      method: 'POST',
      body: JSON.stringify(tagData),
    });
  },

  updateTag: async (id, tagData) => {
    return apiRequest(`/tags/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tagData),
    });
  },

  deleteTag: async (id) => {
    return apiRequest(`/tags/${id}`, {
      method: 'DELETE',
    });
  },

  // Get popular/frequently used tags
  getPopularTags: async (limit = 20) => {
    return apiRequest(`/tags/popular?limit=${limit}`);
  },
};

// Export the generic apiRequest function for custom calls
export { apiRequest };
