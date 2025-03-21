
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  "RPG", "FPS", "Стратегии", "Симуляторы", "Инди", "Песочницы", "MMO", "Приключения"
];

const CreateGroupDialog = ({ open, onOpenChange }: CreateGroupDialogProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    rules: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      
      // Создаем превью изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка заполнения обязательных полей
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      toast.success('Группа успешно создана!');
      
      // В реальном приложении здесь был бы редирект на страницу созданной группы
      // navigate(`/groups/new-group-id`);
      
      // Сброс формы
      setFormData({
        name: '',
        description: '',
        category: '',
        rules: '',
        image: null
      });
      setImagePreview(null);
      
      // Перенаправляем на страницу групп
      navigate('/groups');
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gaming-card-bg border-white/10 text-gaming-text-primary">
        <DialogHeader>
          <DialogTitle>Создание новой группы</DialogTitle>
          <DialogDescription className="text-gaming-text-secondary">
            Заполните информацию о вашей новой группе
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название группы *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Название вашей группы"
              value={formData.name}
              onChange={handleChange}
              className="bg-gaming-dark border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание группы *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Расскажите, о чем ваша группа"
              value={formData.description}
              onChange={handleChange}
              className="bg-gaming-dark border-white/10 min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Категория *</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md bg-gaming-dark border border-white/10 p-2 text-gaming-text-primary"
            >
              <option value="">Выберите категорию</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rules">Правила группы (необязательно)</Label>
            <Textarea
              id="rules"
              name="rules"
              placeholder="Опишите правила вашей группы"
              value={formData.rules}
              onChange={handleChange}
              className="bg-gaming-dark border-white/10 min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Изображение группы (необязательно)</Label>
            <div className="flex flex-col items-center gap-4">
              {imagePreview && (
                <div className="relative w-full h-40 rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex justify-center w-full">
                <Label 
                  htmlFor="image"
                  className="cursor-pointer border border-dashed border-white/20 rounded-md p-4 flex flex-col items-center justify-center w-full"
                >
                  <Upload className="mb-2" size={24} />
                  <span className="text-sm text-gaming-text-secondary">
                    {formData.image ? 'Изменить изображение' : 'Загрузить изображение'}
                  </span>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10"
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              className="bg-gaming-red hover:bg-gaming-red-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Создание...
                </>
              ) : (
                'Создать группу'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
