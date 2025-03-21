
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Users, 
  Plus,
  Filter,
  ArrowUpDown 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Типы и интерфейсы
interface Group {
  id: string;
  name: string;
  image?: string;
  description: string;
  membersCount: number;
  category: string;
  isJoined: boolean;
}

// Моковые данные
const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Фанаты Skyrim',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1470',
    description: 'Группа для обсуждения всего, что связано с The Elder Scrolls V: Skyrim.',
    membersCount: 1250,
    category: 'RPG',
    isJoined: true
  },
  {
    id: '2',
    name: 'CS:GO Стратегии',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470',
    description: 'Обсуждение тактик, стратегий и мета-игры в CS:GO и CS2.',
    membersCount: 3421,
    category: 'FPS',
    isJoined: false
  },
  {
    id: '3',
    name: 'Инди Разработчики',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1471',
    description: 'Сообщество независимых разработчиков игр и их поклонников.',
    membersCount: 785,
    category: 'Инди',
    isJoined: true
  },
  {
    id: '4',
    name: 'Стратеги и Тактики',
    image: 'https://images.unsplash.com/photo-1618850781142-710cd99a225b?q=80&w=1460',
    description: 'Для любителей стратегических и тактических игр. Обсуждение игр, новостей, стратегий.',
    membersCount: 1245,
    category: 'Стратегии',
    isJoined: false
  },
  {
    id: '5',
    name: 'Minecraft Строители',
    description: 'Делимся своими постройками в Minecraft, обсуждаем техники строительства и моды.',
    membersCount: 2350,
    category: 'Песочницы',
    isJoined: false
  },
  {
    id: '6',
    name: 'Cyberpunk 2077 Фанклуб',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1470',
    description: 'Все о мире Cyberpunk 2077, обновлениях, дополнениях и модах.',
    membersCount: 1670,
    category: 'RPG',
    isJoined: true
  }
];

interface GroupsListProps {
  onCreateGroup: () => void;
}

const GroupsList = ({ onCreateGroup }: GroupsListProps) => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('popular');
  
  // Функция для фильтрации групп
  const filteredGroups = groups.filter(group => {
    const matchesSearch = searchQuery.trim() === '' || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === null || group.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Функция для сортировки групп
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.membersCount - a.membersCount;
    } else {
      // В реальном приложении здесь была бы сортировка по дате создания
      return a.name.localeCompare(b.name);
    }
  });
  
  // Уникальные категории для фильтра
  const categories = Array.from(new Set(groups.map(group => group.category)));
  
  // Функция для вступления в группу
  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, isJoined: !group.isJoined } : group
    ));
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Игровые группы</h1>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Поиск групп..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-gaming-card-bg border-white/10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/10">
                  <Filter size={16} className="mr-2" />
                  {categoryFilter || 'Категории'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gaming-card-bg border-white/10">
                <DropdownMenuItem 
                  onClick={() => setCategoryFilter(null)}
                  className="cursor-pointer"
                >
                  Все категории
                </DropdownMenuItem>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => setCategoryFilter(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/10">
                  <ArrowUpDown size={16} className="mr-2" />
                  {sortBy === 'popular' ? 'По популярности' : 'Новые'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gaming-card-bg border-white/10">
                <DropdownMenuItem 
                  onClick={() => setSortBy('popular')}
                  className="cursor-pointer"
                >
                  По популярности
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('newest')}
                  className="cursor-pointer"
                >
                  Новые
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              onClick={onCreateGroup}
              className="bg-gaming-red hover:bg-gaming-red-hover"
            >
              <Plus size={16} className="mr-2" />
              Создать
            </Button>
          </div>
        </div>
      </div>
      
      {sortedGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedGroups.map(group => (
            <div 
              key={group.id}
              className="bg-gaming-card-bg border border-white/10 rounded-md overflow-hidden flex flex-col h-full"
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
              
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/groups/${group.id}`} className="font-bold text-lg hover:text-gaming-red transition-colors">
                    {group.name}
                  </Link>
                  <span className="text-xs bg-gaming-dark-accent px-2 py-1 rounded text-gaming-text-secondary">
                    {group.membersCount} участников
                  </span>
                </div>
                
                <p className="text-sm text-gaming-text-secondary mb-4 line-clamp-2">
                  {group.description}
                </p>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs text-gaming-text-secondary px-2 py-1 bg-gaming-dark rounded">
                    {group.category}
                  </span>
                  
                  <Button 
                    variant={group.isJoined ? "outline" : "default"}
                    size="sm" 
                    className={group.isJoined ? "border-white/10" : "bg-gaming-red hover:bg-gaming-red-hover"}
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.isJoined ? 'Покинуть' : 'Вступить'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
          {searchQuery.trim() !== '' || categoryFilter ? (
            <p className="text-gaming-text-secondary">По вашему запросу ничего не найдено</p>
          ) : (
            <p className="text-gaming-text-secondary">Групп пока нет. Создайте первую!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupsList;
