
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export type BlogCategory = 'Новости' | 'Обзоры' | 'Гайды' | 'Советы' | 'Индустрия';

interface BlogFormProps {
  blogId?: number;
  onCancel: () => void;
}

interface BlogFormData {
  title: string;
  content: string;
  imageUrl: string;
  category: BlogCategory;
}

const BlogForm = ({ blogId, onCancel }: BlogFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = blogId !== undefined;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    imageUrl: '',
    category: 'Новости'
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // Здесь должна быть загрузка данных блога для редактирования
      // Для демонстрации используем заглушку
      setIsLoading(true);
      setTimeout(() => {
        setFormData({
          title: 'Обзор Cyberpunk 2077 после всех обновлений',
          content: 'Полный текст статьи...',
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
          category: 'Обзоры'
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [blogId, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Для демонстрации - имитация загрузки изображения
      setIsLoading(true);
      
      setTimeout(() => {
        // В реальном приложении здесь был бы код для загрузки файла на сервер
        setFormData(prev => ({
          ...prev, 
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070'
        }));
        setIsLoading(false);
        toast({
          title: "Изображение загружено",
          description: "Изображение успешно добавлено в блог",
        });
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: isEditMode ? "Блог обновлен" : "Блог создан",
        description: isEditMode 
          ? "Ваш блог был успешно обновлен" 
          : "Ваш блог был успешно опубликован",
      });
      
      navigate('/blog');
    }, 1500);
  };

  if (isLoading && isEditMode) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-pulse text-gaming-text-secondary">
          Загрузка данных...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {isEditMode ? 'Редактировать блог' : 'Создать новый блог'}
        </h2>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onCancel}
          className="border-white/10"
        >
          <X size={18} />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Заголовок
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="bg-gaming-card-bg border-white/10 focus:border-gaming-red"
            placeholder="Введите заголовок блога"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Категория
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-gaming-card-bg border border-white/10 rounded-md h-10 px-3 focus:outline-none focus:border-gaming-red"
            required
          >
            <option value="Новости">Новости</option>
            <option value="Обзоры">Обзоры</option>
            <option value="Гайды">Гайды</option>
            <option value="Советы">Советы</option>
            <option value="Индустрия">Индустрия</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Изображение
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-white/10 w-full"
              onClick={handleImageUpload}
            >
              <Image size={16} className="mr-2" />
              Загрузить
            </Button>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
        </div>
        
        {formData.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-md border border-white/10">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Содержание
          </label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="bg-gaming-card-bg border-white/10 focus:border-gaming-red resize-none h-64"
            placeholder="Введите содержание вашего блога"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-white/10"
        >
          Отмена
        </Button>
        <Button 
          type="submit"
          className="bg-gaming-red hover:bg-gaming-red/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Сохранение...
            </span>
          ) : (
            <span className="flex items-center">
              <Check size={16} className="mr-2" />
              {isEditMode ? 'Сохранить изменения' : 'Опубликовать блог'}
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
