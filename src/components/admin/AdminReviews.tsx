
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data
const mockReviews = [
  { 
    id: 1, 
    gameTitle: 'Cyberpunk 2077', 
    username: 'Игроман2000',
    rating: 4,
    text: 'Отличная игра, но много багов на старте. Сейчас все исправлено и играть одно удовольствие!',
    date: '15.01.2023',
    published: true
  },
  { 
    id: 2, 
    gameTitle: 'The Witcher 3', 
    username: 'FunkyGamer',
    rating: 5,
    text: 'Лучшая RPG всех времен! Невероятный сюжет, персонажи, музыка - все на высшем уровне.',
    date: '22.05.2022',
    published: true
  },
  { 
    id: 3, 
    gameTitle: 'Elden Ring', 
    username: 'DarkSouls_Fan',
    rating: 5,
    text: 'Шедевр от FromSoftware. Открытый мир внес свежесть в формулу соулс-игр.',
    date: '10.03.2022',
    published: false
  },
  { 
    id: 4, 
    gameTitle: 'Baldur\'s Gate 3', 
    username: 'RPG_Master',
    rating: 2,
    text: 'Слишком много багов и неудобный интерфейс. Не рекомендую к покупке.',
    date: '15.08.2023',
    published: false
  },
];

interface Review {
  id: number;
  gameTitle: string;
  username: string;
  rating: number;
  text: string;
  date: string;
  published: boolean;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  const filteredReviews = reviews.filter(review => 
    review.gameTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const approveReview = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, published: true } : review
    ));
    toast.success('Отзыв опубликован');
  };
  
  const deleteReview = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      setReviews(reviews.filter(review => review.id !== id));
      toast.success('Отзыв удален');
    }
  };
  
  const viewReview = (review: Review) => {
    setSelectedReview(review);
    setIsReviewDialogOpen(true);
  };
  
  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Управление отзывами</h2>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gaming-text-secondary" size={18} />
          <Input
            placeholder="Поиск отзывов..."
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
              <TableHead>Игра</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead className="hidden md:table-cell">Оценка</TableHead>
              <TableHead className="hidden md:table-cell">Дата</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <TableRow key={review.id} className="hover:bg-gaming-dark-accent">
                  <TableCell className="font-medium">{review.gameTitle}</TableCell>
                  <TableCell>{review.username}</TableCell>
                  <TableCell className="hidden md:table-cell">{review.rating}/5</TableCell>
                  <TableCell className="hidden md:table-cell">{review.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => viewReview(review)}
                        className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                      >
                        <Eye size={16} />
                      </Button>
                      {!review.published && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => approveReview(review.id)}
                            className="h-8 w-8 p-0 text-green-500"
                          >
                            <CheckCircle size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteReview(review.id)}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <XCircle size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-gaming-card-bg border-white/10">
          <DialogHeader>
            <DialogTitle>Просмотр отзыва</DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Игра</h3>
                  <p>{selectedReview.gameTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Пользователь</h3>
                  <p>{selectedReview.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Оценка</h3>
                  <p>{selectedReview.rating}/5</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Дата</h3>
                  <p>{selectedReview.date}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gaming-text-secondary">Отзыв</h3>
                <p className="mt-1 p-3 bg-gaming-dark rounded-md">{selectedReview.text}</p>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                {!selectedReview.published && (
                  <>
                    <Button 
                      onClick={() => {
                        approveReview(selectedReview.id);
                        setIsReviewDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Опубликовать
                    </Button>
                    <Button 
                      onClick={() => {
                        deleteReview(selectedReview.id);
                        setIsReviewDialogOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <XCircle size={16} className="mr-2" />
                      Удалить
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline"
                  onClick={() => setIsReviewDialogOpen(false)}
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

export default AdminReviews;
