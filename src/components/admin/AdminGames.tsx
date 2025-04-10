import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Trash, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import AdminGameForm from './AdminGameForm';

// Mock data with properly typed status
const mockGames = [
  { id: 1, title: 'Cyberpunk 2077', publisher: 'CD Projekt RED', releaseDate: '10.12.2020', status: 'approved' as const },
  { id: 2, title: 'The Witcher 3', publisher: 'CD Projekt RED', releaseDate: '19.05.2015', status: 'approved' as const },
  { id: 3, title: 'Elden Ring', publisher: 'FromSoftware', releaseDate: '25.02.2022', status: 'pending' as const },
  { id: 4, title: 'Starfield', publisher: 'Bethesda', releaseDate: '06.09.2023', status: 'pending' as const },
  { id: 5, title: 'Baldur\'s Gate 3', publisher: 'Larian Studios', releaseDate: '03.08.2023', status: 'approved' as const },
];

interface Game {
  id: number;
  title: string;
  publisher: string;
  releaseDate: string;
  status: 'approved' | 'pending' | 'rejected';
}

const AdminGames = () => {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState<number | null>(null);
  
  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const deleteGame = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту игру?')) {
      setGames(games.filter(game => game.id !== id));
      toast.success('Игра удалена');
    }
  };
  
  const startEditingGame = (id: number) => {
    setEditingGameId(id);
  };

  const updateGame = (id: number, updatedData: Omit<Game, 'id' | 'status'>) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, ...updatedData } : game
    ));
    setEditingGameId(null);
    toast.success('Игра успешно обновлена');
  };
  
  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      {editingGameId !== null ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Редактирование игры</h2>
            <Button 
              variant="outline" 
              onClick={() => setEditingGameId(null)}
              className="border-white/10"
            >
              Вернуться к списку
            </Button>
          </div>
          <AdminGameForm 
            gameId={editingGameId}
            onSave={(data) => updateGame(editingGameId, data)}
            gameData={games.find(game => game.id === editingGameId)}
          />
        </>
      ) : (
        <>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gaming-text-secondary" size={18} />
              <Input
                placeholder="Поиск игр..."
                className="pl-8 bg-gaming-dark border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table className="min-w-full bg-gaming-dark">
              <TableHeader>
                <TableRow className="bg-gaming-dark-accent hover:bg-gaming-dark-accent">
                  <TableHead className="w-[300px]">Название</TableHead>
                  <TableHead className="hidden md:table-cell">Издатель</TableHead>
                  <TableHead className="hidden md:table-cell">Дата выхода</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <TableRow key={game.id} className="hover:bg-gaming-dark-accent">
                      <TableCell className="font-medium">{game.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{game.publisher}</TableCell>
                      <TableCell className="hidden md:table-cell">{game.releaseDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditingGame(game.id)}
                            className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteGame(game.id)}
                            className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-red-500"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Ничего не найдено.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

interface AddGameFormProps {
  onSubmit: (game: Omit<Game, 'id' | 'status'>) => void;
  onCancel: () => void;
}

const AddGameForm = ({ onSubmit, onCancel }: AddGameFormProps) => {
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      publisher,
      releaseDate
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Название игры
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gaming-dark border-white/10"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="publisher" className="block text-sm font-medium">
          Издатель
        </label>
        <Input
          id="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="bg-gaming-dark border-white/10"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="releaseDate" className="block text-sm font-medium">
          Дата выхода
        </label>
        <Input
          id="releaseDate"
          type="text"
          placeholder="дд.мм.гггг"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="bg-gaming-dark border-white/10"
          required
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border-white/10"
        >
          Отмена
        </Button>
        <Button type="submit" className="bg-gaming-red hover:bg-gaming-red/90">
          Добавить
        </Button>
      </div>
    </form>
  );
};

export default AdminGames;
