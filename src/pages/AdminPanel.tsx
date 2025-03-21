
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminGames from '../components/admin/AdminGames';
import AdminReviews from '../components/admin/AdminReviews';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminUsers from '../components/admin/AdminUsers';
import AdminLogin from '../components/admin/AdminLogin';
import { Shield } from 'lucide-react';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('games');

  // Mock login - in a real app, this would verify credentials against a backend
  const handleLogin = (credentials: { username: string; password: string }) => {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Неверные учетные данные');
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-gaming-red" size={28} />
            <h1 className="text-2xl font-bold">Панель администратора</h1>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gaming-dark-accent mb-6 w-full grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="games" className="data-[state=active]:bg-gaming-red">
                Игры
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-gaming-red">
                Отзывы
              </TabsTrigger>
              <TabsTrigger value="blogs" className="data-[state=active]:bg-gaming-red">
                Блоги
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-gaming-red">
                Пользователи
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="games">
              <AdminGames />
            </TabsContent>
            
            <TabsContent value="reviews">
              <AdminReviews />
            </TabsContent>
            
            <TabsContent value="blogs">
              <AdminBlogs />
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUsers />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
