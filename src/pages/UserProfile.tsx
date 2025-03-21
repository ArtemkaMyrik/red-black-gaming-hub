
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileHeader from '../components/ProfileHeader';
import ProfileActivity from '../components/ProfileActivity';
import ProfileFriends from '../components/ProfileFriends';
import ProfileGroups from '../components/ProfileGroups';
import ProfileMessages from '../components/ProfileMessages';
import ProfileSettings from '../components/ProfileSettings';
import SocialNavbar from '../components/SocialNavbar';

// Интерфейсы для типов данных
interface UserProfileData {
  id: string;
  username: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  joinDate: string;
  friends: number;
  games: number;
  reviews: number;
}

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("activity");
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Прокрутка наверх при загрузке
    window.scrollTo(0, 0);
    
    // Имитация загрузки данных профиля с сервера
    setTimeout(() => {
      // Временные данные для демонстрации
      const mockProfile: UserProfileData = {
        id: id || '1',
        username: 'Геймер2077',
        avatar: 'https://i.pravatar.cc/300',
        coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
        bio: 'Заядлый геймер и любитель RPG. Прошел все части Fallout, The Elder Scrolls и The Witcher.',
        joinDate: '12.06.2022',
        friends: 45,
        games: 237,
        reviews: 28
      };
      
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Если данные загружаются
  if (loading) {
    return (
      <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center h-96">
              <div className="animate-pulse text-gaming-text-secondary">
                Загрузка профиля...
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Если профиль не найден
  if (!profile) {
    return (
      <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center h-96">
              <h2 className="text-2xl font-bold mb-4">Профиль не найден</h2>
              <p className="text-gaming-text-secondary">
                Запрашиваемый профиль не существует или был удален.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Шапка профиля */}
        <ProfileHeader profile={profile} />
        
        {/* Социальная навигация */}
        <div className="container mx-auto px-4 md:px-6">
          <SocialNavbar />
        </div>
        
        {/* Вкладки профиля */}
        <div className="container mx-auto px-4 md:px-6 mt-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-white/10 mb-6">
              <TabsList className="bg-transparent h-auto p-0 justify-start">
                <TabsTrigger 
                  value="activity" 
                  className="px-6 py-3 border-b-2 border-transparent data-[state=active]:border-gaming-red rounded-none bg-transparent"
                >
                  Активность
                </TabsTrigger>
                <TabsTrigger 
                  value="friends" 
                  className="px-6 py-3 border-b-2 border-transparent data-[state=active]:border-gaming-red rounded-none bg-transparent"
                >
                  Друзья
                </TabsTrigger>
                <TabsTrigger 
                  value="groups" 
                  className="px-6 py-3 border-b-2 border-transparent data-[state=active]:border-gaming-red rounded-none bg-transparent"
                >
                  Группы
                </TabsTrigger>
                <TabsTrigger 
                  value="messages" 
                  className="px-6 py-3 border-b-2 border-transparent data-[state=active]:border-gaming-red rounded-none bg-transparent"
                >
                  Сообщения
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="px-6 py-3 border-b-2 border-transparent data-[state=active]:border-gaming-red rounded-none bg-transparent"
                >
                  Настройки
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="activity" className="mt-0">
              <ProfileActivity userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="friends" className="mt-0">
              <ProfileFriends userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="groups" className="mt-0">
              <ProfileGroups userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="messages" className="mt-0">
              <ProfileMessages userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <ProfileSettings userId={profile.id} profile={profile} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
