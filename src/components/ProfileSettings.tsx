
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  User, Lock, Eye, BellRing, PencilLine, 
  ShieldAlert, Save, Trash2, AlertTriangle, X
} from 'lucide-react';

interface ProfileSettingsProps {
  userId: string;
  profile: {
    id: string;
    username: string;
    avatar?: string;
    coverImage?: string;
    bio?: string;
    joinDate: string;
  };
}

const ProfileSettings = ({ userId, profile }: ProfileSettingsProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: profile.username,
    bio: profile.bio || '',
    email: 'user@example.com', // В реальном приложении должно загружаться с сервера
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifyComments: true,
    notifyMessages: true,
    notifyFriends: true,
    profileVisibility: 'public',
    messagePermission: 'friends'
  });
  
  const [avatar, setAvatar] = useState<string | undefined>(profile.avatar);
  const [coverImage, setCoverImage] = useState<string | undefined>(profile.coverImage);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    toast.success('Профиль успешно обновлен');
  };
  
  const handleSavePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      toast.error('Пароль должен содержать минимум 8 символов');
      return;
    }
    
    toast.success('Пароль успешно изменен');
    setFormData(prev => ({
      ...prev,
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };
  
  const handleSaveNotifications = () => {
    toast.success('Настройки уведомлений сохранены');
  };
  
  const handleSavePrivacy = () => {
    toast.success('Настройки приватности сохранены');
  };
  
  const handleDeleteAccount = () => {
    toast.error('Функция удаления аккаунта временно недоступна');
  };

  const handleChangeAvatar = () => {
    // В реальном приложении здесь была бы загрузка аватара
    const randomAvatarId = Math.floor(Math.random() * 100);
    setAvatar(`https://i.pravatar.cc/300?img=${randomAvatarId}`);
    toast.success('Аватар успешно изменен');
  };
  
  const handleDeleteAvatar = () => {
    setAvatar(undefined);
    toast.success('Аватар успешно удален');
  };
  
  const handleChangeCover = () => {
    // В реальном приложении здесь была бы загрузка фона
    setCoverImage('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071');
    toast.success('Фон профиля успешно изменен');
  };
  
  const handleDeleteCover = () => {
    setCoverImage(undefined);
    toast.success('Фон профиля успешно удален');
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Настройки профиля</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden md:inline">Профиль</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock size={16} />
            <span className="hidden md:inline">Безопасность</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing size={16} />
            <span className="hidden md:inline">Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Eye size={16} />
            <span className="hidden md:inline">Приватность</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Настройки профиля */}
        <TabsContent value="profile" className="mt-0">
          <Card className="bg-gaming-card-bg border-white/10">
            <CardHeader>
              <CardTitle>Информация профиля</CardTitle>
              <CardDescription>
                Обновите свои личные данные и биографию
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-white/10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Расскажите о себе и своих игровых предпочтениях"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="min-h-32 bg-gaming-dark border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="block mb-2">Аватар</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded overflow-hidden bg-gaming-dark-accent">
                    {avatar ? (
                      <img src={avatar} alt="Аватар" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gaming-text-secondary">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button variant="outline" onClick={handleChangeAvatar} className="border-white/10">
                      <PencilLine size={16} className="mr-2" />
                      Изменить аватар
                    </Button>
                    {avatar && (
                      <Button variant="outline" onClick={handleDeleteAvatar} className="border-gaming-red/50 text-gaming-red hover:bg-gaming-red/10">
                        <X size={16} className="mr-2" />
                        Удалить аватар
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="block mb-2">Фон профиля</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-32 rounded overflow-hidden bg-gaming-dark-accent">
                    {coverImage ? (
                      <img src={coverImage} alt="Фон профиля" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gaming-text-secondary bg-gradient-to-r from-gaming-dark to-gaming-card-bg">
                        <PencilLine size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button variant="outline" onClick={handleChangeCover} className="border-white/10">
                      <PencilLine size={16} className="mr-2" />
                      Изменить фон
                    </Button>
                    {coverImage && (
                      <Button variant="outline" onClick={handleDeleteCover} className="border-gaming-red/50 text-gaming-red hover:bg-gaming-red/10">
                        <X size={16} className="mr-2" />
                        Удалить фон
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-gaming-red hover:bg-gaming-red-hover"
                onClick={handleSaveProfile}
              >
                <Save size={16} className="mr-2" />
                Сохранить изменения
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Настройки безопасности */}
        <TabsContent value="security" className="mt-0">
          <Card className="bg-gaming-card-bg border-white/10">
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>
                Управление паролем и безопасностью аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Смена пароля</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Текущий пароль</Label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-white/10"
                  />
                </div>
                
                <Button 
                  className="bg-gaming-red hover:bg-gaming-red-hover"
                  onClick={handleSavePassword}
                >
                  <Save size={16} className="mr-2" />
                  Изменить пароль
                </Button>
              </div>
              
              <Separator className="my-6 bg-white/10" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Удаление аккаунта</h3>
                <p className="text-sm text-gaming-text-secondary">
                  Удаление аккаунта приведет к полной потере всех данных, включая отзывы, комментарии и друзей.
                  Это действие необратимо.
                </p>
                
                <Button 
                  variant="outline" 
                  className="border-gaming-red/50 text-gaming-red hover:bg-gaming-red/10 hover:text-gaming-red"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 size={16} className="mr-2" />
                  Удалить аккаунт
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки уведомлений */}
        <TabsContent value="notifications" className="mt-0">
          <Card className="bg-gaming-card-bg border-white/10">
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Настройка предпочтений по уведомлениям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Комментарии к отзывам</h4>
                    <p className="text-sm text-gaming-text-secondary">
                      Получать уведомления о новых комментариях к вашим отзывам
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyComments"
                    name="notifyComments"
                    checked={formData.notifyComments}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 accent-gaming-red"
                  />
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Личные сообщения</h4>
                    <p className="text-sm text-gaming-text-secondary">
                      Получать уведомления о новых личных сообщениях
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyMessages"
                    name="notifyMessages"
                    checked={formData.notifyMessages}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 accent-gaming-red"
                  />
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Запросы в друзья</h4>
                    <p className="text-sm text-gaming-text-secondary">
                      Получать уведомления о новых запросах в друзья
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyFriends"
                    name="notifyFriends"
                    checked={formData.notifyFriends}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 accent-gaming-red"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-gaming-red hover:bg-gaming-red-hover"
                onClick={handleSaveNotifications}
              >
                <Save size={16} className="mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Настройки приватности */}
        <TabsContent value="privacy" className="mt-0">
          <Card className="bg-gaming-card-bg border-white/10">
            <CardHeader>
              <CardTitle>Приватность</CardTitle>
              <CardDescription>
                Управление видимостью вашего профиля и данных
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Видимость профиля</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="profilePublic"
                      name="profileVisibility"
                      checked={formData.profileVisibility === 'public'}
                      onChange={() => handleRadioChange('profileVisibility', 'public')}
                      className="mr-2 accent-gaming-red"
                    />
                    <Label htmlFor="profilePublic" className="cursor-pointer">
                      <span className="font-medium">Публичный</span>
                      <p className="text-sm text-gaming-text-secondary">
                        Ваш профиль могут видеть все пользователи
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="profileFriends"
                      name="profileVisibility"
                      checked={formData.profileVisibility === 'friends'}
                      onChange={() => handleRadioChange('profileVisibility', 'friends')}
                      className="mr-2 accent-gaming-red"
                    />
                    <Label htmlFor="profileFriends" className="cursor-pointer">
                      <span className="font-medium">Только друзья</span>
                      <p className="text-sm text-gaming-text-secondary">
                        Ваш профиль могут видеть только друзья
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="profilePrivate"
                      name="profileVisibility"
                      checked={formData.profileVisibility === 'private'}
                      onChange={() => handleRadioChange('profileVisibility', 'private')}
                      className="mr-2 accent-gaming-red"
                    />
                    <Label htmlFor="profilePrivate" className="cursor-pointer">
                      <span className="font-medium">Приватный</span>
                      <p className="text-sm text-gaming-text-secondary">
                        Ваш профиль скрыт от всех пользователей
                      </p>
                    </Label>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-3">
                <h3 className="font-medium">Личные сообщения</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="messageAll"
                      name="messagePermission"
                      checked={formData.messagePermission === 'all'}
                      onChange={() => handleRadioChange('messagePermission', 'all')}
                      className="mr-2 accent-gaming-red"
                    />
                    <Label htmlFor="messageAll" className="cursor-pointer">
                      <span className="font-medium">От всех</span>
                      <p className="text-sm text-gaming-text-secondary">
                        Любой пользователь может отправить вам сообщение
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="messageFriends"
                      name="messagePermission"
                      checked={formData.messagePermission === 'friends'}
                      onChange={() => handleRadioChange('messagePermission', 'friends')}
                      className="mr-2 accent-gaming-red"
                    />
                    <Label htmlFor="messageFriends" className="cursor-pointer">
                      <span className="font-medium">Только от друзей</span>
                      <p className="text-sm text-gaming-text-secondary">
                        Только друзья могут отправлять вам сообщения
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="messageNobody"
                      name="messagePermission"
                      checked={formData.messagePermission === 'nobody'}
                      onChange={() => handleRadioChange('messagePermission', 'nobody')}
                      className="mr-2 accent-gaming-red"
                    />
                    <Label htmlFor="messageNobody" className="cursor-pointer">
                      <span className="font-medium">Ни от кого</span>
                      <p className="text-sm text-gaming-text-secondary">
                        Никто не может отправлять вам сообщения
                      </p>
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gaming-dark-accent rounded-md border border-white/10 flex items-start gap-3">
                <ShieldAlert className="text-gaming-red" />
                <div>
                  <h4 className="font-medium mb-1">Важно о приватности</h4>
                  <p className="text-sm text-gaming-text-secondary">
                    Даже с самыми строгими настройками приватности, администраторы сайта имеют доступ 
                    к вашим данным для обеспечения безопасности и соблюдения правил сообщества.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-gaming-red hover:bg-gaming-red-hover"
                onClick={handleSavePrivacy}
              >
                <Save size={16} className="mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
