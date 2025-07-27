/**
 * NoteCard Component - Enhanced note display with modern design
 */

import { useState } from 'react';
import { Button, Icon } from '../../components';
import { formatDate, formatRelativeTime, truncateText } from '../../lib/utils.js';
import { NOTE_TYPES } from '../../constants/index.js';

const NoteCard = ({ 
  note, 
  onEdit, 
  onDelete, 
  onView,
  showActions = true,
  compact = false 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getTypeIcon = (type) => {
    const iconMap = {
      [NOTE_TYPES.SERMON]: 'document',
      [NOTE_TYPES.PRAYER]: 'heart',
      [NOTE_TYPES.REFLECTION]: 'tag',
      [NOTE_TYPES.STUDY]: 'shield',
      [NOTE_TYPES.NOTE]: 'document'
    };
    return iconMap[type] || 'document';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      [NOTE_TYPES.SERMON]: 'text-blue-400 bg-blue-900/30 border-blue-500/20',
      [NOTE_TYPES.PRAYER]: 'text-purple-400 bg-purple-900/30 border-purple-500/20',
      [NOTE_TYPES.REFLECTION]: 'text-green-400 bg-green-900/30 border-green-500/20',
      [NOTE_TYPES.STUDY]: 'text-orange-400 bg-orange-900/30 border-orange-500/20',
      [NOTE_TYPES.NOTE]: 'text-gray-400 bg-gray-900/30 border-gray-500/20'
    };
    return colorMap[type] || 'text-gray-400 bg-gray-900/30 border-gray-500/20';
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(note.id);
    } catch (error) {
      console.error('Failed to delete note:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const maxContentLength = compact ? 100 : 200;

  return (
    <article className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group">
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg border ${getTypeColor(note.type)}`}>
            <Icon name={getTypeIcon(note.type)} size={16} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1 truncate">
              {note.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="capitalize">{note.type}</span>
              {note.category && (
                <>
                  <span>•</span>
                  <span>{note.category}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {showActions && (
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(note)}
                className="p-2 hover:bg-white/10 text-white/80"
                aria-label="Edit note"
              >
                <Icon name="edit" size={16} />
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                loading={isDeleting}
                disabled={isDeleting}
                className="p-2 hover:bg-red-500/20 text-red-400"
                aria-label="Delete note"
              >
                <Icon name="trash" size={16} />
              </Button>
            )}
          </div>
        )}
      </header>

      {!compact && (
        <div className="mb-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {truncateText(note.content, maxContentLength)}
          </p>
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.slice(0, compact ? 2 : 4).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > (compact ? 2 : 4) && (
            <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
              +{note.tags.length - (compact ? 2 : 4)} more
            </span>
          )}
        </div>
      )}

      <footer className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <time 
            dateTime={note.updatedAt}
            title={formatDate(note.updatedAt)}
          >
            {formatRelativeTime(note.updatedAt)}
          </time>
          
          {note.createdAt !== note.updatedAt && (
            <span className="text-gray-500" title="This note has been edited">
              Edited
            </span>
          )}
        </div>
        
        {onView && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(note)}
            className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1"
          >
            View Details
          </Button>
        )}
      </footer>
    </article>
  );
};

export default NoteCard;
