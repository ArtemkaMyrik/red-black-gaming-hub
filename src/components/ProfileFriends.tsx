
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserMinus, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

// Типы и интерфейсы
interface Friend {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'offline';
}

// Моковые данные
const mockFriends: Friend[] = [
  { id: '1', username: 'РПГМастер', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online' },
  { id: '2', username: 'СтратегКиберспорта', avatar: 'https://i.pravatar.cc/150?img=2', status: 'offline' },
  { id: '3', username: 'ШутерПро', avatar: 'https://i.pravatar.cc/150?img=3', status: 'online' },
  { id: '4', username: 'АдвенчурЛеди', avatar: 'https://i.pravatar.cc/150?img=4', status: 'offline' },
  { id: '5', username: 'ИндиГеймер', status: 'online' },
  { id: '6', username: 'СимуляторФан', avatar: 'https://i.pravatar.cc/150?img=6', status: 'offline' },
];

interface ProfileFriendsProps {
  userId: string;
}

const ProfileFriends = ({ userId }: ProfileFriendsProps) => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleRemoveFriend = (friendId: string) => {
    setFriends(friends.filter(friend => friend.id !== friendId));
    toast.success('Друг удален из списка');
  };
  
  const handleSendMessage = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      toast.info(`Сообщение для ${friend.username}`);
    }
  };
  
  // Фильтрация друзей по поисковому запросу
  const filteredFriends = searchQuery.trim() === '' 
    ? friends 
    : friends.filter(friend => 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-gaming-red">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Друзья ({friends.length})
        </h2>
        
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Найти друга..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-gaming-card-bg border-white/10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
        </div>
      </div>
      
      {filteredFriends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFriends.map(friend => (
            <div 
              key={friend.id}
              className="bg-gaming-card-bg border border-white/10 rounded-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-12 w-12 mr-3">
                    {friend.avatar ? (
                      <AvatarImage src={friend.avatar} alt={friend.username} />
                    ) : (
                      <AvatarFallback className="bg-gaming-dark-accent">
                        {friend.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span 
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gaming-card-bg ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`} 
                  />
                </div>
                
                <div>
                  <h3 className="font-medium">{friend.username}</h3>
                  <p className="text-xs text-gaming-text-secondary">
                    {friend.status === 'online' 
                      ? 'Онлайн' 
                      : 'Не в сети'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gaming-text-secondary hover:text-white"
                  onClick={() => handleSendMessage(friend.id)}
                >
                  <MessageSquare size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gaming-text-secondary hover:text-gaming-red"
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  <UserMinus size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
          {searchQuery.trim() !== '' ? (
            <p className="text-gaming-text-secondary">По вашему запросу ничего не найдено</p>
          ) : (
            <p className="text-gaming-text-secondary">У пользователя пока нет друзей</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileFriends;
