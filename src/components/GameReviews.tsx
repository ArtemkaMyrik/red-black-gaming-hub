
import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ReviewCard from './ReviewCard';

interface Review {
  id: number;
  username: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  likes: number;
}

interface GameReviewsProps {
  gameId: number;
  initialReviews: Review[];
}

const GameReviews = ({ gameId, initialReviews }: GameReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleSubmitReview = () => {
    if (newReview.trim() === '') {
      toast.error('Пожалуйста, напишите текст отзыва');
      return;
    }
    
    if (rating === 0) {
      toast.error('Пожалуйста, поставьте оценку');
      return;
    }
    
    // Создаем новый отзыв
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ru-RU');
    
    const newReviewObj: Review = {
      id: Date.now(),
      username: 'Пользователь', // В реальном приложении это будет имя авторизованного пользователя
      rating,
      text: newReview,
      date: formattedDate,
      likes: 0
    };
    
    // Добавляем отзыв в список
    setReviews([newReviewObj, ...reviews]);
    
    // Сбрасываем форму
    setNewReview('');
    setRating(0);
    
    toast.success('Ваш отзыв добавлен!');
  };
  
  return (
    <div className="bg-gaming-card-bg rounded-md border border-white/5 p-6">
      <h2 className="text-xl font-bold mb-6">Отзывы игроков</h2>
      
      {/* Форма для написания отзыва */}
      <div className="mb-8 p-4 bg-gaming-dark rounded-md border border-white/5">
        <h3 className="text-lg font-medium mb-4">Напишите свой отзыв</h3>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gaming-text-secondary mr-2">Ваша оценка:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-colors"
                >
                  <Star
                    size={20}
                    className={
                      star <= (hoveredRating || rating)
                        ? "text-gaming-red fill-gaming-red"
                        : "text-gaming-text-secondary"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          
          <Textarea
            placeholder="Поделитесь своими впечатлениями об игре..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="min-h-[120px] bg-gaming-card-bg border-white/10 focus:border-gaming-red"
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitReview}
            className="bg-gaming-red hover:bg-gaming-red/90"
          >
            <Send size={16} className="mr-2" />
            Отправить отзыв
          </Button>
        </div>
      </div>
      
      {/* Список отзывов */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              username={review.username}
              avatar={review.avatar}
              gameTitle=""
              gameImage=""
              rating={review.rating}
              text={review.text}
              date={review.date}
              likes={review.likes}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gaming-text-secondary">
          <p>Отзывов пока нет. Будьте первым, кто оставит отзыв!</p>
        </div>
      )}
    </div>
  );
};

export default GameReviews;
