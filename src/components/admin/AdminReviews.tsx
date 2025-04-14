
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { fetchReviews, approveReview, deleteReview, Review } from '@/services/reviewsService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AdminReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  
  // Запрос списка отзывов с использованием React Query
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews
  });

  // Мутация для публикации отзыва
  const approveMutation = useMutation({
    mutationFn: (id: string) => approveReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Отзыв опубликован');
    },
    onError: (error) => {
      console.error('Ошибка при публикации отзыва:', error);
      toast.error('Не удалось опубликовать отзыв');
    }
  });

  // Мутация для удаления отзыва
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Отзыв удален');
    },
    onError: (error) => {
      console.error('Ошибка при удалении отзыва:', error);
      toast.error('Не удалось удалить отзыв');
    }
  });
  
  // Фильтрация отзывов
  const filteredReviews = reviews.filter(review => 
    (review.game_title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (review.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (review.text?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );
  
  const handleApproveReview = (id: string) => {
    approveMutation.mutate(id);
  };
  
  const handleDeleteReview = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      deleteMutation.mutate(id);
      // Если открыт диалог с этим отзывом, закрываем его
      if (selectedReview?.id === id) {
        setIsReviewDialogOpen(false);
      }
    }
  };
  
  const viewReview = (review: Review) => {
    setSelectedReview(review);
    setIsReviewDialogOpen(true);
  };

  if (error) {
    return (
      <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
        <div className="text-center py-8 text-red-500">
          <p>Произошла ошибка при загрузке отзывов</p>
          <p className="text-sm opacity-75">{(error as Error).message}</p>
        </div>
      </div>
    );
  }
  
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Загрузка отзывов...
                </TableCell>
              </TableRow>
            ) : filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <TableRow key={review.id} className="hover:bg-gaming-dark-accent">
                  <TableCell className="font-medium">{review.game_title || 'Без названия'}</TableCell>
                  <TableCell>{review.username || 'Неизвестный пользователь'}</TableCell>
                  <TableCell className="hidden md:table-cell">{review.rating}/5</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                  </TableCell>
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
                            onClick={() => handleApproveReview(review.id)}
                            className="h-8 w-8 p-0 text-green-500"
                          >
                            <CheckCircle size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteReview(review.id)}
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
                  <p>{selectedReview.game_title || 'Без названия'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Пользователь</h3>
                  <p>{selectedReview.username || 'Неизвестный пользователь'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Оценка</h3>
                  <p>{selectedReview.rating}/5</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Дата</h3>
                  <p>{new Date(selectedReview.created_at).toLocaleDateString('ru-RU')}</p>
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
                        handleApproveReview(selectedReview.id);
                        setIsReviewDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Опубликовать
                    </Button>
                    <Button 
                      onClick={() => {
                        handleDeleteReview(selectedReview.id);
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
