
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserMinus, MessageSquare, Shield } from 'lucide-react';
import { toast } from 'sonner';

// Типы и интерфейсы
interface Member {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen?: string;
  role: 'admin' | 'moderator' | 'member';
  joinDate: string;
}

// Моковые данные
const mockMembers: Record<string, Member[]> = {
  '1': [
    { 
      id: '101', 
      username: 'RPGlover', 
      avatar: 'https://i.pravatar.cc/150?img=33',
      status: 'online',
      role: 'member',
      joinDate: '12.01.2023'
    },
    { 
      id: '102', 
      username: 'DragonSlayer', 
      avatar: 'https://i.pravatar.cc/150?img=42',
      status: 'offline',
      lastSeen: '3 часа назад',
      role: 'member',
      joinDate: '05.02.2023'
    },
    { 
      id: '103', 
      username: 'NordWarrior',
      status: 'offline',
      lastSeen: '1 день назад',
      role: 'member',
      joinDate: '18.03.2023'
    },
    { 
      id: '104', 
      username: 'АдминГруппы',
      avatar: 'https://i.pravatar.cc/150?img=11',
      status: 'online',
      role: 'admin',
      joinDate: '14.03.2022'
    },
    { 
      id: '105', 
      username: 'МодераторТоп',
      avatar: 'https://i.pravatar.cc/150?img=12',
      status: 'offline',
      lastSeen: '5 часов назад',
      role: 'moderator',
      joinDate: '20.05.2022'
    }
  ],
  '2': [
    { 
      id: '201', 
      username: 'HeadshotMaster', 
      avatar: 'https://i.pravatar.cc/150?img=22',
      status: 'online',
      role: 'member',
      joinDate: '10.08.2022'
    },
    { 
      id: '202', 
      username: 'SniperElite', 
      avatar: 'https://i.pravatar.cc/150?img=25',
      status: 'online',
      role: 'member',
      joinDate: '15.09.2022'
    },
    { 
      id: '203', 
      username: 'CSAdmin',
      avatar: 'https://i.pravatar.cc/150?img=30',
      status: 'online',
      role: 'admin',
      joinDate: '22.08.2021'
    }
  ]
};

interface GroupMembersProps {
  groupId: string;
  isAdmin: boolean;
}

const GroupMembers = ({ groupId, isAdmin }: GroupMembersProps) => {
  const [members, setMembers] = useState<Member[]>(mockMembers[groupId] || []);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast.success('Участник удален из группы');
  };
  
  const handleSendMessage = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      toast.info(`Открыт чат с ${member.username}`);
    }
  };
  
  // Фильтрация участников по поисковому запросу
  const filteredMembers = searchQuery.trim() === '' 
    ? members 
    : members.filter(member => 
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Участники ({members.length})</h2>
        
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Найти участника..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-gaming-dark border-white/10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
        </div>
      </div>
      
      {filteredMembers.length > 0 ? (
        <div className="space-y-3">
          {filteredMembers.map(member => (
            <div 
              key={member.id}
              className="bg-gaming-dark rounded-md p-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-10 w-10 mr-3">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.username} />
                    ) : (
                      <AvatarFallback className="bg-gaming-dark-accent">
                        {member.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span 
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gaming-dark ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`} 
                  />
                </div>
                
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{member.username}</h3>
                    {member.role !== 'member' && (
                      <span className="ml-2 flex items-center text-xs bg-gaming-dark-accent px-2 py-0.5 rounded">
                        <Shield size={12} className="mr-1" />
                        {member.role === 'admin' ? 'Админ' : 'Модератор'}
                      </span>
                    )}
                  </div>
                  <div className="flex text-xs text-gaming-text-secondary">
                    <p>
                      {member.status === 'online' 
                        ? 'В сети' 
                        : `Был в сети: ${member.lastSeen}`
                      }
                    </p>
                    <span className="mx-2">•</span>
                    <p>В группе с {member.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gaming-text-secondary hover:text-white"
                  onClick={() => handleSendMessage(member.id)}
                >
                  <MessageSquare size={18} />
                </Button>
                
                {isAdmin && member.role === 'member' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gaming-text-secondary hover:text-gaming-red"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <UserMinus size={18} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gaming-dark rounded-md">
          {searchQuery.trim() !== '' ? (
            <p className="text-gaming-text-secondary">По вашему запросу ничего не найдено</p>
          ) : (
            <p className="text-gaming-text-secondary">В группе пока нет участников</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupMembers;
