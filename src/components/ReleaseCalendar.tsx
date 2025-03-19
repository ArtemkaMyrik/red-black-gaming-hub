
import { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import ReleaseDateCard from './ReleaseDateCard';
import { cn } from '@/lib/utils';

// Примеры предстоящих релизов игр
const upcomingReleases = [
  {
    id: 1,
    title: 'Final Fantasy VII Rebirth',
    imageUrl: 'https://images.unsplash.com/photo-1642244151937-64240c471eb8?q=80&w=1964&auto=format&fit=crop',
    releaseDate: '2023-04-29',
    formattedDate: '29 апр. 2023',
    platforms: ['PlayStation'],
    daysUntilRelease: 11,
    isReleased: false
  },
  {
    id: 2,
    title: 'Star Wars Outlaws',
    imageUrl: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1769&auto=format&fit=crop',
    releaseDate: '2023-04-25',
    formattedDate: '25 апр. 2023',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    daysUntilRelease: 7,
    isReleased: false
  },
  {
    id: 3,
    title: 'Dragon Age: The Veilguard',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1770&auto=format&fit=crop',
    releaseDate: '2023-04-22',
    formattedDate: '22 апр. 2023',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    daysUntilRelease: 4,
    isReleased: false
  },
  {
    id: 4,
    title: 'Silent Hill 2 Remake',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1770&auto=format&fit=crop',
    releaseDate: '2023-04-20',
    formattedDate: '20 апр. 2023',
    platforms: ['PC', 'PlayStation'],
    daysUntilRelease: 2,
    isReleased: false
  },
  {
    id: 5,
    title: 'Stellar Blade',
    imageUrl: 'https://images.unsplash.com/photo-1498736297812-3a08021f206f?q=80&w=1779&auto=format&fit=crop',
    releaseDate: '2023-04-18',
    formattedDate: '18 апр. 2023',
    platforms: ['PlayStation'],
    daysUntilRelease: 0,
    isReleased: false
  },
  {
    id: 6,
    title: 'Metaphor: ReFantazio',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1770&auto=format&fit=crop',
    releaseDate: '2023-04-16',
    formattedDate: '16 апр. 2023',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    daysUntilRelease: 0,
    isReleased: true
  }
];

// Опции фильтра платформ
const platformOptions = [
  { label: 'Все платформы', value: 'all' },
  { label: 'PC', value: 'pc' },
  { label: 'PlayStation', value: 'playstation' },
  { label: 'Xbox', value: 'xbox' },
  { label: 'Switch', value: 'switch' }
];

const ReleaseCalendar = () => {
  const [activePlatform, setActivePlatform] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const filteredReleases = activePlatform === 'all'
    ? upcomingReleases
    : upcomingReleases.filter(game => 
        game.platforms.some(platform => 
          platform.toLowerCase().includes(activePlatform.toLowerCase())
        )
      );

  return (
    <section className="py-16 bg-gaming-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Календарь релизов</h2>
            <p className="text-gaming-text-secondary mt-2">
              Будьте в курсе предстоящих релизов игр
            </p>
          </div>
          
          <div className="relative mt-4 md:mt-0">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sm bg-gaming-card-bg px-4 py-2 rounded-md border border-white/5"
            >
              {platformOptions.find(option => option.value === activePlatform)?.label}
              <ChevronDown size={16} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gaming-card-bg rounded-md shadow-lg border border-white/5 z-30 w-48">
                {platformOptions.map(option => (
                  <button
                    key={option.value}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm transition-colors",
                      activePlatform === option.value
                        ? "bg-gaming-red text-white"
                        : "hover:bg-gaming-dark-accent"
                    )}
                    onClick={() => {
                      setActivePlatform(option.value);
                      setDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gaming-dark-accent rounded-md overflow-hidden border border-white/5">
          <div className="flex justify-between items-center px-4 py-3 bg-gaming-card-bg border-b border-white/5">
            <h3 className="font-medium">Предстоящие релизы</h3>
            
            <div className="flex items-center gap-2">
              <button className="p-1 text-gaming-text-secondary hover:text-gaming-text-primary transition-colors">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm">Апрель 2023</span>
              <button className="p-1 text-gaming-text-secondary hover:text-gaming-text-primary transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {filteredReleases.map(release => (
              <ReleaseDateCard key={release.id} {...release} />
            ))}
            
            {filteredReleases.length === 0 && (
              <div className="p-8 text-center text-gaming-text-secondary">
                Предстоящих релизов для этой платформы не найдено.
              </div>
            )}
          </div>
          
          <div className="p-3 flex justify-center border-t border-white/5">
            <a 
              href="/releases"
              className="text-sm text-gaming-text-secondary hover:text-gaming-red flex items-center gap-1 transition-colors"
            >
              Полный календарь
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleaseCalendar;
