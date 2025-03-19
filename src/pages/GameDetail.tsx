
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarDays, 
  Monitor, 
  Users, 
  Star, 
  ArrowLeft,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import GameReviews from '../components/GameReviews';
import GameMedia from '../components/GameMedia';

// Пример данных об игре (в реальном приложении эти данные будут загружаться с сервера)
const gameData = {
  1: {
    id: 1,
    title: 'The Witcher 3: Wild Hunt',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1770&auto=format&fit=crop',
    description: 'The Witcher 3: Wild Hunt — компьютерная игра в жанре action/RPG, разработанная польской студией CD Projekt RED. Выпущенная 19 мая 2015 года на Windows, PlayStation 4 и Xbox One, затем 15 октября 2019 года на Nintendo Switch, а 14 декабря 2022 года на PlayStation 5 и Xbox Series X/S. Игра является продолжением игр The Witcher и The Witcher 2: Assassins of Kings и основана на серии романов «Ведьмак» польского писателя Анджея Сапковского.',
    rating: 9.8,
    releaseYear: 2015,
    genre: 'RPG',
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt RED',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1647&auto=format&fit=crop',
    ],
    videos: [
      { thumbnail: 'https://images.unsplash.com/photo-1605479695026-6f7602307d94?q=80&w=1974&auto=format&fit=crop', url: 'https://www.youtube.com/watch?v=c0i88t0Kacs' },
    ],
    reviews: [
      { id: 1, username: 'Александр', rating: 5, text: 'Одна из лучших игр, в которые я когда-либо играл. Сюжет, графика и геймплей на высшем уровне.', date: '12.04.2023', likes: 24 },
      { id: 2, username: 'Елена', rating: 4.5, text: 'Отличная RPG с проработанным миром и интересными квестами. Немного придираюсь к боевой системе, но в целом это шедевр.', date: '03.06.2023', likes: 18 },
    ]
  },
  2: {
    id: 2,
    title: 'Red Dead Redemption 2',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1770&auto=format&fit=crop',
    description: 'Red Dead Redemption 2 (сокращённо RDR2) — компьютерная игра в жанрах action-adventure и шутера от третьего лица с открытым миром, разработанная Rockstar Studios и выпущенная Rockstar Games для консолей PlayStation 4 и Xbox One 26 октября 2018 года и для персональных компьютеров под управлением Windows 5 ноября 2019 года.',
    rating: 9.7,
    releaseYear: 2018,
    genre: 'Action-Adventure',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1647&auto=format&fit=crop',
    ],
    videos: [
      { thumbnail: 'https://images.unsplash.com/photo-1605479695026-6f7602307d94?q=80&w=1974&auto=format&fit=crop', url: 'https://www.youtube.com/watch?v=eaW0tYpxyp0' },
    ],
    reviews: [
      { id: 1, username: 'Игорь', rating: 5, text: 'Непревзойденная игра с глубоким погружением в мир Дикого Запада. Rockstar снова доказали, что они лучшие.', date: '10.01.2023', likes: 30 },
      { id: 2, username: 'Мария', rating: 4.8, text: 'Потрясающая графика, детализированный мир и эмоциональный сюжет. Одна из лучших игр десятилетия.', date: '25.03.2023', likes: 22 },
    ]
  },
  // ... Можно добавить больше игр
};

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [userRating, setUserRating] = useState<number | null>(null);
  
  useEffect(() => {
    // Имитация загрузки данных
    const fetchGameData = () => {
      setLoading(true);
      setTimeout(() => {
        // Получаем данные игры по ID
        if (id && gameData[Number(id)]) {
          setGame(gameData[Number(id)]);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchGameData();
    // Прокрутка в начало страницы при загрузке
    window.scrollTo(0, 0);
  }, [id]);
  
  // Похожие игры (в реальном приложении это был бы запрос к API)
  const similarGames = Object.values(gameData)
    .filter(g => g.id !== Number(id) && g.genre === game?.genre)
    .slice(0, 4);
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast.success('Ваша оценка сохранена!');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gaming-dark">
        <div className="text-gaming-text-primary">Загрузка...</div>
      </div>
    );
  }
  
  if (!game) {
    return (
      <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
        <Navbar />
        <div className="container mx-auto pt-32 pb-16 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Игра не найдена</h1>
            <p className="mb-8 text-gaming-text-secondary">
              К сожалению, запрашиваемая игра не существует или была удалена.
            </p>
            <Link to="/games">
              <Button>Вернуться к списку игр</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Шапка с основной информацией */}
        <div
          className="relative h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${game.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/80 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-10">
            <Link to="/games" className="absolute top-6 left-4 md:left-6 z-10">
              <Button variant="ghost" className="text-white gap-1 hover:bg-white/10">
                <ArrowLeft size={16} />
                Назад к играм
              </Button>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="w-32 h-40 rounded-md overflow-hidden flex-shrink-0 border-2 border-white/10">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-gaming-red/90 text-white text-xs px-2 py-1 rounded">
                    {game.genre}
                  </span>
                  {game.platforms.map((platform: string, index: number) => (
                    <span
                      key={index}
                      className="bg-black/50 text-white text-xs px-2 py-1 rounded"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{game.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    <span>{game.releaseYear}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{game.developer}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Monitor size={16} />
                    <span>{game.publisher}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="#ea384c" className="text-gaming-red" />
                    <span className="font-bold text-white">{game.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  className="border-gaming-red text-gaming-red hover:bg-gaming-red hover:text-white"
                >
                  <ThumbsUp size={16} className="mr-1" />
                  В избранное
                </Button>
                
                <Button 
                  className="bg-gaming-red hover:bg-gaming-red/90 text-white"
                  onClick={() => setActiveTab('reviews')}
                >
                  <MessageSquare size={16} className="mr-1" />
                  Оставить отзыв
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Основное содержимое */}
        <div className="container mx-auto px-4 py-8">
          {/* Рейтинг пользователя */}
          <div className="mb-8 bg-gaming-card-bg rounded-md p-4 border border-white/5">
            <h3 className="text-lg font-medium mb-4">Ваша оценка</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className="text-2xl transition-colors"
                >
                  <Star
                    size={28}
                    className={
                      userRating && star <= userRating
                        ? "text-gaming-red fill-gaming-red"
                        : "text-gaming-text-secondary"
                    }
                  />
                </button>
              ))}
              <span className="ml-4 text-sm text-gaming-text-secondary">
                {userRating ? `Вы поставили ${userRating} из 5` : 'Нажмите на звезду, чтобы оценить игру'}
              </span>
            </div>
          </div>
          
          {/* Табы с информацией */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="bg-gaming-card-bg border border-white/5 h-auto p-1 mb-6">
              <TabsTrigger 
                value="description" 
                className="data-[state=active]:bg-gaming-red data-[state=active]:text-white"
              >
                Описание
              </TabsTrigger>
              <TabsTrigger 
                value="media" 
                className="data-[state=active]:bg-gaming-red data-[state=active]:text-white"
              >
                Скриншоты и видео
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:bg-gaming-red data-[state=active]:text-white"
              >
                Отзывы
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-0">
              <div className="bg-gaming-card-bg rounded-md p-6 border border-white/5">
                <h2 className="text-xl font-bold mb-4">Об игре</h2>
                <p className="text-gaming-text-secondary leading-relaxed">
                  {game.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Информация об игре</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gaming-text-secondary">Дата выпуска:</span>
                        <span>{game.releaseYear}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gaming-text-secondary">Разработчик:</span>
                        <span>{game.developer}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gaming-text-secondary">Издатель:</span>
                        <span>{game.publisher}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gaming-text-secondary">Жанр:</span>
                        <span>{game.genre}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Системные требования</h3>
                    <div className="text-gaming-text-secondary">
                      <p>
                        Информация о системных требованиях для этой игры в настоящее время недоступна.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="mt-0">
              <GameMedia 
                screenshots={game.screenshots} 
                videos={game.videos} 
              />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <GameReviews gameId={game.id} initialReviews={game.reviews} />
            </TabsContent>
          </Tabs>
          
          {/* Похожие игры */}
          {similarGames.length > 0 && (
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Похожие игры</h2>
                <Link 
                  to={`/games?genre=${game.genre}`} 
                  className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
                >
                  Смотреть больше
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarGames.map((similarGame: any) => (
                  <GameCard
                    key={similarGame.id}
                    id={similarGame.id}
                    title={similarGame.title}
                    imageUrl={similarGame.imageUrl}
                    rating={similarGame.rating}
                    releaseYear={similarGame.releaseYear}
                    genre={similarGame.genre}
                    platforms={similarGame.platforms}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GameDetail;
