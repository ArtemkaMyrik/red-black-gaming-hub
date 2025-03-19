
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import GameCard from './GameCard';

const topGames = [
  {
    id: 1,
    title: 'The Witcher 3: Wild Hunt',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1770&auto=format&fit=crop',
    rating: 9.8,
    releaseYear: 2015,
    genre: 'RPG',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch']
  },
  {
    id: 2,
    title: 'Red Dead Redemption 2',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1770&auto=format&fit=crop',
    rating: 9.7,
    releaseYear: 2018,
    genre: 'Action-Adventure',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  {
    id: 3,
    title: 'God of War',
    imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1770&auto=format&fit=crop',
    rating: 9.6,
    releaseYear: 2018,
    genre: 'Action-Adventure',
    platforms: ['PlayStation', 'PC']
  },
  {
    id: 4,
    title: 'The Legend of Zelda: Breath of the Wild',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1647&auto=format&fit=crop',
    rating: 9.5,
    releaseYear: 2017,
    genre: 'Action-Adventure',
    platforms: ['Switch']
  },
  {
    id: 5,
    title: 'Ghost of Tsushima',
    imageUrl: 'https://images.unsplash.com/photo-1605479695026-6f7602307d94?q=80&w=1974&auto=format&fit=crop',
    rating: 9.3,
    releaseYear: 2020,
    genre: 'Action-Adventure',
    platforms: ['PlayStation', 'PC']
  }
];

const TopGames = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gaming-dark-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Top Rated Games</h2>
            <p className="text-gaming-text-secondary mt-2">
              Our selection of the highest-rated games of all time
            </p>
          </div>
          
          <a 
            href="/games"
            className="mt-4 md:mt-0 inline-flex items-center text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
          >
            View All Games
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topGames.map((game, index) => (
            <GameCard
              key={game.id}
              {...game}
              className={`
                transform transition-transform duration-500
                ${hoveredIndex !== null && hoveredIndex !== index 
                  ? 'opacity-70 scale-95' 
                  : 'opacity-100 scale-100'}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopGames;
