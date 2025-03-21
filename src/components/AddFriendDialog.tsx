
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Типы и интерфейсы
interface User {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen?: string;
  isFriend: boolean;
  hasPendingRequest: boolean;
}

// Моковые данные
const mockUsers: User[] = [
  { 
    id: '1', 
    username: 'RPGMaster', 
    avatar: 'https://i.pravatar.cc/150?img=11', 
    status: 'online',
    isFriend: true,
    hasPendingRequest: false
  },
  { 
    id: '2', 
    username: 'FPSLegend', 
    status: 'offline',
    lastSeen: '1 час назад',
    isFriend: false,
    hasPendingRequest: true
  },
  { 
    id: '3', 
    username: 'StrategyKing', 
    avatar: 'https://i.pravatar.cc/150?img=13', 
    status: 'online',
    isFriend: false,
    hasPendingRequest: false
  },
  { 
    id: '4', 
    username: 'MMOPlayer', 
    avatar: 'https://i.pravatar.cc/150?img=14', 
    status: 'offline',
    lastSeen: '2 дня назад',
    isFriend: false,
    hasPendingRequest: false
  },
  { 
    id: '5', 
    username: 'SimRacer', 
    status: 'online',
    isFriend: false,
    hasPendingRequest: false
  }
];

const AddFriendDialog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Имитация поиска с задержкой
    setTimeout(() => {
      const results = mockUsers.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };
  
  const handleSendRequest = (userId: string) => {
    setSearchResults(searchResults.map(user => 
      user.id === userId ? { ...user, hasPendingRequest: true } : user
    ));
    toast.success('Заявка в друзья отправлена');
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gaming-red hover:bg-gaming-red-hover">
          <UserPlus size={16} className="mr-2" />
          Добавить друга
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gaming-card-bg border-white/10 text-gaming-text-primary">
        <DialogHeader>
          <DialogTitle>Поиск друзей</DialogTitle>
          <DialogDescription className="text-gaming-text-secondary">
            Найдите и добавьте новых друзей по имени пользователя
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Введите имя пользователя..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10 bg-gaming-dark border-white/10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-gaming-red hover:bg-gaming-red-hover"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Поиск'
              )}
            </Button>
          </div>
          
          {isSearching ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gaming-red" />
            </div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {searchResults.map(user => (
                    <div 
                      key={user.id}
                      className="bg-gaming-dark rounded-md p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-10 w-10 mr-3">
                            {user.avatar ? (
                              <AvatarImage src={user.avatar} alt={user.username} />
                            ) : (
                              <AvatarFallback className="bg-gaming-dark-accent">
                                {user.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span 
                            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gaming-dark ${
                              user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                            }`} 
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{user.username}</h3>
                          <p className="text-xs text-gaming-text-secondary">
                            {user.status === 'online' 
                              ? 'В сети' 
                              : `Был в сети: ${user.lastSeen}`
                            }
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        disabled={user.isFriend || user.hasPendingRequest}
                        onClick={() => handleSendRequest(user.id)}
                        className={
                          user.isFriend ? "bg-gaming-dark-accent hover:bg-gaming-dark-accent" :
                          user.hasPendingRequest ? "bg-gaming-dark-accent hover:bg-gaming-dark-accent" :
                          "bg-gaming-red hover:bg-gaming-red-hover"
                        }
                      >
                        {user.isFriend ? 'Уже в друзьях' : 
                          user.hasPendingRequest ? 'Заявка отправлена' : 'Добавить'}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery.trim() !== '' && !isSearching && (
                  <div className="text-center p-8 bg-gaming-dark rounded-md">
                    <p className="text-gaming-text-secondary">Пользователи не найдены</p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
