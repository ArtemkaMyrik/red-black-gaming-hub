
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Edit, Trash, CheckCircle, XCircle, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data with properly typed status
const mockBlogs = [
  { 
    id: 1, 
    title: '10 самых ожидаемых игр 2024 года', 
    author: 'GameReporter',
    category: 'Новости',
    publishDate: '20.12.2023',
    status: 'approved' as const,
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070'
    ]
  },
  { 
    id: 2, 
    title: 'Обзор Cyberpunk 2077 после всех патчей', 
    author: 'CyberGuru',
    category: 'Обзоры',
    publishDate: '15.11.2023',
    status: 'approved' as const,
    images: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2030'
    ]
  },
  { 
    id: 3, 
    title: 'Как стать лучшим в Dota 2: советы профессионалов', 
    author: 'ProGamer',
    category: 'Гайды',
    publishDate: '05.01.2024',
    status: 'pending' as const,
    images: []
  },
  { 
    id: 4, 
    title: 'История серии The Elder Scrolls', 
    author: 'RPGHistorian',
    category: 'История',
    publishDate: '10.02.2024',
    status: 'pending' as const,
    images: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070'
    ]
  },
];

interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  status: 'approved' | 'pending' | 'rejected';
  content?: string;
  images?: string[];
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false);
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const approveBlog = (id: number) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, status: 'approved' as const } : blog
    ));
    toast.success('Статья одобрена');
  };
  
  const rejectBlog = (id: number) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, status: 'rejected' as const } : blog
    ));
    toast.success('Статья отклонена');
  };
  
  const deleteBlog = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      toast.success('Статья удалена');
    }
  };
  
  const viewBlog = (blog: Blog) => {
    setSelectedBlog({
      ...blog,
      content: "Это тестовый контент для блога. В реальном приложении здесь будет полный текст статьи с форматированием. Представьте, что здесь много текста с заголовками, списками, изображениями и т.д."
    });
    setIsBlogDialogOpen(true);
  };

  const viewImages = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsImagesDialogOpen(true);
  };
  
  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Управление блогом</h2>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gaming-text-secondary" size={18} />
          <Input
            placeholder="Поиск статей..."
            className="pl-8 bg-gaming-dark border-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border border-white/10 overflow-hidden">
        <Table className="min-w-full bg-gaming-dark">
          <TableHeader>
            <TableRow className="bg-gaming-dark-accent hover:bg-gaming-dark-accent">
              <TableHead className="w-[300px]">Заголовок</TableHead>
              <TableHead>Автор</TableHead>
              <TableHead className="hidden md:table-cell">Категория</TableHead>
              <TableHead className="hidden md:table-cell">Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <TableRow key={blog.id} className="hover:bg-gaming-dark-accent">
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell className="hidden md:table-cell">{blog.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{blog.publishDate}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      blog.status === 'approved' 
                        ? 'bg-green-900/30 text-green-400' 
                        : blog.status === 'rejected'
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {blog.status === 'approved' 
                        ? 'Опубликовано' 
                        : blog.status === 'rejected'
                        ? 'Отклонено'
                        : 'На проверке'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => viewBlog(blog)}
                        className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                      >
                        <Eye size={16} />
                      </Button>
                      {blog.images && blog.images.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => viewImages(blog)}
                          className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                        >
                          <Image size={16} />
                        </Button>
                      )}
                      {blog.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => approveBlog(blog.id)}
                            className="h-8 w-8 p-0 text-green-500"
                          >
                            <CheckCircle size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => rejectBlog(blog.id)}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <XCircle size={16} />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteBlog(blog.id)}
                        className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-red-500"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Диалог просмотра статьи */}
      <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
        <DialogContent className="bg-gaming-card-bg border-white/10 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Просмотр статьи</DialogTitle>
            <DialogDescription>
              Просмотр содержания и деталей статьи
            </DialogDescription>
          </DialogHeader>
          
          {selectedBlog && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{selectedBlog.title}</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Автор</h3>
                  <p>{selectedBlog.author}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Категория</h3>
                  <p>{selectedBlog.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Дата публикации</h3>
                  <p>{selectedBlog.publishDate}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gaming-text-secondary">Содержание</h3>
                <p className="mt-1 p-3 bg-gaming-dark rounded-md whitespace-pre-line">{selectedBlog.content}</p>
              </div>
              
              {selectedBlog.images && selectedBlog.images.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Изображения ({selectedBlog.images.length})</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {selectedBlog.images.map((img, idx) => (
                      <div key={idx} className="aspect-video bg-gaming-dark rounded-md overflow-hidden">
                        <img src={img} alt={`Изображение ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2 pt-2">
                {selectedBlog.status === 'pending' && (
                  <>
                    <Button 
                      onClick={() => {
                        approveBlog(selectedBlog.id);
                        setIsBlogDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Опубликовать
                    </Button>
                    <Button 
                      onClick={() => {
                        rejectBlog(selectedBlog.id);
                        setIsBlogDialogOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <XCircle size={16} className="mr-2" />
                      Отклонить
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline"
                  onClick={() => setIsBlogDialogOpen(false)}
                  className="border-white/10"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог просмотра изображений */}
      <Dialog open={isImagesDialogOpen} onOpenChange={setIsImagesDialogOpen}>
        <DialogContent className="bg-gaming-card-bg border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Изображения статьи</DialogTitle>
            <DialogDescription>
              {selectedBlog?.title}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBlog && selectedBlog.images && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {selectedBlog.images.map((img, idx) => (
                <div key={idx} className="group relative rounded-lg overflow-hidden bg-gaming-dark">
                  <img 
                    src={img} 
                    alt={`Изображение ${idx + 1}`} 
                    className="w-full aspect-video object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white/20 bg-black/50 hover:bg-black/70"
                      onClick={() => window.open(img, '_blank')}
                    >
                      <Eye size={16} className="mr-2" />
                      Просмотр
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline"
              onClick={() => setIsImagesDialogOpen(false)}
              className="border-white/10"
            >
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogs;
