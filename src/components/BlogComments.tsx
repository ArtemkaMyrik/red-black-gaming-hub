
import { useState } from 'react';
import { User, Heart, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface Comment {
  id: number;
  user: string;
  userAvatar?: string;
  text: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface BlogCommentsProps {
  articleId: number;
}

const BlogComments = ({ articleId }: BlogCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'Мария Иванова',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1787&auto=format&fit=crop',
      text: 'Очень интересная статья! Я всегда считала, что именно Skyrim задал новый стандарт для открытых миров, хотя некоторые механики были не идеальными.',
      date: '19 апреля 2023',
      likes: 12,
      replies: [
        {
          id: 3,
          user: 'Дмитрий Козлов',
          text: 'Согласен насчет Skyrim, но я бы добавил, что именно The Witcher 3 поднял планку в плане проработанности второстепенных квестов.',
          date: '19 апреля 2023',
          likes: 8
        }
      ]
    },
    {
      id: 2,
      user: 'Александр Петров',
      text: 'Breath of the Wild действительно изменил мое представление о том, каким должен быть открытый мир. Интересно, сможет ли кто-то превзойти Nintendo в этом аспекте в ближайшие годы?',
      date: '18 апреля 2023',
      likes: 9
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  
  const handleAddComment = () => {
    if (newComment.trim() === '') {
      toast.error('Пожалуйста, напишите комментарий');
      return;
    }
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const newCommentObj: Comment = {
      id: Date.now(),
      user: 'Пользователь', // В реальном приложении это будет имя авторизованного пользователя
      text: newComment,
      date: formattedDate,
      likes: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    
    toast.success('Комментарий добавлен!');
  };
  
  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(
        comments.map(comment => {
          if (comment.id === parentId && comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply.id === commentId) {
                  return { ...reply, likes: reply.likes + 1 };
                }
                return reply;
              })
            };
          }
          return comment;
        })
      );
    } else {
      setComments(
        comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        })
      );
    }
    
    toast.success('Вам понравился этот комментарий!');
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Комментарии ({
        comments.reduce((total, comment) => 
          total + 1 + (comment.replies?.length || 0), 0)
      })</h2>
      
      {/* Форма для добавления комментария */}
      <div className="mb-8 p-4 bg-gaming-card-bg rounded-md border border-white/5">
        <h3 className="text-lg font-medium mb-4">Оставить комментарий</h3>
        
        <Textarea
          placeholder="Поделитесь своим мнением о статье..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] bg-gaming-dark border-white/10 focus:border-gaming-red mb-4"
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAddComment}
            className="bg-gaming-red hover:bg-gaming-red/90"
          >
            <Send size={16} className="mr-2" />
            Отправить
          </Button>
        </div>
      </div>
      
      {/* Список комментариев */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="space-y-4">
              <div className="p-4 bg-gaming-card-bg rounded-md">
                <div className="flex items-center mb-2">
                  {comment.userAvatar ? (
                    <img 
                      src={comment.userAvatar} 
                      alt={comment.user}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gaming-dark rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      {comment.user.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  
                  <div>
                    <div className="font-medium">{comment.user}</div>
                    <div className="text-xs text-gaming-text-secondary">{comment.date}</div>
                  </div>
                </div>
                
                <p className="mb-3">{comment.text}</p>
                
                <div className="flex items-center gap-4">
                  <button 
                    className="flex items-center gap-1 text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
                    onClick={() => handleLike(comment.id)}
                  >
                    <Heart size={14} className={comment.likes > 0 ? "text-gaming-red fill-gaming-red" : ""} />
                    {comment.likes}
                  </button>
                  
                  <button className="flex items-center gap-1 text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                    <MessageSquare size={14} />
                    Ответить
                  </button>
                </div>
              </div>
              
              {/* Ответы на комментарий */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 space-y-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="p-4 bg-gaming-dark-accent rounded-md">
                      <div className="flex items-center mb-2">
                        {reply.userAvatar ? (
                          <img 
                            src={reply.userAvatar} 
                            alt={reply.user}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gaming-dark rounded-full flex items-center justify-center text-xs font-bold mr-3">
                            {reply.user.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        
                        <div>
                          <div className="font-medium">{reply.user}</div>
                          <div className="text-xs text-gaming-text-secondary">{reply.date}</div>
                        </div>
                      </div>
                      
                      <p className="mb-3">{reply.text}</p>
                      
                      <button 
                        className="flex items-center gap-1 text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
                        onClick={() => handleLike(reply.id, true, comment.id)}
                      >
                        <Heart size={14} className={reply.likes > 0 ? "text-gaming-red fill-gaming-red" : ""} />
                        {reply.likes}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gaming-text-secondary">
          <p>Комментариев пока нет. Будьте первым, кто оставит комментарий!</p>
        </div>
      )}
    </div>
  );
};

export default BlogComments;
