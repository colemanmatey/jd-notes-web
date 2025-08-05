/**
 * NoteEditor Component - Create and edit notes
 */

import { useState, useEffect } from 'react';
import { Button, Input, Textarea, Select } from '../../components';
import { NOTE_TYPES } from '../../constants/index.js';
import { generateId } from '../../lib/utils.js';

const NoteEditor = ({
  note = null,
  categories = [],
  onSave,
  onCancel,
  isLoading = false,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    type: NOTE_TYPES.NOTE
  });
  const [errors, setErrors] = useState({});

  // Note type options for dropdown
  const noteTypeOptions = [
    { value: NOTE_TYPES.NOTE, label: 'General Note' },
    { value: NOTE_TYPES.SERMON, label: 'Sermon Outline' },
    { value: NOTE_TYPES.PRAYER, label: 'Prayer' },
    { value: NOTE_TYPES.REFLECTION, label: 'Reflection' },
    { value: NOTE_TYPES.STUDY, label: 'Bible Study' }
  ];

  // Category options
  const categoryOptions = [
    { value: '', label: 'Select a category' },
    ...categories.map(cat => ({
      value: cat.id || cat.name,
      label: cat.name || cat.label
    }))
  ];

  // Initialize form with note data if editing
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        category: note.category || '',
        tags: Array.isArray(note.tags) ? note.tags.join(', ') : (note.tags || ''),
        type: note.type || NOTE_TYPES.NOTE
      });
    }
  }, [note]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Process form data
    const processedData = {
      id: note?.id || generateId(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      type: formData.type,
      tags: formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : []
    };

    onSave(processedData);
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${className}`}>
      <h2 className="text-xl font-bold text-white mb-6">
        {note ? 'Edit Note' : 'Create New Note'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter note title"
          error={errors.title}
          required
          disabled={isLoading}
          className="text-white"
          inputClassName="bg-white/15 border-white/30 text-white placeholder-gray-300"
        />

        <Select
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          options={noteTypeOptions}
          error={errors.type}
          required
          disabled={isLoading}
          className="text-white"
          selectClassName="bg-white/15 border-white/30 text-white"
        />

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={categoryOptions}
          placeholder="Select a category (optional)"
          disabled={isLoading}
          className="text-white"
          selectClassName="bg-white/15 border-white/30 text-white"
        />

        <Input
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="Enter tags separated by commas"
          disabled={isLoading}
          className="text-white"
          inputClassName="bg-white/15 border-white/30 text-white placeholder-gray-300"
        />

        <Textarea
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your note content here..."
          rows={10}
          error={errors.content}
          required
          disabled={isLoading}
          showCharCount
          maxLength={5000}
          className="text-white"
          textareaClassName="bg-white/15 border-white/30 text-white placeholder-gray-300"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
