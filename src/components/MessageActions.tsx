
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

interface MessageActionsProps {
  messageId: number | string;
  messageText: string;
  isAuthor: boolean;
  onEdit: (id: number | string, newText: string) => void;
  onDelete: (id: number | string) => void;
}

const MessageActions = ({ 
  messageId, 
  messageText, 
  isAuthor, 
  onEdit, 
  onDelete 
}: MessageActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(messageText);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  if (!isAuthor) return null;
  
  const handleStartEdit = () => {
    setEditText(messageText);
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(messageText);
  };
  
  const handleSaveEdit = () => {
    if (editText.trim() === '') {
      toast.error('Сообщение не может быть пустым');
      return;
    }
    
    onEdit(messageId, editText);
    setIsEditing(false);
    toast.success('Сообщение обновлено');
  };
  
  const handleDelete = () => {
    setShowDeleteDialog(true);
  };
  
  const confirmDelete = () => {
    onDelete(messageId);
    setShowDeleteDialog(false);
    toast.success('Сообщение удалено');
  };
  
  if (isEditing) {
    return (
      <div className="mt-2 space-y-2">
        <Textarea 
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="min-h-24 bg-gaming-dark border-white/10"
          placeholder="Редактировать сообщение..."
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelEdit}
            className="border-white/10"
          >
            Отмена
          </Button>
          <Button
            size="sm"
            className="bg-gaming-red hover:bg-gaming-red/90"
            onClick={handleSaveEdit}
          >
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gaming-dark-accent border-white/10">
          <DropdownMenuItem 
            onClick={handleStartEdit}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Edit size={14} />
            <span>Редактировать</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-500 cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Удалить</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-gaming-card-bg border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить сообщение?</AlertDialogTitle>
            <AlertDialogDescription className="text-gaming-text-secondary">
              Это действие нельзя отменить. Сообщение будет безвозвратно удалено.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10">Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-900 hover:bg-red-800 text-white"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MessageActions;
