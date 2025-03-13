
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Note } from '@/utils/types';
import { FileText, Download, Calendar } from 'lucide-react';

const NotesSection = ({ notes }: { notes: Note[] }) => {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedNote(expandedNote === id ? null : id);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {notes.length > 0 ? (
        notes.map(note => (
          <div 
            key={note.id} 
            className="p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-xavier-50 rounded-md flex items-center justify-center mr-3">
                  <FileText size={20} className="text-xavier-600" />
                </div>
                <div>
                  <h3 className="font-medium">{note.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar size={12} className="mr-1" />
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                </div>
              </div>
              {note.fileUrl && (
                <Button variant="ghost" size="icon">
                  <Download size={16} />
                </Button>
              )}
            </div>
            
            {(expandedNote === note.id || notes.length <= 2) && (
              <div className="mt-3 text-gray-700 text-sm pl-13 ml-13">
                <p>{note.content}</p>
              </div>
            )}
            
            {notes.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => toggleExpand(note.id)}
              >
                {expandedNote === note.id ? 'Show less' : 'Show more'}
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <FileText size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">No notes available for this class yet.</p>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
