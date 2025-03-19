
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Типы и интерфейсы
interface User {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  user: User;
  messages: Message[];
  unreadCount: number;
}

// Моковые данные
const currentUserId = '123'; // ID текущего пользователя
const mockUsers: User[] = [
  { id: '1', username: 'РПГМастер', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online' },
  { id: '2', username: 'СтратегКиберспорта', avatar: 'https://i.pravatar.cc/150?img=2', status: 'offline', lastSeen: '2 часа назад' },
  { id: '3', username: 'ШутерПро', avatar: 'https://i.pravatar.cc/150?img=3', status: 'online' },
  { id: '4', username: 'АдвенчурЛеди', avatar: 'https://i.pravatar.cc/150?img=4', status: 'offline', lastSeen: '1 день назад' },
];

const mockMessages: Message[] = [
  { id: '1', senderId: '1', receiverId: currentUserId, text: 'Привет! Как тебе новый Baldur\'s Gate 3?', timestamp: new Date('2023-11-10T10:00:00'), read: true },
  { id: '2', senderId: currentUserId, receiverId: '1', text: 'Привет! Отличная игра, уже 40 часов наиграл!', timestamp: new Date('2023-11-10T10:05:00'), read: true },
  { id: '3', senderId: '1', receiverId: currentUserId, text: 'Круто! За какой класс играешь?', timestamp: new Date('2023-11-10T10:07:00'), read: true },
  { id: '4', senderId: currentUserId, receiverId: '1', text: 'За паладина, очень интересно развивать персонажа.', timestamp: new Date('2023-11-10T10:10:00'), read: true },
  { id: '5', senderId: '1', receiverId: currentUserId, text: 'Хороший выбор! Я за друида прохожу, много интересных механик.', timestamp: new Date('2023-11-10T10:15:00'), read: false },
  
  { id: '6', senderId: '2', receiverId: currentUserId, text: 'Будешь сегодня в CS:GO?', timestamp: new Date('2023-11-09T18:30:00'), read: true },
  { id: '7', senderId: currentUserId, receiverId: '2', text: 'Да, буду после 20:00', timestamp: new Date('2023-11-09T18:35:00'), read: true },
  { id: '8', senderId: '2', receiverId: currentUserId, text: 'Отлично, кину приглашение!', timestamp: new Date('2023-11-09T18:37:00'), read: false },
  
  { id: '9', senderId: '3', receiverId: currentUserId, text: 'Видел новый трейлер GTA 6?', timestamp: new Date('2023-11-08T12:00:00'), read: true },
  { id: '10', senderId: currentUserId, receiverId: '3', text: 'Да! Выглядит потрясающе!', timestamp: new Date('2023-11-08T12:10:00'), read: true },
];

// Формируем беседы на основе пользователей и сообщений
const createMockConversations = (): Conversation[] => {
  return mockUsers.map(user => {
    const userMessages = mockMessages.filter(
      msg => (msg.senderId === user.id && msg.receiverId === currentUserId) || 
             (msg.senderId === currentUserId && msg.receiverId === user.id)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    const unreadCount = userMessages.filter(msg => msg.senderId === user.id && !msg.read).length;
    
    return {
      user,
      messages: userMessages,
      unreadCount
    };
  });
};

interface ProfileMessagesProps {
  userId: string;
}

const ProfileMessages = ({ userId }: ProfileMessagesProps) => {
  const [conversations, setConversations] = useState<Conversation[]>(createMockConversations());
  const [activeConversationUserId, setActiveConversationUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Получение активной беседы
  const activeConversation = conversations.find(
    conv => conv.user.id === activeConversationUserId
  );
  
  // Автоматически выбираем первую беседу, если ни одна не выбрана
  useEffect(() => {
    if (!activeConversationUserId && conversations.length > 0) {
      setActiveConversationUserId(conversations[0].user.id);
    }
  }, [conversations, activeConversationUserId]);
  
  // Прокрутка сообщений вниз при изменении активной беседы или добавлении нового сообщения
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [activeConversation, messageContainerRef]);
  
  // Отправка нового сообщения
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversationUserId) return;
    
    const newMessageObj: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUserId,
      receiverId: activeConversationUserId,
      text: newMessage,
      timestamp: new Date(),
      read: false
    };
    
    // Обновляем состояние бесед
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.user.id === activeConversationUserId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessageObj]
          };
        }
        return conv;
      });
    });
    
    setNewMessage('');
  };
  
  // Форматирование даты сообщения
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();
    
    if (isToday) {
      return `Сегодня, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else if (isYesterday) {
      return `Вчера, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
  };
  
  // Фильтрация бесед по поисковому запросу
  const filteredConversations = searchQuery.trim() === '' 
    ? conversations 
    : conversations.filter(conv => 
        conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-md overflow-hidden h-[600px] flex">
      {/* Список бесед */}
      <div className="w-full md:w-80 border-r border-white/10 bg-gaming-dark-accent overflow-hidden flex flex-col">
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск сообщений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-gaming-dark border-white/10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-secondary" size={18} />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            <div>
              {filteredConversations.map(conv => (
                <button
                  key={conv.user.id}
                  className={cn(
                    "w-full p-3 text-left hover:bg-gaming-dark/50 transition-colors flex items-center",
                    activeConversationUserId === conv.user.id && "bg-gaming-dark"
                  )}
                  onClick={() => setActiveConversationUserId(conv.user.id)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 mr-3">
                      {conv.user.avatar ? (
                        <AvatarImage src={conv.user.avatar} alt={conv.user.username} />
                      ) : (
                        <AvatarFallback className="bg-gaming-dark-accent">
                          {conv.user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span 
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gaming-dark-accent ${
                        conv.user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">{conv.user.username}</span>
                      {conv.unreadCount > 0 && (
                        <span className="bg-gaming-red text-white text-xs px-1.5 py-0.5 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    {conv.messages.length > 0 && (
                      <p className="text-xs text-gaming-text-secondary truncate">
                        {conv.messages[conv.messages.length - 1].senderId === currentUserId ? 'Вы: ' : ''}
                        {conv.messages[conv.messages.length - 1].text}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gaming-text-secondary">
              {searchQuery.trim() !== '' ? 'Ничего не найдено' : 'Нет сообщений'}
            </div>
          )}
        </div>
      </div>
      
      {/* Окно сообщений */}
      <div className="hidden md:flex flex-col flex-1">
        {activeConversation ? (
          <>
            {/* Шапка беседы */}
            <div className="p-3 border-b border-white/10 bg-gaming-dark-accent flex items-center">
              <div className="relative">
                <Avatar className="h-8 w-8 mr-3">
                  {activeConversation.user.avatar ? (
                    <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.username} />
                  ) : (
                    <AvatarFallback className="bg-gaming-dark">
                      {activeConversation.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span 
                  className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-gaming-dark-accent ${
                    activeConversation.user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`} 
                />
              </div>
              
              <div>
                <h3 className="font-medium">{activeConversation.user.username}</h3>
                <p className="text-xs text-gaming-text-secondary">
                  {activeConversation.user.status === 'online' 
                    ? 'В сети' 
                    : `Был в сети: ${activeConversation.user.lastSeen}`
                  }
                </p>
              </div>
            </div>
            
            {/* Сообщения */}
            <div 
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
              ref={messageContainerRef}
            >
              {activeConversation.messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[80%] p-3 rounded-md",
                    message.senderId === currentUserId 
                      ? "bg-gaming-red/10 ml-auto rounded-tr-none" 
                      : "bg-gaming-dark-accent mr-auto rounded-tl-none"
                  )}
                >
                  <p className="break-words">{message.text}</p>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gaming-text-secondary">
                      {formatMessageDate(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Поле ввода сообщения */}
            <div className="p-3 border-t border-white/10 bg-gaming-dark-accent flex gap-2">
              <Button variant="ghost" size="icon" className="text-gaming-text-secondary">
                <Paperclip size={20} />
              </Button>
              <Input
                type="text"
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-gaming-dark border-white/10"
              />
              <Button 
                className="bg-gaming-red hover:bg-gaming-red-hover"
                onClick={handleSendMessage}
              >
                <Send size={18} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gaming-text-secondary">
            Выберите чат для начала общения
          </div>
        )}
      </div>
      
      {/* Мобильное представление - сообщение о необходимости десктопной версии */}
      <div className="flex md:hidden flex-col flex-1 items-center justify-center p-6 text-center">
        <div className="text-gaming-text-secondary">
          <p className="mb-2">Для полноценного общения в чате откройте сайт на устройстве с большим экраном.</p>
          <p>На мобильных устройствах доступен только список чатов.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMessages;
