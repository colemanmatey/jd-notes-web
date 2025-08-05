/**
 * Notes Service - Handles all note-related API operations
 */

import { apiClient } from './api.js';
import { API_ENDPOINTS } from '../constants/index.js';

export class NotesService {
  /**
   * Fetches all notes for the current user
   * @param {object} filters - Optional filters (type, category, etc.)
   * @returns {Promise<Array>} Array of notes
   */
  async fetchNotes(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.NOTES}?${queryParams}`
      : API_ENDPOINTS.NOTES;
      
    return apiClient.get(endpoint);
  }

  /**
   * Fetches a single note by ID
   * @param {string|number} id - Note ID
   * @returns {Promise<object>} Note object
   */
  async fetchNote(id) {
    return apiClient.get(`${API_ENDPOINTS.NOTES}/${id}`);
  }

  /**
   * Creates a new note
   * @param {object} noteData - Note data
   * @returns {Promise<object>} Created note
   */
  async createNote(noteData) {
    const payload = {
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return apiClient.post(API_ENDPOINTS.NOTES, payload);
  }

  /**
   * Updates an existing note
   * @param {string|number} id - Note ID
   * @param {object} noteData - Updated note data
   * @returns {Promise<object>} Updated note
   */
  async updateNote(id, noteData) {
    const payload = {
      ...noteData,
      updatedAt: new Date().toISOString(),
    };
    
    return apiClient.put(`${API_ENDPOINTS.NOTES}/${id}`, payload);
  }

  /**
   * Deletes a note
   * @param {string|number} id - Note ID
   * @returns {Promise<void>}
   */
  async deleteNote(id) {
    return apiClient.delete(`${API_ENDPOINTS.NOTES}/${id}`);
  }

  /**
   * Searches notes by query
   * @param {string} query - Search query
   * @param {object} filters - Additional filters
   * @returns {Promise<Array>} Filtered notes
   */
  async searchNotes(query, filters = {}) {
    const params = {
      q: query,
      ...filters,
    };
    
    return this.fetchNotes(params);
  }

  /**
   * Bulk operations
   */
  async bulkDelete(noteIds) {
    return apiClient.post(`${API_ENDPOINTS.NOTES}/bulk-delete`, { ids: noteIds });
  }

  async bulkUpdate(noteIds, updates) {
    return apiClient.post(`${API_ENDPOINTS.NOTES}/bulk-update`, { 
      ids: noteIds, 
      updates 
    });
  }
}

// Export singleton instance
export const notesService = new NotesService();
