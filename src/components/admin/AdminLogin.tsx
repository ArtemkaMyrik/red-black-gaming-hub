
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary flex items-center justify-center">
      <Card className="w-full max-w-md bg-gaming-card-bg border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Shield className="text-gaming-red" size={40} />
          </div>
          <CardTitle className="text-2xl font-bold">Вход в панель администратора</CardTitle>
          <CardDescription className="text-gaming-text-secondary">
            Доступ ограничен только для администраторов и модераторов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Имя пользователя
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gaming-dark border-white/10"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Пароль
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gaming-dark border-white/10"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gaming-red hover:bg-gaming-red/90">
              <Lock className="mr-2" size={16} />
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
