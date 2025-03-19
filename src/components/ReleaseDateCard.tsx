
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReleaseDateCardProps {
  id: number;
  title: string;
  imageUrl: string;
  releaseDate: string;
  formattedDate: string;
  platforms: string[];
  daysUntilRelease: number;
  isReleased?: boolean;
  className?: string;
}

const ReleaseDateCard = ({
  id,
  title,
  imageUrl,
  releaseDate,
  formattedDate,
  platforms,
  daysUntilRelease,
  isReleased = false,
  className
}: ReleaseDateCardProps) => {
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

  return (
    <div 
      className={cn(
        "flex items-center p-3 border-b border-white/5 hover:bg-gaming-card-bg transition-colors",
        className
      )}
    >
      <div className="w-[60px] h-[80px] rounded overflow-hidden flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {platforms.map((platform, index) => (
            <span 
              key={index}
              className="text-xs bg-gaming-dark px-1.5 py-0.5 rounded"
            >
              {getPlatformLabel(platform)}
            </span>
          ))}
        </div>
      </div>
      
      <div className="ml-4 flex-shrink-0 text-right">
        <div className="flex items-center text-xs text-gaming-text-secondary mb-1">
          <Calendar size={12} className="mr-1" />
          {formattedDate}
        </div>
        
        <div className={cn(
          "text-xs font-bold",
          isReleased 
            ? "text-green-500" 
            : daysUntilRelease <= 7 
              ? "text-gaming-red" 
              : "text-gaming-text-secondary"
        )}>
          {isReleased 
            ? 'Выпущена' 
            : daysUntilRelease === 0 
              ? 'Выходит сегодня!' 
              : `${daysUntilRelease} дн. до выхода`}
        </div>
      </div>
      
      <ChevronRight size={16} className="ml-2 text-gaming-text-secondary" />
    </div>
  );
};

export default ReleaseDateCard;
