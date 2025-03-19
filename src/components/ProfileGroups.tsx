
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Типы и интерфейсы
interface Group {
  id: string;
  name: string;
  image?: string;
  membersCount: number;
  description: string;
}

// Моковые данные
const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Фанаты Skyrim',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1470',
    membersCount: 1250,
    description: 'Группа для обсуждения всего, что связано с The Elder Scrolls V: Skyrim.'
  },
  {
    id: '2',
    name: 'CS:GO Стратегии',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470',
    membersCount: 3421,
    description: 'Обсуждение тактик, стратегий и мета-игры в CS:GO и CS2.'
  },
  {
    id: '3',
    name: 'Инди Разработчики',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1471',
    membersCount: 785,
    description: 'Сообщество независимых разработчиков игр и их поклонников.'
  }
];

interface ProfileGroupsProps {
  userId: string;
}

const ProfileGroups = ({ userId }: ProfileGroupsProps) => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Фильтрация групп по поисковому запросу
  const filteredGroups = searchQuery.trim() === '' 
    ? groups 
    : groups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">Группы ({groups.length})</h2>
        
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Найти группу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-gaming-card-bg border-white/10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
        </div>
      </div>
      
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGroups.map(group => (
            <div 
              key={group.id}
              className="bg-gaming-card-bg border border-white/10 rounded-md overflow-hidden flex flex-col"
            >
              <div className="h-40 overflow-hidden">
                {group.image ? (
                  <img 
                    src={group.image} 
                    alt={group.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gaming-dark-accent flex items-center justify-center">
                    <Users size={48} className="text-gaming-text-secondary" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{group.name}</h3>
                  <span className="text-xs bg-gaming-dark-accent px-2 py-1 rounded text-gaming-text-secondary">
                    {group.membersCount} участников
                  </span>
                </div>
                
                <p className="text-sm text-gaming-text-secondary mb-4 line-clamp-2">
                  {group.description}
                </p>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/10 text-gaming-text-secondary hover:text-white"
                    asChild
                  >
                    <Link to={`/groups/${group.id}`}>
                      <ExternalLink size={16} className="mr-2" />
                      Перейти
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
          {searchQuery.trim() !== '' ? (
            <p className="text-gaming-text-secondary">По вашему запросу ничего не найдено</p>
          ) : (
            <p className="text-gaming-text-secondary">Пользователь не состоит ни в одной группе</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileGroups;
