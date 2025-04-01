
import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
}

const CurationGamesDialog = ({ open, onOpenChange, title, games }: CurationGamesDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gaming-card-bg border-white/10 max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
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
              <GameCard
                key={game.id}
                {...game}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gaming-text-secondary">
              Игры не найдены. Попробуйте изменить запрос поиска.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CurationGamesDialog;
