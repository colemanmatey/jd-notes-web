import { useState, useEffect } from 'react';
import { notesAPI } from '../utils/api';

export function useNotes(initialFilters = {}) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Load notes when component mounts or filters change
  useEffect(() => {
    loadNotes();
  }, [filters]);

  const loadNotes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const notesData = await notesAPI.getNotes(filters);
      setNotes(notesData);
    } catch (err) {
      console.error('Failed to load notes:', err);
      setError(err.message || 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async (noteData) => {
    try {
      const newNote = await notesAPI.createNote(noteData);
      setNotes(prevNotes => [newNote, ...prevNotes]);
      return { success: true, note: newNote };
    } catch (err) {
      console.error('Failed to create note:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to create note' 
      };
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const updatedNote = await notesAPI.updateNote(id, noteData);
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? updatedNote : note
        )
      );
      return { success: true, note: updatedNote };
    } catch (err) {
      console.error('Failed to update note:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to update note' 
      };
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesAPI.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete note:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to delete note' 
      };
    }
  };

  const searchNotes = async (query, searchFilters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const searchResults = await notesAPI.searchNotes(query, searchFilters);
      setNotes(searchResults);
      return { success: true, results: searchResults };
    } catch (err) {
      console.error('Failed to search notes:', err);
      setError(err.message || 'Failed to search notes');
      return { 
        success: false, 
        error: err.message || 'Failed to search notes' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const refreshNotes = () => {
    loadNotes();
  };

  return {
    notes,
    isLoading,
    error,
    filters,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    updateFilters,
    clearFilters,
    refreshNotes,
  };
}

export function useNote(id) {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && id !== 'new') {
      loadNote();
    } else if (id === 'new') {
      setNote({
        title: '',
        content: '',
        category: '',
        tags: [],
        type: 'general'
      });
      setIsLoading(false);
    }
  }, [id]);

  const loadNote = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const noteData = await notesAPI.getNote(id);
      setNote(noteData);
    } catch (err) {
      console.error('Failed to load note:', err);
      setError(err.message || 'Failed to load note');
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async (noteData) => {
    try {
      let savedNote;
      
      if (id === 'new') {
        savedNote = await notesAPI.createNote(noteData);
      } else {
        savedNote = await notesAPI.updateNote(id, noteData);
      }
      
      setNote(savedNote);
      return { success: true, note: savedNote };
    } catch (err) {
      console.error('Failed to save note:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to save note' 
      };
    }
  };

  const deleteNote = async () => {
    try {
      await notesAPI.deleteNote(id);
      return { success: true };
    } catch (err) {
      console.error('Failed to delete note:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to delete note' 
      };
    }
  };

  return {
    note,
    isLoading,
    error,
    saveNote,
    deleteNote,
    refreshNote: loadNote,
  };
}
