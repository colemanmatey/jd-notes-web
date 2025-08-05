/**
 * Enhanced useNotes hook with real API integration
 */

import { useState, useEffect, useCallback } from 'react';
import { notesService } from '../services/notes.js';
import { NOTE_TYPES } from '../constants/index.js';

// Mock notes data - for fallback during development
const mockNotes = [
  {
    id: 1,
    title: 'Sunday Service Sermon Notes',
    content: 'Main points for this Sunday\'s sermon on faith and perseverance...',
    category: 'Sermons',
    type: 'sermon',
    tags: ['faith', 'perseverance', 'sunday'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Prayer Request List',
    content: 'Weekly prayer requests from congregation members...',
    category: 'Prayer',
    type: 'prayer',
    tags: ['prayer', 'congregation', 'weekly'],
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z'
  },
  {
    id: 3,
    title: 'Bible Study - Romans 8',
    content: 'Study notes on Romans chapter 8, focusing on life in the Spirit...',
    category: 'Bible Study',
    type: 'study',
    tags: ['romans', 'spirit', 'study'],
    createdAt: '2024-01-13T19:00:00Z',
    updatedAt: '2024-01-13T19:00:00Z'
  }
];

export function useNotes(initialFilters = {}) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from API with error handling and fallback
  const loadNotes = useCallback(async (filtersToApply = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to fetch from real API first
      const fetchedNotes = await notesService.fetchNotes(filtersToApply);
      setNotes(fetchedNotes || []);
    } catch (err) {
      console.warn('Failed to fetch from API, using mock data:', err);
      
      // Fallback to mock data for development
      setNotes(mockNotes);
      setError(null); // Don't show error for fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadNotes(filters);
  }, [loadNotes, filters]);

  const createNote = useCallback(async (noteData) => {
    try {
      setError(null);
      
      // Validate required fields
      if (!noteData.title?.trim()) {
        throw new Error('Title is required');
      }
      if (!noteData.content?.trim()) {
        throw new Error('Content is required');
      }

      // Try API first
      try {
        const newNote = await notesService.createNote(noteData);
        setNotes(prev => [newNote, ...prev]);
        return newNote;
      } catch (apiError) {
        console.warn('API create failed, using local storage:', apiError);
        
        // Fallback to local creation
        const newNote = {
          ...noteData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setNotes(prev => [newNote, ...prev]);
        return newNote;
      }
    } catch (err) {
      setError(err.message || 'Failed to create note');
      throw err;
    }
  }, []);

  const updateNote = useCallback(async (id, noteData) => {
    try {
      setError(null);
      
      // Validate required fields
      if (!noteData.title?.trim()) {
        throw new Error('Title is required');
      }
      if (!noteData.content?.trim()) {
        throw new Error('Content is required');
      }

      // Try API first
      try {
        const updatedNote = await notesService.updateNote(id, noteData);
        setNotes(prev => prev.map(note => 
          note.id === id ? updatedNote : note
        ));
        return updatedNote;
      } catch (apiError) {
        console.warn('API update failed, using local update:', apiError);
        
        // Fallback to local update
        const updatedNote = {
          ...noteData,
          id,
          updatedAt: new Date().toISOString()
        };
        setNotes(prev => prev.map(note => 
          note.id === id ? updatedNote : note
        ));
        return updatedNote;
      }
    } catch (err) {
      setError(err.message || 'Failed to update note');
      throw err;
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    try {
      setError(null);
      
      // Optimistic update
      setNotes(prev => prev.filter(note => note.id !== id));
      
      // Try API deletion
      try {
        await notesService.deleteNote(id);
      } catch (apiError) {
        console.warn('API delete failed:', apiError);
        // Note is already removed from local state
      }
    } catch (err) {
      setError(err.message || 'Failed to delete note');
      // Revert optimistic update on error
      loadNotes(filters);
      throw err;
    }
  }, [filters, loadNotes]);

  const searchNotes = useCallback(async (query, filtersToApply = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      setSearchTerm(query);
      
      // Try API search first
      try {
        const searchResults = await notesService.searchNotes(query, filtersToApply);
        return searchResults;
      } catch (apiError) {
        console.warn('API search failed, using local search:', apiError);
        
        // Fallback to local search
        let filtered = notes;

        // Search by title and content
        if (query) {
          filtered = filtered.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Apply filters
        if (filtersToApply.type) {
          filtered = filtered.filter(note => note.type === filtersToApply.type);
        }

        if (filtersToApply.category) {
          filtered = filtered.filter(note => note.category === filtersToApply.category);
        }

        if (filtersToApply.tags) {
          const searchTags = filtersToApply.tags.toLowerCase().split(',').map(tag => tag.trim());
          filtered = filtered.filter(note =>
            note.tags?.some(tag =>
              searchTags.some(searchTag => tag.toLowerCase().includes(searchTag))
            )
          );
        }

        return filtered;
      }
    } catch (err) {
      setError(err.message || 'Failed to search notes');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [notes]);

  const refreshNotes = useCallback(() => {
    return loadNotes(filters);
  }, [loadNotes, filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Computed values
  const notesByType = useCallback(() => {
    return Object.values(NOTE_TYPES).reduce((acc, type) => {
      acc[type] = notes.filter(note => note.type === type);
      return acc;
    }, {});
  }, [notes]);

  const totalNotesCount = notes.length;
  const hasNotes = notes.length > 0;

  return {
    // State
    notes,
    isLoading,
    error,
    filters,
    searchTerm,
    
    // Actions
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    refreshNotes,
    updateFilters,
    clearError,
    
    // Computed
    notesByType: notesByType(),
    totalNotesCount,
    hasNotes
  };
}

export function useNote(id) {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNote = useCallback(async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      if (id === 'new') {
        setNote(null);
        return;
      }

      // Try API first
      try {
        const fetchedNote = await notesService.fetchNote(id);
        setNote(fetchedNote);
      } catch (apiError) {
        console.warn('API fetch failed, using mock data:', apiError);
        
        // Fallback to mock data
        const foundNote = mockNotes.find(note => note.id === parseInt(id));
        setNote(foundNote || null);
      }
    } catch (err) {
      setError(err.message || 'Failed to load note');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadNote();
  }, [loadNote]);

  const refreshNote = useCallback(() => {
    return loadNote();
  }, [loadNote]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    note,
    isLoading,
    error,
    refreshNote,
    clearError,
    isNewNote: id === 'new'
  };
}
