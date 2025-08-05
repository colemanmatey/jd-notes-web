import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, NoteEditor, Button, Icon } from '../components';

function NoteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const isNewNote = id === 'new';

  // Mock note data - replace with API call
  const mockNote = {
    id: parseInt(id),
    title: 'Sunday Service Sermon Notes',
    content: 'Key points from today\'s message on faith and perseverance. We discussed how challenges in life are opportunities for growth and how our faith can sustain us through difficult times.\n\nMain Scripture: Romans 8:28 - "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."\n\nKey Points:\n1. Faith is not the absence of doubt, but trust despite uncertainty\n2. Perseverance builds character and hope\n3. Community support is essential during trials\n4. Prayer is our direct line to God\'s strength',
    category: 'Sermons',
    tags: ['faith', 'perseverance', 'sunday'],
    type: 'sermon',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  };

  useEffect(() => {
    const loadNote = async () => {
      if (isNewNote) {
        setNote({
          title: '',
          content: '',
          category: '',
          tags: [],
          type: 'general'
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/notes/${id}`);
        // if (!response.ok) throw new Error('Note not found');
        // const noteData = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setNote(mockNote);
      } catch (error) {
        console.error('Failed to load note:', error);
        setError('Failed to load note. It may not exist or you may not have permission to view it.');
      } finally {
        setIsLoading(false);
      }
    };

    loadNote();
  }, [id, isNewNote]);

  const handleSave = async (noteData) => {
    setIsSaving(true);
    setError('');
    
    try {
      if (isNewNote) {
        // TODO: Replace with actual API call to create note
        // const response = await fetch('/api/notes', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(noteData)
        // });
        // const newNote = await response.json();
        
        console.log('Creating new note:', noteData);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        navigate('/dashboard');
      } else {
        // TODO: Replace with actual API call to update note
        // const response = await fetch(`/api/notes/${id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(noteData)
        // });
        // const updatedNote = await response.json();
        
        console.log('Updating note:', noteData);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setNote({ ...note, ...noteData, updatedAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      setError('Failed to save note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      
      console.log('Deleting note:', id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">
              {isNewNote ? 'Preparing note editor...' : 'Loading note...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Icon name="alert" size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <Icon name="arrow-left" size={20} />
              Back to Dashboard
            </Button>
            
            {!isNewNote && (
              <Button 
                variant="outline" 
                onClick={handleDelete}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <Icon name="trash" size={20} />
                Delete
              </Button>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900">
            {isNewNote ? 'Create New Note' : 'Edit Note'}
          </h1>
          
          {!isNewNote && note && (
            <p className="text-slate-600 mt-2">
              Last updated: {new Date(note.updatedAt).toLocaleDateString()} at {' '}
              {new Date(note.updatedAt).toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Note Editor */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <NoteEditor 
            note={note}
            onSave={handleSave}
            isLoading={isSaving}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}

export default NoteEditPage;
