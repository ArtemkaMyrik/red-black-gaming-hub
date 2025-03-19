
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewCard from './ReviewCard';

// Временные данные для демонстрации
const mockReviews = [
  {
    id: 1,
    username: 'Геймер2077',
    gameTitle: 'Fallout 4',
    gameImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
    rating: 4.5,
    text: 'Отличная игра с захватывающим открытым миром. Несмотря на некоторые проблемы с сюжетом, геймплей и атмосфера на высоте.',
    date: '10.03.2023',
    likes: 15
  },
  {
    id: 2,
    username: 'Геймер2077',
    gameTitle: 'The Witcher 3',
    gameImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2030',
    rating: 5,
    text: 'Лучшая RPG, которую я когда-либо играл. Сюжет, персонажи, мир - всё на высшем уровне.',
    date: '22.01.2023',
    likes: 27
  }
];

const mockComments = [
  {
    id: 1,
    articleTitle: 'Топ 10 RPG игр 2023 года',
    text: 'Согласен с автором. Baldur\'s Gate 3 действительно лучшая игра года.',
    date: '15.04.2023',
    likes: 8
  },
  {
    id: 2,
    articleTitle: 'Обзор нового дополнения для Cyberpunk 2077',
    text: 'Отличное дополнение! CD Projekt RED исправились после неудачного релиза.',
    date: '03.02.2023',
    likes: 12
  }
];

interface ProfileActivityProps {
  userId: string;
}

const ProfileActivity = ({ userId }: ProfileActivityProps) => {
  const [activeTab, setActiveTab] = useState("reviews");
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Активность</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:w-[400px] mb-6">
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          <TabsTrigger value="comments">Комментарии</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews" className="mt-0">
          {mockReviews.length > 0 ? (
            <div className="space-y-6">
              {mockReviews.map(review => (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  username={review.username}
                  gameTitle={review.gameTitle}
                  gameImage={review.gameImage}
                  rating={review.rating}
                  text={review.text}
                  date={review.date}
                  likes={review.likes}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
              <p className="text-gaming-text-secondary">У пользователя пока нет отзывов</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="comments" className="mt-0">
          {mockComments.length > 0 ? (
            <div className="space-y-4">
              {mockComments.map(comment => (
                <div 
                  key={comment.id} 
                  className="bg-gaming-card-bg rounded-md p-4 border border-white/10"
                >
                  <h3 className="font-medium mb-2">{comment.articleTitle}</h3>
                  <p className="text-gaming-text-secondary mb-3">{comment.text}</p>
                  <div className="flex justify-between items-center text-xs text-gaming-text-secondary">
                    <span>{comment.date}</span>
                    <span>Лайки: {comment.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gaming-card-bg rounded-md border border-white/10">
              <p className="text-gaming-text-secondary">У пользователя пока нет комментариев</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileActivity;
