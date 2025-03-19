
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogList from '../components/BlogList';
import BlogCategoryFilter from '../components/BlogCategoryFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Типы категорий блогов
export type BlogCategory = 'Все' | 'Новости' | 'Обзоры' | 'Гайды' | 'Советы' | 'Индустрия';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Получаем активную категорию из URL или устанавливаем "Все" по умолчанию
  const activeCategory = (searchParams.get('category') as BlogCategory) || 'Все';
  
  // Устанавливаем категорию в URL
  const handleCategoryChange = (category: BlogCategory) => {
    setSearchParams({ category });
  };
  
  // Обработка поиска статей
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика поиска
    console.log('Поиск по запросу:', searchQuery);
  };
  
  // Прокрутка к началу страницы при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Заголовок страницы */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Блог об играх</h1>
            <p className="text-gaming-text-secondary">
              Новости, обзоры, гайды и многое другое из мира игр
            </p>
          </div>
          
          {/* Поиск и фильтры */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
            <BlogCategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange}
            />
            
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Input
                  type="text"
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 bg-gaming-card-bg border-white/10 focus:border-gaming-red"
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-0 top-0 h-full text-gaming-text-secondary hover:text-gaming-red"
                >
                  <Search size={18} />
                </Button>
              </div>
            </form>
          </div>
          
          {/* Список блогов */}
          <BlogList category={activeCategory} searchQuery={searchQuery} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
