import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Filter, Calendar, Trophy, List, Grid3X3, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';
import ReleaseCalendar from '../components/ReleaseCalendar';
import Footer from '../components/Footer';
import CurationGamesDialog from '../components/CurationGamesDialog';

// Примеры игр для демонстрации
const allGames = [
  {
    id: 1,
    title: 'The Witcher 3: Wild Hunt',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1770&auto=format&fit=crop',
    rating: 9.8,
    releaseYear: 2015,
    genre: 'RPG',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch']
  },
  {
    id: 2,
    title: 'Red Dead Redemption 2',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1770&auto=format&fit=crop',
    rating: 9.7,
    releaseYear: 2018,
    genre: 'Action-Adventure',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  {
    id: 3,
    title: 'God of War',
    imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1770&auto=format&fit=crop',
    rating: 9.6,
    releaseYear: 2018,
    genre: 'Action-Adventure',
    platforms: ['PlayStation', 'PC']
  },
  {
    id: 4,
    title: 'The Legend of Zelda: Breath of the Wild',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1647&auto=format&fit=crop',
    rating: 9.5,
    releaseYear: 2017,
    genre: 'Action-Adventure',
    platforms: ['Switch']
  },
  {
    id: 5,
    title: 'Ghost of Tsushima',
    imageUrl: 'https://images.unsplash.com/photo-1605479695026-6f7602307d94?q=80&w=1974&auto=format&fit=crop',
    rating: 9.3,
    releaseYear: 2020,
    genre: 'Action-Adventure',
    platforms: ['PlayStation', 'PC']
  },
  {
    id: 6,
    title: 'Elden Ring',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1887&auto=format&fit=crop',
    rating: 9.7,
    releaseYear: 2022,
    genre: 'RPG',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  {
    id: 7,
    title: 'Cyberpunk 2077',
    imageUrl: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1770&auto=format&fit=crop',
    rating: 8.5,
    releaseYear: 2020,
    genre: 'RPG',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  {
    id: 8,
    title: 'Baldur\'s Gate 3',
    imageUrl: 'https://images.unsplash.com/photo-1605979257913-1704eb7b6246?q=80&w=1770&auto=format&fit=crop',
    rating: 9.8,
    releaseYear: 2023,
    genre: 'RPG',
    platforms: ['PC', 'PlayStation']
  }
];

// Примеры подборок игр (превращаем в state для возможности добавления)
const initialGameCurations = [
  {
    id: 1,
    title: 'Лучшие RPG 2023',
    category: 'RPG',
    games: [1, 6, 8]
  },
  {
    id: 2,
    title: 'Классика жанра хоррор',
    category: 'Хоррор',
    games: [3, 5]
  },
  {
    id: 3,
    title: 'Игры с открытым миром',
    category: 'Открытый мир',
    games: [1, 2, 4, 6]
  }
];

// Фильтры для игр
const genres = ['RPG', 'Action', 'Adventure', 'Strategy', 'Shooter', 'Sports', 'Racing', 'Simulation', 'Puzzle'];
const platforms = ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'];
const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const Games = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCurationDialog, setShowCurationDialog] = useState(false);
  const [selectedCuration, setSelectedCuration] = useState<{id: number, title: string} | null>(null);
  const [showCreateCurationDialog, setShowCreateCurationDialog] = useState(false);
  const [gameCurations, setGameCurations] = useState(initialGameCurations);
  
  // Эффект прокрутки наверх при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Фильтрация игр
  const filteredGames = allGames.filter(game => {
    // Поиск по названию
    if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Фильтр по жанрам
    if (selectedGenres.length > 0 && !selectedGenres.includes(game.genre)) {
      return false;
    }
    
    // Фильтр по платформам
    if (selectedPlatforms.length > 0 && !game.platforms.some(platform => selectedPlatforms.includes(platform))) {
      return false;
    }
    
    // Фильтр по годам
    if (selectedYears.length > 0 && !selectedYears.includes(game.releaseYear)) {
      return false;
    }
    
    return true;
  });
  
  // Лучшие игры (топ по рейтингу)
  const topGames = [...allGames].sort((a, b) => b.rating - a.rating).slice(0, 5);
  
  // Получение игр для подборки
  const getCurationGames = (curationId: number) => {
    const curation = gameCurations.find(c => c.id === curationId);
    if (!curation) return [];
    
    return allGames.filter(game => curation.games.includes(game.id));
  };

  // Обработчик для открытия диалога подборки
  const handleOpenCuration = (curationId: number) => {
    const curation = gameCurations.find(c => c.id === curationId);
    if (!curation) return;
    
    setSelectedCuration({
      id: curation.id,
      title: curation.title
    });
    setShowCurationDialog(true);
  };

  // Обработчик создания новой подборки
  const handleCreateCuration = (curation: { title: string; category: string; games: number[] }) => {
    const newCuration = {
      id: gameCurations.length + 1,
      title: curation.title,
      category: curation.category,
      games: curation.games
    };
    
    setGameCurations(prev => [...prev, newCuration]);
    toast.success('Подборка успешно создана!');
  };

  // Переключение состояния фильтра жанра
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };
  
  // Переключение состояния фильтра платформы
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };
  
  // Переключение состояния фильтра года
  const toggleYear = (year: number) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year) 
        : [...prev, year]
    );
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setSelectedYears([]);
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Игры</h1>
        <p className="text-gaming-text-secondary mb-8">
          Найдите любимые игры и откройте для себя новые
        </p>
        
        {/* Поиск и фильтры */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
              <input
                type="text"
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gaming-card-bg border border-white/5 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gaming-red"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gaming-card-bg hover:bg-gaming-dark-accent border border-white/5 rounded-md px-4 py-2 transition-colors"
            >
              <Filter size={18} />
              <span>Фильтры</span>
            </button>
            
            <div className="flex items-center border border-white/5 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "flex items-center justify-center p-2 transition-colors",
                  viewMode === 'grid'
                    ? "bg-gaming-red text-white"
                    : "bg-gaming-card-bg text-gaming-text-secondary hover:bg-gaming-dark-accent"
                )}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center justify-center p-2 transition-colors",
                  viewMode === 'list'
                    ? "bg-gaming-red text-white"
                    : "bg-gaming-card-bg text-gaming-text-secondary hover:bg-gaming-dark-accent"
                )}
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          {/* Расширенные фильтры */}
          {showFilters && (
            <div className="bg-gaming-card-bg border border-white/5 rounded-md p-4 mb-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Жанры</h3>
                  <div className="space-y-2">
                    {genres.map(genre => (
                      <div key={genre} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`genre-${genre}`}
                          checked={selectedGenres.includes(genre)}
                          onChange={() => toggleGenre(genre)}
                          className="mr-2 accent-gaming-red"
                        />
                        <label htmlFor={`genre-${genre}`} className="text-sm">{genre}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Платформы</h3>
                  <div className="space-y-2">
                    {platforms.map(platform => (
                      <div key={platform} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`platform-${platform}`}
                          checked={selectedPlatforms.includes(platform)}
                          onChange={() => togglePlatform(platform)}
                          className="mr-2 accent-gaming-red"
                        />
                        <label htmlFor={`platform-${platform}`} className="text-sm">{platform}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Год выпуска</h3>
                  <div className="space-y-2">
                    {years.map(year => (
                      <div key={year} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`year-${year}`}
                          checked={selectedYears.includes(year)}
                          onChange={() => toggleYear(year)}
                          className="mr-2 accent-gaming-red"
                        />
                        <label htmlFor={`year-${year}`} className="text-sm">{year}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
                >
                  Сбросить все фильтры
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Табы для категорий */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gaming-card-bg border border-white/5 h-auto p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-gaming-red data-[state=active]:text-white">
              Все игры
            </TabsTrigger>
            <TabsTrigger value="top" className="data-[state=active]:bg-gaming-red data-[state=active]:text-white">
              <Trophy size={16} className="mr-1" />
              Лучшие игры
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-gaming-red data-[state=active]:text-white">
              <Calendar size={16} className="mr-1" />
              Календарь релизов
            </TabsTrigger>
            <TabsTrigger value="curated" className="data-[state=active]:bg-gaming-red data-[state=active]:text-white">
              Подборки
            </TabsTrigger>
          </TabsList>
          
          {/* Содержимое табов */}
          <TabsContent value="all" className="mt-6">
            {filteredGames.length > 0 ? (
              <div className={cn(
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  : "space-y-4"
              )}>
                {filteredGames.map(game => (
                  <GameCard
                    key={game.id}
                    {...game}
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gaming-text-secondary">Игры не найдены. Попробуйте изменить параметры поиска.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="top" className="mt-6">
            <h2 className="text-xl font-bold mb-4">Топ игр по рейтингу</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {topGames.map(game => (
                <GameCard
                  key={game.id}
                  {...game}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <h2 className="text-xl font-bold mb-4">Календарь релизов</h2>
            <ReleaseCalendar />
          </TabsContent>
          
          <TabsContent value="curated" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Тематические подборки игр</h2>
              <Button 
                onClick={() => setShowCreateCurationDialog(true)}
                className="bg-gaming-red hover:bg-gaming-red/90 text-white"
              >
                <Plus size={16} className="mr-2" />
                Создать подборку
              </Button>
            </div>
            
            {gameCurations.map(curation => (
              <div key={curation.id} className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{curation.title}</h3>
                    {curation.category && (
                      <p className="text-sm text-gaming-text-secondary">
                        Категория: {curation.category}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleOpenCuration(curation.id)} 
                    className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
                  >
                    Смотреть все
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getCurationGames(curation.id).map(game => (
                    <GameCard
                      key={game.id}
                      {...game}
                    />
                  ))}
                </div>
              </div>
            ))}
            
            {gameCurations.length === 0 && (
              <div className="text-center py-12 bg-gaming-card-bg border border-white/5 rounded-md">
                <p className="text-gaming-text-secondary mb-4">У вас пока нет подборок</p>
                <Button 
                  onClick={() => setShowCreateCurationDialog(true)}
                  className="bg-gaming-red hover:bg-gaming-red/90 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Создать первую подборку
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Диалог с играми из подборки */}
      {selectedCuration && (
        <CurationGamesDialog
          open={showCurationDialog}
          onOpenChange={setShowCurationDialog}
          title={selectedCuration.title}
          games={getCurationGames(selectedCuration.id)}
        />
      )}
      
      {/* Диалог создания новой подборки */}
      <CurationGamesDialog
        open={showCreateCurationDialog}
        onOpenChange={setShowCreateCurationDialog}
        title="Создание новой подборки"
        games={[]}
        mode="create"
        onCreateCuration={handleCreateCuration}
        allGames={allGames}
      />
      
      <Footer />
    </div>
  );
};

export default Games;
