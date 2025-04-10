
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
  userRating?: number | null;
  onRatingChange?: (rating: number) => void;
}

const GameReviews = ({ gameId, initialReviews, userRating = 0, onRatingChange }: GameReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(userRating || 0);
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
    
    // Вызываем callback для обновления родительского компонента, если он предоставлен
    if (onRatingChange) {
      onRatingChange(rating);
    }
    
    // Сбрасываем форму
    setNewReview('');
    
    toast.success('Ваш отзыв добавлен!');
  };

  // Обновляем рейтинг и вызываем callback
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
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
                <div
                  key={star}
                  className="w-6 h-6 relative cursor-pointer flex"
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  {/* Левая половина (0.5) */}
                  <div 
                    className="w-1/2 h-full absolute left-0 top-0 z-10"
                    onMouseEnter={() => setHoveredRating(star - 0.5)}
                    onClick={() => handleRatingChange(star - 0.5)}
                  ></div>
                  
                  {/* Правая половина (1.0) */}
                  <div 
                    className="w-1/2 h-full absolute right-0 top-0 z-10"
                    onMouseEnter={() => setHoveredRating(star)}
                    onClick={() => handleRatingChange(star)}
                  ></div>
                  
                  {/* Основная звезда */}
                  <Star
                    size={24}
                    className={
                      (rating !== 0 && star <= rating) || (hoveredRating !== 0 && star <= hoveredRating)
                        ? "text-gaming-red fill-gaming-red"
                        : "text-gaming-text-secondary"
                    }
                  />
                  
                  {/* Половина звезды */}
                  {((rating !== 0 && star - 0.5 === rating) || 
                    (hoveredRating !== 0 && star - 0.5 === hoveredRating)) && (
                    <div className="absolute inset-0 w-1/2 overflow-hidden">
                      <Star
                        size={24}
                        className="text-gaming-red fill-gaming-red"
                      />
                    </div>
                  )}
                </div>
              ))}
              <span className="ml-4 text-sm text-gaming-text-secondary">
                {hoveredRating 
                  ? `${hoveredRating.toFixed(1)} из 5` 
                  : rating 
                    ? `${rating.toFixed(1)} из 5` 
                    : 'Нажмите на звезду, чтобы оценить игру'}
              </span>
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
