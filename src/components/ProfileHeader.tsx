
import { PencilLine, Calendar, GamepadIcon, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  profile: {
    id: string;
    username: string;
    avatar?: string;
    coverImage?: string;
    bio?: string;
    joinDate: string;
    friends: number;
    games: number;
    reviews: number;
  };
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const isCurrentUser = true; // Временно для демонстрации, нужно заменить на проверку авторизации
  
  return (
    <div className="relative">
      {/* Фоновое изображение */}
      <div 
        className="w-full h-64 md:h-80 bg-gaming-card-bg bg-cover bg-center relative"
        style={{ 
          backgroundImage: profile.coverImage 
            ? `linear-gradient(to bottom, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 0.8)), url(${profile.coverImage})` 
            : undefined 
        }}
      >
        {isCurrentUser && (
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-4 right-4 bg-gaming-dark-accent/80 border-white/10 hover:bg-gaming-card-bg"
          >
            <PencilLine size={16} className="mr-2" />
            Изменить фон
          </Button>
        )}
      </div>
      
      {/* Основная информация профиля */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative -mt-20 mb-4 flex flex-col md:flex-row md:items-end">
          {/* Аватар */}
          <div className="absolute -top-16 left-4 md:static md:mr-6">
            <div className="relative">
              <Avatar className="h-32 w-32 ring-4 ring-gaming-dark">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.username} />
                ) : (
                  <AvatarFallback className="text-3xl bg-gaming-card-bg">
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              
              {isCurrentUser && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-gaming-dark-accent border border-white/10"
                >
                  <PencilLine size={14} />
                </Button>
              )}
            </div>
          </div>
          
          {/* Информация пользователя */}
          <div className="mt-16 md:mt-0 flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{profile.username}</h1>
                <div className="flex items-center mt-1 text-sm text-gaming-text-secondary">
                  <Calendar size={14} className="mr-1" />
                  <span>На сайте с {profile.joinDate}</span>
                </div>
              </div>
              
              {isCurrentUser ? (
                <Button 
                  className="mt-4 md:mt-0 bg-gaming-red hover:bg-gaming-red-hover"
                >
                  <PencilLine size={16} className="mr-2" />
                  Редактировать профиль
                </Button>
              ) : (
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="border-white/10">
                    Добавить в друзья
                  </Button>
                  <Button className="bg-gaming-red hover:bg-gaming-red-hover">
                    Написать сообщение
                  </Button>
                </div>
              )}
            </div>
            
            {/* Краткая статистика */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-sm">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gaming-card-bg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="font-medium">{profile.friends}</span>
                <span className="text-gaming-text-secondary ml-1">друзей</span>
              </div>
              
              <div className="flex items-center text-sm">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gaming-card-bg mr-2">
                  <GamepadIcon size={16} />
                </div>
                <span className="font-medium">{profile.games}</span>
                <span className="text-gaming-text-secondary ml-1">игр</span>
              </div>
              
              <div className="flex items-center text-sm">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gaming-card-bg mr-2">
                  <MessageSquare size={16} />
                </div>
                <span className="font-medium">{profile.reviews}</span>
                <span className="text-gaming-text-secondary ml-1">отзывов</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Описание */}
        {profile.bio && (
          <div className="mt-6 bg-gaming-card-bg border border-white/10 rounded-md p-4">
            <p className="text-gaming-text-secondary">{profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
