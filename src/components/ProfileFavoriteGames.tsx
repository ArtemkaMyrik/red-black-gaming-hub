
import { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameCard from './GameCard';
import { Link } from 'react-router-dom';

interface FavoriteGame {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  releaseYear: number;
  genre: string;
  platforms: string[];
}

interface ProfileFavoriteGamesProps {
  userId: string;
}

const ProfileFavoriteGames = ({ userId }: ProfileFavoriteGamesProps) => {
  // Временные данные для демонстрации
  const [favoriteGames, setFavoriteGames] = useState<FavoriteGame[]>([
    {
      id: 1,
      title: 'The Witcher 3: Wild Hunt',
      imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2030',
      rating: 4.9,
      releaseYear: 2015,
      genre: 'RPG',
      platforms: ['PC', 'PlayStation', 'Xbox']
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
      rating: 4.8,
      releaseYear: 2018,
      genre: 'Action/Adventure',
      platforms: ['PC', 'PlayStation', 'Xbox']
    },
    {
      id: 3,
      title: 'Cyberpunk 2077',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
      rating: 4.0,
      releaseYear: 2020,
      genre: 'RPG',
      platforms: ['PC', 'PlayStation', 'Xbox']
    },
    {
      id: 4,
      title: 'Elden Ring',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070',
      rating: 4.7,
      releaseYear: 2022,
      genre: 'Action RPG',
      platforms: ['PC', 'PlayStation', 'Xbox']
    }
  ]);

  const removeFromFavorites = (gameId: number) => {
    setFavoriteGames(favoriteGames.filter(game => game.id !== gameId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          <Heart className="inline-block mr-2 text-gaming-red" size={20} />
          Избранные игры
        </h2>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteGames.map(game => (
            <div key={game.id} className="relative group">
              <GameCard {...game} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gaming-dark-accent/80 hover:bg-gaming-red text-gaming-text-secondary hover:text-white"
                onClick={() => removeFromFavorites(game.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
          <Heart className="mx-auto mb-2 text-gaming-text-secondary" size={32} />
          <p className="text-gaming-text-secondary">У вас пока нет избранных игр</p>
          <Button
            className="mt-4 bg-gaming-red hover:bg-gaming-red/90"
            asChild
          >
            <Link to="/games">
              Перейти к каталогу игр
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileFavoriteGames;
