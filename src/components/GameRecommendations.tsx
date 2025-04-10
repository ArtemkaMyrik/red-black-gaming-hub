
import { ChevronRight } from 'lucide-react';
import GameCard from './GameCard';

const recommendedGames = [
  {
    id: 1,
    title: 'Hellblade: Senua\'s Sacrifice',
    imageUrl: 'https://images.unsplash.com/photo-1559000357-f6b52ddfcde3?q=80&w=1769&auto=format&fit=crop',
    rating: 8.7,
    releaseYear: 2017,
    genre: 'Action-Adventure',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch']
  },
  {
    id: 2,
    title: 'Death Stranding',
    imageUrl: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?q=80&w=1887&auto=format&fit=crop',
    rating: 8.6,
    releaseYear: 2019,
    genre: 'Action',
    platforms: ['PC', 'PlayStation']
  },
  {
    id: 3,
    title: 'Hollow Knight',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1770&auto=format&fit=crop',
    rating: 9.1,
    releaseYear: 2017,
    genre: 'Metroidvania',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch']
  }
];

const GameRecommendations = () => {
  return (
    <section className="py-16 bg-gaming-dark-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Рекомендации для вас</h2>
            <p className="text-gaming-text-secondary mt-2">
              Персонализированные подборки игр на основе ваших предпочтений
            </p>
          </div>
          
          <a 
            href="/recommendations"
            className="mt-4 md:mt-0 inline-flex items-center text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
          >
            Больше рекомендаций
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {recommendedGames.map((game) => (
            <div key={game.id} className="h-[140px]">
              <GameCard
                {...game}
                variant="horizontal"
                className="hover:translate-x-1 transition-transform duration-300 h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameRecommendations;
