
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Clock, Download, FileInput } from 'lucide-react';
import { Note } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';

interface NotesSectionProps {
  notes: Note[];
  isTeacher?: boolean;
  classId: string;
  onAddNote?: (note: Omit<Note, 'id'>) => void;
}

const NotesSection = ({ notes, isTeacher = false, classId, onAddNote }: NotesSectionProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newNote: Omit<Note, 'id'> = {
      classId,
      title,
      content,
      fileUrl: file ? URL.createObjectURL(file) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    if (onAddNote) {
      onAddNote(newNote);
    }
    
    toast({
      title: "Note Added",
      description: "Your note has been successfully added",
    });
    
    setTitle('');
    setContent('');
    setFile(null);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lecture Notes</h3>
        {isTeacher && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-xavier-600 hover:bg-xavier-700 btn-hover">
                <Plus className="h-4 w-4 mr-2" /> Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogDescription>
                  Create a new note or upload course materials for your students.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="file">Attachment (Optional)</FormLabel>
                  <div className="flex items-center">
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                      className="w-full justify-start"
                    >
                      <FileInput className="h-4 w-4 mr-2" />
                      {file ? file.name : 'Choose file'}
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-xavier-600 hover:bg-xavier-700 btn-hover">
                    Add Note
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No notes available for this class.</p>
          {isTeacher && (
            <p className="text-sm">Click "Add Note" to create your first note.</p>
          )}
        </div>
      ) : (
        <ScrollArea className="h-[400px] rounded-md border border-gray-100 bg-white">
          <div className="p-4 space-y-3">
            {notes.map((note) => (
              <Card key={note.id} className="transition-all duration-200 hover:shadow-sm hover:border-xavier-200">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium">{note.title}</CardTitle>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.content}</p>
                  {note.fileUrl && (
                    <a 
                      href={note.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-xavier-600 hover:text-xavier-700 btn-hover"
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download attachment
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default NotesSection;
