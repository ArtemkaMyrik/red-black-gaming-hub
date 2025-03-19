
import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import type { BlogCategory } from '../pages/Blog';

// Имитация данных для блогов
const BLOG_ARTICLES = [
  {
    id: 1,
    title: 'Эволюция дизайна открытого мира в играх',
    excerpt: 'От GTA до Breath of the Wild: как изменились игры с открытым миром за последние десятилетия...',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1770&auto=format&fit=crop',
    author: 'Алексей Чен',
    date: '18 апр 2023',
    commentsCount: 42,
    category: 'Обзоры',
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
    excerpt: 'Как FromSoftware и другие разработчики создают сложный, но справедливый игровой опыт...',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1771&auto=format&fit=crop',
    author: 'Марк Ли',
    date: '12 апр 2023',
    commentsCount: 29,
    category: 'Обзоры',
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
    category: 'Обзоры',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Топ 10 самых ожидаемых игр 2024 года',
    excerpt: 'Обзор самых интересных проектов, которые выйдут в следующем году...',
    imageUrl: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=1772&auto=format&fit=crop',
    author: 'Дмитрий Петров',
    date: '5 апр 2023',
    commentsCount: 51,
    category: 'Новости',
    rating: 4.9
  },
  {
    id: 6,
    title: 'Как создавался саундтрек к Red Dead Redemption 2',
    excerpt: 'История создания одного из самых атмосферных музыкальных сопровождений в игровой индустрии...',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1770&auto=format&fit=crop',
    author: 'Анна Смирнова',
    date: '2 апр 2023',
    commentsCount: 18,
    category: 'Индустрия',
    rating: 4.7
  },
  {
    id: 7,
    title: 'Гайд: Как победить всех боссов в Elden Ring',
    excerpt: 'Подробные советы и стратегии для победы над самыми сложными противниками...',
    imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1770&auto=format&fit=crop',
    author: 'Игорь Волков',
    date: '28 мар 2023',
    commentsCount: 63,
    category: 'Гайды',
    rating: 4.8
  },
  {
    id: 8,
    title: 'Секреты и пасхалки в The Legend of Zelda: Tears of the Kingdom',
    excerpt: 'Скрытые локации, секретные предметы и отсылки к предыдущим играм серии...',
    imageUrl: 'https://images.unsplash.com/photo-1605979257913-1704eb7b6246?q=80&w=1770&auto=format&fit=crop',
    author: 'Елена Козлова',
    date: '25 мар 2023',
    commentsCount: 39,
    category: 'Советы',
    rating: 4.6
  }
];

interface BlogListProps {
  category: BlogCategory;
  searchQuery: string;
}

const BlogList = ({ category, searchQuery }: BlogListProps) => {
  const [filteredBlogs, setFilteredBlogs] = useState(BLOG_ARTICLES);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  
  // Фильтрация блогов по категории и поисковому запросу
  useEffect(() => {
    let filtered = [...BLOG_ARTICLES];
    
    // Фильтруем по категории, если выбрана не "Все"
    if (category !== 'Все') {
      filtered = filtered.filter(blog => blog.category === category);
    }
    
    // Фильтруем по поисковому запросу, если он есть
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [category, searchQuery]);
  
  // Вычисляем индексы для пагинации
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  // Обработчик изменения страницы
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  return (
    <div>
      {filteredBlogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentBlogs.map(blog => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                imageUrl={blog.imageUrl}
                author={blog.author}
                authorAvatar={blog.authorAvatar}
                date={blog.date}
                commentsCount={blog.commentsCount}
                category={blog.category}
                className="hover:translate-y-[-5px] transition-transform duration-300"
              />
            ))}
          </div>
          
          {/* Пагинация */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gaming-text-secondary">Статьи не найдены</p>
          <p className="mt-2">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
