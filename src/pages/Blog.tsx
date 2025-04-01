
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogList from '../components/BlogList';
import BlogCategoryFilter from '../components/BlogCategoryFilter';
import BlogForm from '../components/BlogForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

// Типы категорий блогов
export type BlogCategory = 'Все' | 'Новости' | 'Обзоры' | 'Гайды' | 'Советы' | 'Индустрия';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editBlogId, setEditBlogId] = useState<number | null>(null);
  
  // Получаем активную категорию из URL или устанавливаем "Все" по умолчанию
  const activeCategory = (searchParams.get('category') as BlogCategory) || 'Все';
  
  // Проверяем параметры URL для определения, нужно ли открыть форму создания или редактирования
  useEffect(() => {
    const createParam = searchParams.get('createNew');
    const editParam = searchParams.get('edit');
    
    if (createParam === 'true') {
      setShowCreateForm(true);
    } else if (editParam) {
      setEditBlogId(parseInt(editParam));
    } else {
      setShowCreateForm(false);
      setEditBlogId(null);
    }
  }, [searchParams]);
  
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
  
  // Открыть форму создания блога
  const handleCreateBlog = () => {
    setSearchParams({ createNew: 'true' });
  };
  
  // Закрыть форму создания/редактирования блога
  const handleCancelForm = () => {
    // Удаляем параметры из URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('createNew');
    newParams.delete('edit');
    setSearchParams(newParams);
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
          {/* Форма создания/редактирования блога */}
          {(showCreateForm || editBlogId !== null) ? (
            <div className="bg-gaming-dark-accent rounded-lg p-6 mb-8 border border-white/10">
              <BlogForm 
                blogId={editBlogId !== null ? editBlogId : undefined} 
                onCancel={handleCancelForm}
              />
            </div>
          ) : (
            <>
              {/* Заголовок страницы */}
              <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Блог об играх</h1>
                <p className="text-gaming-text-secondary">
                  Новости, обзоры, гайды и многое другое из мира игр
                </p>
              </div>
              
              {/* Поиск и фильтры */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <BlogCategoryFilter 
                    activeCategory={activeCategory} 
                    onCategoryChange={handleCategoryChange}
                  />
                  
                  <Button 
                    onClick={handleCreateBlog}
                    className="bg-gaming-red hover:bg-gaming-red/90 md:hidden"
                  >
                    <Plus size={16} className="mr-2" />
                    Создать блог
                  </Button>
                </div>
                
                <div className="flex gap-4 items-center">
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
                  
                  <Button 
                    onClick={handleCreateBlog}
                    className="bg-gaming-red hover:bg-gaming-red/90 hidden md:flex"
                  >
                    <Plus size={16} className="mr-2" />
                    Создать блог
                  </Button>
                </div>
              </div>
              
              {/* Список блогов */}
              <BlogList category={activeCategory} searchQuery={searchQuery} />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
