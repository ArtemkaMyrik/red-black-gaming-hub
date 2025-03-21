
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Edit, Trash, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data
const mockBlogs = [
  { 
    id: 1, 
    title: '10 самых ожидаемых игр 2024 года', 
    author: 'GameReporter',
    category: 'Новости',
    publishDate: '20.12.2023',
    status: 'approved' 
  },
  { 
    id: 2, 
    title: 'Обзор Cyberpunk 2077 после всех патчей', 
    author: 'CyberGuru',
    category: 'Обзоры',
    publishDate: '15.11.2023',
    status: 'approved' 
  },
  { 
    id: 3, 
    title: 'Как стать лучшим в Dota 2: советы профессионалов', 
    author: 'ProGamer',
    category: 'Гайды',
    publishDate: '05.01.2024',
    status: 'pending' 
  },
  { 
    id: 4, 
    title: 'История серии The Elder Scrolls', 
    author: 'RPGHistorian',
    category: 'История',
    publishDate: '10.02.2024',
    status: 'pending' 
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
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  
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
      
      <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
        <DialogContent className="bg-gaming-card-bg border-white/10 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Просмотр статьи</DialogTitle>
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
    </div>
  );
};

export default AdminBlogs;
