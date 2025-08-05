import { useState } from 'react';
import { Button, Input, Select, Icon } from '../../components';

function SearchFilters({ 
  onSearch, 
  onFilterChange, 
  categories = [], 
  initialFilters = {} 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    tags: '',
    ...initialFilters
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'note', label: 'General Note' },
    { value: 'sermon', label: 'Sermon Outline' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'reflection', label: 'Reflection' },
    { value: 'study', label: 'Bible Study' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat.id, label: cat.name }))
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', type: '', tags: '' };
    setFilters(clearedFilters);
    setSearchTerm('');
    onFilterChange(clearedFilters);
    onSearch('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="search" className="w-5 h-5" />
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm bg-transparent hover:bg-white/10 text-white/80"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          <Icon name={showAdvanced ? 'chevron-up' : 'chevron-down'} className="w-4 h-4 ml-2" />
        </Button>
        
        <Button
          type="button"
          onClick={clearFilters}
          className="text-sm bg-transparent hover:bg-white/10 text-white/80"
        >
          Clear All
        </Button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            options={typeOptions}
          />
          
          <Select
            label="Category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            options={categoryOptions}
          />
          
          <Input
            label="Tags"
            value={filters.tags}
            onChange={(e) => handleFilterChange('tags', e.target.value)}
            placeholder="Filter by tags..."
          />
        </div>
      )}
    </div>
  );
}

export default SearchFilters;
