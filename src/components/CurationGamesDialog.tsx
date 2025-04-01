
import { useState, useEffect } from 'react';
import { X, Search, Plus, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GameCard from './GameCard';

interface CurationGame {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  releaseYear: number;
  genre: string;
  platforms: string[];
}

interface CurationGamesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  games: CurationGame[];
  mode?: 'view' | 'create';
  onCreateCuration?: (curation: { title: string; category: string; games: number[] }) => void;
  allGames?: CurationGame[];
}

const CurationGamesDialog = ({ 
  open, 
  onOpenChange, 
  title, 
  games, 
  mode = 'view', 
  onCreateCuration,
  allGames = [] 
}: CurationGamesDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [curationTitle, setCurationTitle] = useState('');
  const [curationCategory, setCurationCategory] = useState('');
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  // Сбрасываем состояние при открытии/закрытии диалога
  useEffect(() => {
    if (open && mode === 'create') {
      setCurationTitle('');
      setCurationCategory('');
      setSelectedGames([]);
    }
  }, [open, mode]);

  const filteredGames = mode === 'create' 
    ? allGames.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleGameSelect = (gameId: number) => {
    setSelectedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId]
    );
  };

  const handleCreateCuration = () => {
    if (!curationTitle) {
      // TODO: добавить уведомление об ошибке
      return;
    }

    onCreateCuration?.({
      title: curationTitle,
      category: curationCategory,
      games: selectedGames
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gaming-card-bg border-white/10 max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {mode === 'create' ? 'Создание новой подборки' : title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 rounded-full text-gaming-text-secondary hover:text-gaming-text-primary"
            >
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>
        
        {mode === 'create' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Название подборки</label>
              <Input
                type="text"
                placeholder="Введите название подборки"
                value={curationTitle}
                onChange={(e) => setCurationTitle(e.target.value)}
                className="w-full bg-gaming-dark border border-white/5 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Категория</label>
              <Input
                type="text"
                placeholder="Например: RPG, Приключения, Стратегии"
                value={curationCategory}
                onChange={(e) => setCurationCategory(e.target.value)}
                className="w-full bg-gaming-dark border border-white/5 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Выберите игры для подборки</label>
              <p className="text-xs text-gaming-text-secondary mb-3">
                Отметьте игры, которые хотите добавить в подборку
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Поиск игр..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gaming-dark border border-white/5 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gaming-red"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game.id} className="relative">
                {mode === 'create' && (
                  <button
                    onClick={() => handleGameSelect(game.id)}
                    className={`absolute right-2 top-2 z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedGames.includes(game.id)
                        ? 'bg-gaming-red text-white'
                        : 'bg-gaming-dark/80 text-gaming-text-secondary'
                    }`}
                  >
                    {selectedGames.includes(game.id) ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                )}
                <GameCard
                  {...game}
                  className={mode === 'create' && selectedGames.includes(game.id) 
                    ? 'ring-2 ring-gaming-red' 
                    : ''}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gaming-text-secondary">
              Игры не найдены. Попробуйте изменить запрос поиска.
            </div>
          )}
        </div>

        {mode === 'create' && (
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button 
              className="bg-gaming-red hover:bg-gaming-red/90"
              onClick={handleCreateCuration}
              disabled={!curationTitle || selectedGames.length === 0}
            >
              Создать подборку
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CurationGamesDialog;
