import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, SearchFilters, NoteCard, Button, Icon } from '../components';

function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tag: '',
    type: ''
  });

  // Mock notes data - replace with API call
  const mockNotes = [
    {
      id: 1,
      title: 'Sunday Service Sermon Notes',
      content: 'Key points from today\'s message on faith and perseverance...',
      category: 'Sermons',
      tags: ['faith', 'perseverance', 'sunday'],
      type: 'sermon',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      title: 'Youth Group Discussion Points',
      content: 'Topics to cover in next week\'s youth group meeting...',
      category: 'Youth Ministry',
      tags: ['youth', 'discussion', 'community'],
      type: 'meeting',
      createdAt: '2024-01-14T15:30:00Z',
      updatedAt: '2024-01-14T15:30:00Z'
    },
    {
      id: 3,
      title: 'Prayer Requests - January',
      content: 'Ongoing prayer needs from the congregation...',
      category: 'Prayer',
      tags: ['prayer', 'congregation', 'january'],
      type: 'prayer',
      createdAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T09:15:00Z'
    },
    {
      id: 4,
      title: 'Scripture Study - Romans 8',
      content: 'Deep dive into Romans chapter 8 verses 1-17...',
      category: 'Bible Study',
      tags: ['romans', 'scripture', 'study'],
      type: 'study',
      createdAt: '2024-01-12T14:20:00Z',
      updatedAt: '2024-01-12T14:20:00Z'
    }
  ];

  // Load notes on component mount
  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/notes');
        // const notesData = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setNotes(mockNotes);
        setFilteredNotes(mockNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Filter notes when filters change
  useEffect(() => {
    let filtered = [...notes];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(note => note.category === filters.category);
    }

    // Tag filter
    if (filters.tag) {
      filtered = filtered.filter(note => note.tags.includes(filters.tag));
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(note => note.type === filters.type);
    }

    setFilteredNotes(filtered);
  }, [notes, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
      
      setNotes(prev => prev.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your notes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Your Notes</h1>
              <p className="text-slate-600 mt-1">
                {filteredNotes.length} of {notes.length} notes
              </p>
            </div>
            
            <Link to="/notes/new">
              <Button variant="primary" className="flex items-center gap-2">
                <Icon name="plus" size={20} />
                New Note
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters 
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="search" size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {notes.length === 0 ? 'No notes yet' : 'No notes match your filters'}
            </h3>
            <p className="text-slate-600 mb-6">
              {notes.length === 0 
                ? 'Get started by creating your first note'
                : 'Try adjusting your search criteria or filters'
              }
            </p>
            {notes.length === 0 && (
              <Link to="/notes/new">
                <Button variant="primary" className="flex items-center gap-2">
                  <Icon name="plus" size={20} />
                  Create your first note
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
