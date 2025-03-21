
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Trash, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockGames = [
  { id: 1, title: 'Cyberpunk 2077', publisher: 'CD Projekt RED', releaseDate: '10.12.2020', status: 'approved' },
  { id: 2, title: 'The Witcher 3', publisher: 'CD Projekt RED', releaseDate: '19.05.2015', status: 'approved' },
  { id: 3, title: 'Elden Ring', publisher: 'FromSoftware', releaseDate: '25.02.2022', status: 'pending' },
  { id: 4, title: 'Starfield', publisher: 'Bethesda', releaseDate: '06.09.2023', status: 'pending' },
  { id: 5, title: 'Baldur\'s Gate 3', publisher: 'Larian Studios', releaseDate: '03.08.2023', status: 'approved' },
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
  
  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const approveGame = (id: number) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, status: 'approved' as const } : game
    ));
    toast.success('Игра одобрена');
  };
  
  const rejectGame = (id: number) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, status: 'rejected' as const } : game
    ));
    toast.success('Игра отклонена');
  };
  
  const deleteGame = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту игру?')) {
      setGames(games.filter(game => game.id !== id));
      toast.success('Игра удалена');
    }
  };
  
  const addGame = (newGame: Omit<Game, 'id' | 'status'>) => {
    const newId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
    setGames([...games, { ...newGame, id: newId, status: 'pending' }]);
    setIsAddGameDialogOpen(false);
    toast.success('Игра добавлена и ожидает проверки');
  };
  
  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Управление играми</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gaming-text-secondary" size={18} />
            <Input
              placeholder="Поиск игр..."
              className="pl-8 bg-gaming-dark border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddGameDialogOpen} onOpenChange={setIsAddGameDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gaming-red hover:bg-gaming-red/90">
                <PlusCircle size={16} className="mr-2" />
                Добавить игру
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gaming-card-bg border-white/10">
              <DialogHeader>
                <DialogTitle>Добавить новую игру</DialogTitle>
              </DialogHeader>
              <AddGameForm onSubmit={addGame} onCancel={() => setIsAddGameDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="rounded-md border border-white/10 overflow-hidden">
        <Table className="min-w-full bg-gaming-dark">
          <TableHeader>
            <TableRow className="bg-gaming-dark-accent hover:bg-gaming-dark-accent">
              <TableHead className="w-[300px]">Название</TableHead>
              <TableHead className="hidden md:table-cell">Издатель</TableHead>
              <TableHead className="hidden md:table-cell">Дата выхода</TableHead>
              <TableHead>Статус</TableHead>
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
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      game.status === 'approved' 
                        ? 'bg-green-900/30 text-green-400' 
                        : game.status === 'rejected'
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {game.status === 'approved' 
                        ? 'Одобрено' 
                        : game.status === 'rejected'
                        ? 'Отклонено'
                        : 'На проверке'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {game.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => approveGame(game.id)}
                            className="h-8 w-8 p-0 text-green-500"
                          >
                            <CheckCircle size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => rejectGame(game.id)}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <XCircle size={16} />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
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
                <TableCell colSpan={5} className="h-24 text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
