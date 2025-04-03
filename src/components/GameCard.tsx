
import { useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface GameCardProps {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  releaseYear: number;
  genre: string;
  platforms: string[];
  variant?: 'default' | 'horizontal';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const GameCard = ({
  id,
  title,
  imageUrl,
  rating,
  releaseYear,
  genre,
  platforms,
  variant = 'default',
  className,
  onMouseEnter,
  onMouseLeave
}: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Преобразуем рейтинг из 10-балльной системы в 5-балльную
  const displayRating = (rating / 2).toFixed(1);

  // Форматирование платформ для отображения иконок или коротких названий
  const getPlatformLabel = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'pc':
        return 'PC';
      case 'playstation':
      case 'ps5':
      case 'ps4':
        return 'PS';
      case 'xbox':
        return 'XB';
      case 'switch':
        return 'NSW';
      default:
        return platform.substring(0, 2).toUpperCase();
    }
  };

  if (variant === 'horizontal') {
    return (
      <div 
        className={cn(
          "group relative flex bg-gaming-card-bg rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg",
          isHovered && "shadow-xl",
          className
        )}
        onMouseEnter={() => {
          setIsHovered(true);
          onMouseEnter && onMouseEnter();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onMouseLeave && onMouseLeave();
        }}
      >
        <Link to={`/games/${id}`} className="w-1/3 h-full relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered && "scale-110"
            )}
          />
          <div className="absolute top-2 left-2 bg-gaming-red/90 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center">
            <Star size={12} className="mr-1" fill="white" />
            {displayRating}
          </div>
        </Link>
        
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold line-clamp-1 group-hover:text-gaming-red transition-colors">
              {title}
            </h3>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-sm text-gaming-text-secondary">{releaseYear}</span>
              <span className="w-1 h-1 bg-gaming-text-secondary rounded-full"></span>
              <span className="text-sm text-gaming-text-secondary">{genre}</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-1">
              {platforms.map((platform, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gaming-dark-accent text-gaming-text-secondary px-1.5 py-0.5 rounded"
                >
                  {getPlatformLabel(platform)}
                </span>
              ))}
            </div>
            
            <Link 
              to={`/games/${id}`}
              className={cn(
                "p-1 rounded-full",
                isHovered 
                  ? "text-gaming-red" 
                  : "text-gaming-text-secondary"
              )}
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "group relative bg-gaming-card-bg rounded-md overflow-hidden transition-all duration-300",
        isHovered && "shadow-xl transform translate-y-[-5px]",
        className
      )}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter && onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave && onMouseLeave();
      }}
    >
      <Link to={`/games/${id}`} className="relative aspect-[3/4] overflow-hidden block">
        <img 
          src={imageUrl} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        <div className="absolute top-2 right-2 bg-gaming-red/90 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center">
          <Star size={12} className="mr-1" fill="white" />
          {displayRating}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-1 mb-2">
            {platforms.map((platform, index) => (
              <span 
                key={index}
                className="text-xs bg-black/50 backdrop-blur-sm text-white px-1.5 py-0.5 rounded"
              >
                {getPlatformLabel(platform)}
              </span>
            ))}
          </div>
        </div>
      </Link>
      
      <div className="p-3">
        <h3 className="text-base font-bold line-clamp-1 group-hover:text-gaming-red transition-colors">
          {title}
        </h3>
        <div className="flex items-center mt-1 gap-2">
          <span className="text-xs text-gaming-text-secondary">{releaseYear}</span>
          <span className="w-1 h-1 bg-gaming-text-secondary rounded-full"></span>
          <span className="text-xs text-gaming-text-secondary">{genre}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
