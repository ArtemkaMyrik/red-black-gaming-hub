
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

// Типы и интерфейсы
interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  text: string;
  timestamp: Date;
}

interface GroupChatProps {
  groupId: string;
}

// Моковые данные
const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      userId: '101',
      username: 'RPGlover',
      avatar: 'https://i.pravatar.cc/150?img=33',
      text: 'Установил новый мод на Skyrim, который добавляет полностью озвученных спутников с квестами. Очень рекомендую!',
      timestamp: new Date('2023-11-10T10:00:00')
    },
    {
      id: '2',
      userId: '102',
      username: 'DragonSlayer',
      avatar: 'https://i.pravatar.cc/150?img=42',
      text: 'Как называется? Я тоже ищу хорошие моды на компаньонов.',
      timestamp: new Date('2023-11-10T10:05:00')
    },
    {
      id: '3',
      userId: '101',
      username: 'RPGlover',
      avatar: 'https://i.pravatar.cc/150?img=33',
      text: 'Inigo. Один из лучших модов на компаньонов вообще. У него даже есть свой сюжет.',
      timestamp: new Date('2023-11-10T10:07:00')
    },
    {
      id: '4',
      userId: '103',
      username: 'NordWarrior',
      text: 'Кто-нибудь пробовал Requiem? Хочу установить, но боюсь конфликтов с другими модами.',
      timestamp: new Date('2023-11-10T10:15:00')
    }
  ],
  '2': [
    {
      id: '1',
      userId: '201',
      username: 'HeadshotMaster',
      avatar: 'https://i.pravatar.cc/150?img=22',
      text: 'Кто смотрел последний мейджор? Counter Strike все еще держит планку лучшего киберспортивного шутера!',
      timestamp: new Date('2023-11-09T18:30:00')
    },
    {
      id: '2',
      userId: '202',
      username: 'SniperElite',
      avatar: 'https://i.pravatar.cc/150?img=25',
      text: 'Да, было эпично. Особенно финал. Но мне кажется, что CS2 еще требует доработки по сравнению с CS:GO.',
      timestamp: new Date('2023-11-09T18:35:00')
    }
  ]
};

const GroupChat = ({ groupId }: GroupChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages[groupId] || []);
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Автоматическая прокрутка вниз при получении нового сообщения
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
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
  
  // Отправка нового сообщения
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMessageObj: ChatMessage = {
      id: `new-${Date.now()}`,
      userId: 'current-user', // В реальном приложении здесь был бы ID текущего пользователя
      username: 'Геймер2077', // Имя текущего пользователя
      avatar: 'https://i.pravatar.cc/300', // Аватар текущего пользователя
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };
  
  return (
    <div className="flex flex-col h-[600px]">
      {/* Сообщения */}
      <div 
        className="flex-1 overflow-y-auto p-2 flex flex-col gap-3"
        ref={messageContainerRef}
      >
        {messages.length > 0 ? (
          messages.map(message => (
            <div
              key={message.id}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8">
                {message.avatar ? (
                  <AvatarImage src={message.avatar} alt={message.username} />
                ) : (
                  <AvatarFallback className="bg-gaming-dark-accent">
                    {message.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{message.username}</span>
                  <span className="text-xs text-gaming-text-secondary">
                    {formatMessageDate(message.timestamp)}
                  </span>
                </div>
                <p className="text-gaming-text-primary">{message.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gaming-text-secondary">
            В этой группе пока нет сообщений. Начните общение!
          </div>
        )}
      </div>
      
      {/* Поле ввода сообщения */}
      <div className="mt-4 flex gap-2">
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
    </div>
  );
};

export default GroupChat;
