
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import BlogCard from './BlogCard';

const popularBlogs = [
  {
    id: 1,
    title: 'Эволюция дизайна открытого мира в играх',
    excerpt: 'От GTA до Breath of the Wild, как изменились игры с открытым миром за последние десятилетия...',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1770&auto=format&fit=crop',
    author: 'Алексей Чен',
    date: '18 апр 2023',
    commentsCount: 42,
    category: 'Геймдизайн',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Являются ли подписочные сервисы будущим игровой индустрии?',
    excerpt: 'Анализ влияния Xbox Game Pass, PS Plus и других подписочных моделей на игровую индустрию...',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1770&auto=format&fit=crop',
    author: 'Мария Иванова',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1787&auto=format&fit=crop',
    date: '15 апр 2023',
    commentsCount: 36,
    category: 'Индустрия',
    rating: 4.5
  },
  {
    id: 3,
    title: 'Искусство балансировки сложности в играх жанра Souls-like',
    excerpt: 'Как FromSoftware и другие разработчики создают сложный, но справедливый игровой процесс...',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1771&auto=format&fit=crop',
    author: 'Марк Ли',
    date: '12 апр 2023',
    commentsCount: 29,
    category: 'Геймдизайн',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Инди-игры, определившие последнее десятилетие',
    excerpt: 'От Minecraft до Hollow Knight, эти инди-тайтлы навсегда изменили игровую индустрию...',
    imageUrl: 'https://images.unsplash.com/photo-1517281749396-564b95a206c3?q=80&w=1769&auto=format&fit=crop',
    author: 'Джейми Ким',
    date: '10 апр 2023',
    commentsCount: 24,
    category: 'Инди-игры',
    rating: 4.6
  }
];

const PopularBlogs = () => {
  return (
    <section className="py-16 bg-gaming-dark-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Популярные статьи</h2>
            <p className="text-gaming-text-secondary mt-2">
              Глубокие погружения в мир игр
            </p>
          </div>
          
          <Link 
            to="/blog"
            className="mt-4 md:mt-0 inline-flex items-center text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
          >
            Все статьи
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              className="hover:translate-y-[-5px] transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBlogs;
