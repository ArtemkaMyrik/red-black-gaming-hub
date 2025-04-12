
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserCog, Shield, Ban, User, BadgeCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data with properly typed role
const mockUsers = [
  { 
    id: 1, 
    username: 'Игроман2000', 
    email: 'gamer2000@example.com',
    role: 'user' as const,
    joinDate: '15.04.2023'
  },
  { 
    id: 2, 
    username: 'ProGamer', 
    email: 'progamer@example.com',
    role: 'moderator' as const,
    joinDate: '10.01.2023'
  },
  { 
    id: 3, 
    username: 'GameReporter', 
    email: 'reporter@example.com',
    role: 'admin' as const,
    joinDate: '05.12.2022'
  },
  { 
    id: 4, 
    username: 'ToxicPlayer', 
    email: 'toxic@example.com',
    role: 'user' as const,
    joinDate: '20.07.2023'
  },
];

interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  joinDate: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const banUser = (id: number) => {
    if (window.confirm('Вы уверены, что хотите заблокировать этого пользователя?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('Пользователь заблокирован');
    }
  };
  
  const changeRole = (id: number, newRole: 'user' | 'moderator' | 'admin') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    toast.success(`Роль пользователя изменена на ${
      newRole === 'user' ? 'Пользователь' : 
      newRole === 'moderator' ? 'Модератор' : 'Администратор'
    }`);
    setIsUserDialogOpen(false);
  };
  
  const viewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };
  
  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Управление пользователями</h2>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gaming-text-secondary" size={18} />
          <Input
            placeholder="Поиск пользователей..."
            className="pl-8 bg-gaming-dark border-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border border-white/10 overflow-hidden">
        <Table className="min-w-full bg-gaming-dark">
          <TableHeader>
            <TableRow className="bg-gaming-dark-accent hover:bg-gaming-dark-accent">
              <TableHead>Пользователь</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead className="hidden md:table-cell">Дата регистрации</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gaming-dark-accent">
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' 
                        ? 'bg-purple-900/30 text-purple-400' 
                        : user.role === 'moderator'
                        ? 'bg-blue-900/30 text-blue-400'
                        : 'bg-slate-900/30 text-slate-400'
                    }`}>
                      {user.role === 'admin' && <Shield size={12} />}
                      {user.role === 'moderator' && <BadgeCheck size={12} />}
                      {user.role === 'user' && <User size={12} />}
                      {user.role === 'admin' 
                        ? 'Администратор' 
                        : user.role === 'moderator'
                        ? 'Модератор'
                        : 'Пользователь'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => viewUser(user)}
                        className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                      >
                        <UserCog size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => banUser(user.id)}
                        className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-red-500"
                      >
                        <Ban size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="bg-gaming-card-bg border-white/10">
          <DialogHeader>
            <DialogTitle>Управление пользователем</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Имя пользователя</h3>
                  <p>{selectedUser.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Email</h3>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gaming-text-secondary">Дата регистрации</h3>
                  <p>{selectedUser.joinDate}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gaming-text-secondary mb-2">Роль</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => changeRole(selectedUser.id, 'user')}
                    variant={selectedUser.role === 'user' ? 'default' : 'outline'}
                    className={selectedUser.role === 'user' 
                      ? 'bg-slate-600' 
                      : 'border-white/10 hover:bg-slate-700'}
                  >
                    <User size={16} className="mr-2" />
                    Пользователь
                  </Button>
                  <Button
                    onClick={() => changeRole(selectedUser.id, 'moderator')}
                    variant={selectedUser.role === 'moderator' ? 'default' : 'outline'}
                    className={selectedUser.role === 'moderator' 
                      ? 'bg-blue-600' 
                      : 'border-white/10 hover:bg-blue-700'}
                  >
                    <BadgeCheck size={16} className="mr-2" />
                    Модератор
                  </Button>
                  <Button
                    onClick={() => changeRole(selectedUser.id, 'admin')}
                    variant={selectedUser.role === 'admin' ? 'default' : 'outline'}
                    className={selectedUser.role === 'admin' 
                      ? 'bg-purple-600' 
                      : 'border-white/10 hover:bg-purple-700'}
                  >
                    <Shield size={16} className="mr-2" />
                    Администратор
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  onClick={() => {
                    banUser(selectedUser.id);
                    setIsUserDialogOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Ban size={16} className="mr-2" />
                  Удалить
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsUserDialogOpen(false)}
                  className="border-white/10"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
