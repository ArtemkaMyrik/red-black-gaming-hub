
import { useState } from 'react';
import { User, Star, ThumbsUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  id: number;
  username: string;
  avatar?: string;
  gameTitle: string;
  gameImage: string;
  rating: number;
  text: string;
  date: string;
  likes: number;
  className?: string;
}

const ReviewCard = ({
  id,
  username,
  avatar,
  gameTitle,
  gameImage,
  rating,
  text,
  date,
  likes,
  className
}: ReviewCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Преобразуем рейтинг из 10-балльной системы в 5-балльную
  const displayRating = (rating / 2).toFixed(1);

  // Generate stars based on rating (5-балльная система)
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = (rating / 2) % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={14} fill="#ea384c" stroke="none" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={14} className="text-gaming-text-secondary" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={14} fill="#ea384c" stroke="none" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-gaming-text-secondary" />);
    }
    
    return stars;
  };

  return (
    <div 
      className={cn(
        "bg-gaming-card-bg rounded-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-white/5",
        className
      )}
    >
      <div className="flex items-center p-4 border-b border-white/5">
        <div className="flex-shrink-0">
          {avatar ? (
            <img 
              src={avatar} 
              alt={username} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gaming-dark-accent flex items-center justify-center">
              <User size={20} className="text-gaming-text-secondary" />
            </div>
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <p className="font-medium text-gaming-text-primary">{username}</p>
          <div className="flex items-center text-xs text-gaming-text-secondary mt-0.5">
            <Calendar size={12} className="mr-1" />
            {date}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex">{renderStars()}</div>
          <span className="ml-2 text-sm font-bold">{displayRating}</span>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-r from-transparent via-gaming-dark/20 to-transparent">
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-20 rounded overflow-hidden flex-shrink-0">
            <img 
              src={gameImage} 
              alt={gameTitle}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h3 className="font-bold text-lg">{gameTitle}</h3>
            <div className={cn(
              "mt-2 text-sm text-gaming-text-secondary",
              !isExpanded && "line-clamp-2"
            )}>
              {text}
            </div>
            
            {text.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs text-gaming-red hover:text-gaming-red-hover transition-colors"
              >
                {isExpanded ? 'Свернуть' : 'Читать далее'}
              </button>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors",
              isLiked 
                ? "text-gaming-red" 
                : "text-gaming-text-secondary hover:text-gaming-text-primary"
            )}
          >
            <ThumbsUp size={14} className={isLiked ? "fill-gaming-red" : ""} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
