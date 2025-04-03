
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import BlogCard from './BlogCard';
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  authorAvatar?: string;
  date: string;
  commentsCount: number;
  category: string;
  rating?: number;
}

interface ProfileBlogsProps {
  userId: string;
}

const ProfileBlogs = ({ userId }: ProfileBlogsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Временные данные для демонстрации
  const [userBlogs, setUserBlogs] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Обзор Cyberpunk 2077 после всех обновлений',
      excerpt: 'Стоит ли возвращаться в Найт-Сити после патчей и DLC? Разбираемся в изменениях.',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
      author: 'Геймер2077',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '15.03.2023',
      commentsCount: 24,
      category: 'Обзоры',
      rating: 4.7
    },
    {
      id: 2,
      title: 'Топ 10 игр для совместного прохождения',
      excerpt: 'Лучшие кооперативные игры для вечера с друзьями.',
      imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070',
      author: 'Геймер2077',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '02.04.2023',
      commentsCount: 18,
      category: 'Советы',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Самые ожидаемые игры конца 2023 года',
      excerpt: 'Какие релизы стоит ждать в этом году и почему.',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071',
      author: 'Геймер2077',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20.04.2023',
      commentsCount: 32,
      category: 'Новости',
      rating: 4.8
    }
  ]);

  const deleteBlog = (blogId: number) => {
    setUserBlogs(userBlogs.filter(blog => blog.id !== blogId));
    
    toast({
      title: "Блог удален",
      description: "Ваш блог был успешно удален",
    });
  };

  const handleCreateBlog = () => {
    navigate('/blog?createNew=true');
  };

  const handleEditBlog = (blogId: number) => {
    navigate(`/blog?edit=${blogId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-gaming-red"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path><polyline points="10 2 10 11 13 7 16 11 16 2"></polyline></svg>
          Мои блоги
        </h2>
        <Button 
          onClick={handleCreateBlog}
          className="bg-gaming-red hover:bg-gaming-red/90"
        >
          <Plus size={16} className="mr-2" />
          Создать новый блог
        </Button>
      </div>

      {userBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userBlogs.map(blog => (
            <div key={blog.id} className="relative group">
              <BlogCard {...blog} />
              <div className="absolute bottom-[40%] right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gaming-dark-accent/80 hover:bg-gaming-dark-accent border-white/10"
                  onClick={() => handleEditBlog(blog.id)}
                >
                  <Edit size={16} />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-gaming-dark-accent/80 hover:bg-gaming-red text-gaming-text-secondary hover:text-white"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gaming-card-bg border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gaming-text-primary">Удалить блог</AlertDialogTitle>
                      <AlertDialogDescription className="text-gaming-text-secondary">
                        Вы уверены, что хотите удалить блог "{blog.title}"? Это действие нельзя будет отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gaming-dark-accent border-white/10 text-gaming-text-primary hover:bg-gaming-dark-accent/80 hover:text-gaming-text-primary">
                        Отмена
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-gaming-red hover:bg-gaming-red/90"
                        onClick={() => deleteBlog(blog.id)}
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gaming-text-secondary"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path><polyline points="10 2 10 11 13 7 16 11 16 2"></polyline></svg>
          <p className="text-gaming-text-secondary">У вас пока нет блогов</p>
          <Button
            className="mt-4 bg-gaming-red hover:bg-gaming-red/90"
            onClick={handleCreateBlog}
          >
            Создать первый блог
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileBlogs;
