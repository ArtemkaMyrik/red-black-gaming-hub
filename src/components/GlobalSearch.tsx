
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  Gamepad2, 
  FileText, 
  Users, 
  User 
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Типы и интерфейсы
interface SearchResult {
  id: string;
  type: 'game' | 'blog' | 'user' | 'group';
  title: string;
  description?: string;
  image?: string;
  url: string;
}

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Эффект для фокуса на поле ввода при открытии
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Эффект для обработки горячих клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Открытие поиска по Ctrl+K или Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Закрытие по Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // Функция для симуляции поиска (в реальном приложении здесь будет API запрос)
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    // Моковые результаты поиска
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'game',
          title: 'The Elder Scrolls V: Skyrim',
          description: 'Ролевая игра с открытым миром от Bethesda Game Studios',
          image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1470',
          url: '/games/1'
        },
        {
          id: '2',
          type: 'game',
          title: 'Counter-Strike 2',
          description: 'Популярный тактический шутер от Valve',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470',
          url: '/games/2'
        },
        {
          id: '3',
          type: 'blog',
          title: 'Обзор Cyberpunk 2077 после патча 2.0',
          description: 'Что изменилось в игре после масштабного обновления',
          image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1470',
          url: '/blog/3'
        },
        {
          id: '4',
          type: 'user',
          title: 'Геймер2077',
          description: 'Опытный игрок, автор обзоров и гайдов',
          url: '/profile/123'
        },
        {
          id: '5',
          type: 'group',
          title: 'Фанаты Skyrim',
          description: 'Группа для обсуждения всего, что связано с TES',
          image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1470',
          url: '/groups/1'
        },
        {
          id: '6',
          type: 'blog',
          title: 'Топ 10 игр 2023 года',
          description: 'Лучшие игры уходящего года по мнению редакции',
          url: '/blog/6'
        }
      ];
      
      // Фильтруем результаты по запросу
      const filtered = mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        (result.description && result.description.toLowerCase().includes(query.toLowerCase()))
      );
      
      setResults(filtered);
    }, 300); // Имитация задержки запроса
  };
  
  // Обработчик изменения запроса
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    performSearch(newQuery);
  };
  
  // Обработчик клика по результату
  const handleResultClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
    setSearchQuery('');
    setResults([]);
  };
  
  // Фильтрация результатов по типу
  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(result => result.type === activeTab);
  
  // Получение иконки в зависимости от типа результата
  const getIconForType = (type: string) => {
    switch (type) {
      case 'game':
        return <Gamepad2 size={16} />;
      case 'blog':
        return <FileText size={16} />;
      case 'user':
        return <User size={16} />;
      case 'group':
        return <Users size={16} />;
      default:
        return <Search size={16} />;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-white/10 md:w-80 justify-between"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center">
            <Search className="mr-2" size={16} />
            <span className="text-gaming-text-secondary">Поиск...</span>
          </div>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-gaming-dark-accent px-1.5 font-mono text-[10px] font-medium text-gaming-text-secondary">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] bg-gaming-card-bg border-white/10 p-0">
        <div className="p-4 border-b border-white/10">
          <div className="flex gap-2 items-center">
            <Search className="text-gaming-text-secondary" size={20} />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Поиск игр, блогов, пользователей, групп..."
              value={searchQuery}
              onChange={handleQueryChange}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-gaming-text-secondary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gaming-text-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setResults([]);
                  searchInputRef.current?.focus();
                }}
              >
                <X size={18} />
              </Button>
            )}
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-auto">
          {results.length > 0 ? (
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 pt-2">
                  <TabsList className="grid grid-cols-5 w-full bg-gaming-dark-accent">
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="game">Игры</TabsTrigger>
                    <TabsTrigger value="blog">Блоги</TabsTrigger>
                    <TabsTrigger value="user">Люди</TabsTrigger>
                    <TabsTrigger value="group">Группы</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value={activeTab} className="p-0 mt-0">
                  <div className="p-2">
                    {filteredResults.map(result => (
                      <div 
                        key={`${result.type}-${result.id}`}
                        className="p-2 hover:bg-gaming-dark rounded-md cursor-pointer"
                        onClick={() => handleResultClick(result.url)}
                      >
                        <div className="flex items-center gap-3">
                          {result.type === 'user' ? (
                            <Avatar className="h-10 w-10">
                              {result.image ? (
                                <AvatarImage src={result.image} alt={result.title} />
                              ) : (
                                <AvatarFallback className="bg-gaming-dark-accent">
                                  {result.title.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                          ) : (
                            <div className="h-10 w-10 rounded overflow-hidden bg-gaming-dark-accent flex items-center justify-center">
                              {result.image ? (
                                <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
                              ) : (
                                getIconForType(result.type)
                              )}
                            </div>
                          )}
                          
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.title}</span>
                              <span className="text-xs px-2 py-0.5 bg-gaming-dark-accent rounded-full text-gaming-text-secondary">
                                {result.type === 'game' ? 'Игра' : 
                                 result.type === 'blog' ? 'Блог' : 
                                 result.type === 'user' ? 'Пользователь' : 'Группа'}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-sm text-gaming-text-secondary truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="p-6 text-center text-gaming-text-secondary">
              {searchQuery.trim() ? (
                <p>По запросу "{searchQuery}" ничего не найдено</p>
              ) : (
                <p>Начните вводить запрос для поиска</p>
              )}
            </div>
          )}
        </div>
        
        <div className="px-4 py-2 border-t border-white/10 text-xs text-gaming-text-secondary">
          <p>Нажмите Enter для поиска, Esc для отмены</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
