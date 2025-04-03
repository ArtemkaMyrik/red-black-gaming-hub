import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, ArrowLeft, MessageSquare, Settings, UserPlus, UserMinus, ExternalLink } from 'lucide-react';
import GroupChat from './GroupChat';
import GroupMembers from './GroupMembers';

interface GroupData {
  id: string;
  name: string;
  image?: string;
  description: string;
  membersCount: number;
  category: string;
  createdAt: string;
  rules?: string;
  isJoined: boolean;
  isAdmin: boolean;
}

interface GroupDetailProps {
  groupId: string;
}

const GroupDetail = ({ groupId }: GroupDetailProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("discussion");
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setTimeout(() => {
      if (groupId === '1') {
        setGroup({
          id: '1',
          name: 'Фанаты Skyrim',
          image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1470',
          description: 'Группа для обсуждения всего, что связано с The Elder Scrolls V: Skyrim. Делимся историями прохождения, модами, интересными находками и глюками игры.',
          membersCount: 1250,
          category: 'RPG',
          createdAt: '14.03.2022',
          rules: '1. Уважаем друг друга.\n2. Не спамим.\n3. Контент должен быть связан со Skyrim или другими играми серии TES.',
          isJoined: true,
          isAdmin: false
        });
      } else if (groupId === '2') {
        setGroup({
          id: '2',
          name: 'CS:GO Стратегии',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470',
          description: 'Обсуждение тактик, стратегий и мета-игры в CS:GO и CS2. Делимся советами по улучшению скилла, разбираем профессиональные матчи.',
          membersCount: 3421,
          category: 'FPS',
          createdAt: '22.08.2021',
          rules: '1. Не рекламируем читы.\n2. Уважаем мнение каждого.\n3. Не спамим одинаковыми постами.',
          isJoined: false,
          isAdmin: false
        });
      } else {
        navigate('/groups');
        toast.error('Группа не найдена');
      }
      setLoading(false);
    }, 1000);
  }, [groupId, navigate]);

  const handleJoinToggle = () => {
    if (group) {
      setGroup({
        ...group,
        isJoined: !group.isJoined,
        membersCount: group.isJoined ? group.membersCount - 1 : group.membersCount + 1
      });
      
      toast.success(group.isJoined ? 'Вы вышли из группы' : 'Вы вступили в группу');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-pulse text-gaming-text-secondary">
          Загрузка ��руппы...
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-4">Группа не найдена</h2>
        <p className="text-gaming-text-secondary mb-6">
          Запрашиваемая группа не существует или была удалена.
        </p>
        <Button asChild>
          <Link to="/groups">
            <ArrowLeft className="mr-2" size={18} />
            Вернуться к списку групп
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" className="text-gaming-text-secondary p-0" asChild>
          <Link to="/groups">
            <ArrowLeft className="mr-2" size={18} />
            К списку групп
          </Link>
        </Button>
      </div>
      
      <div className="relative mb-6 overflow-hidden rounded-md">
        <div className="h-64 overflow-hidden">
          {group.image ? (
            <img 
              src={group.image} 
              alt={group.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gaming-dark-accent flex items-center justify-center">
              <Users size={64} className="text-gaming-text-secondary" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gaming-text-secondary">
                <span className="bg-gaming-dark-accent px-2 py-1 rounded">{group.category}</span>
                <span>{group.membersCount} участников</span>
                <span>Создана: {group.createdAt}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {group.isJoined && (
                <Button 
                  variant="outline" 
                  size="default" 
                  className="border-white/10 text-gaming-text-secondary hover:text-white"
                  asChild
                >
                  <Link to={`/groups/${group.id}/chat`}>
                    <ExternalLink size={16} className="mr-2" />
                    Перейти
                  </Link>
                </Button>
              )}
              
              <Button 
                onClick={handleJoinToggle}
                className={group.isJoined ? "bg-gaming-dark-accent hover:bg-gaming-dark" : "bg-gaming-red hover:bg-gaming-red-hover"}
              >
                {group.isJoined ? (
                  <>
                    <UserMinus className="mr-2" size={16} />
                    Покинуть группу
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={16} />
                    Вступить в группу
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-gaming-card-bg border border-white/10 rounded-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-3">О группе</h2>
            <p className="text-gaming-text-secondary mb-4">{group.description}</p>
            
            {group.rules && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">Правила группы:</h3>
                <div className="text-gaming-text-secondary whitespace-pre-line">
                  {group.rules}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gaming-card-bg border border-white/10 rounded-md p-4">
            <h2 className="text-lg font-bold mb-3">Администраторы</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Admin" />
                  <AvatarFallback className="bg-gaming-dark-accent">АД</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">АдминГруппы</h3>
                  <p className="text-xs text-gaming-text-secondary">Создатель</p>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Moderator" />
                  <AvatarFallback className="bg-gaming-dark-accent">МД</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">МодераторТоп</h3>
                  <p className="text-xs text-gaming-text-secondary">Модератор</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-gaming-card-bg border border-white/10 rounded-md overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full bg-gaming-dark-accent">
                <TabsTrigger value="discussion">Обсуждение</TabsTrigger>
                <TabsTrigger value="members">Участники</TabsTrigger>
                {group.isAdmin && (
                  <TabsTrigger value="settings">Настройки</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="discussion" className="p-4">
                <GroupChat groupId={group.id} />
              </TabsContent>
              
              <TabsContent value="members" className="p-4">
                <GroupMembers groupId={group.id} isAdmin={group.isAdmin} />
              </TabsContent>
              
              {group.isAdmin && (
                <TabsContent value="settings" className="p-4">
                  <h2 className="text-xl font-bold mb-4">Настройки группы</h2>
                  <p className="text-gaming-text-secondary">
                    Настройки группы доступны только администраторам.
                  </p>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
