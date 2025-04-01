
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, HelpCircle, Bell } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import Messages from './Messages';

const MobileNavLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) => (
  <Button asChild variant="ghost" className="w-full justify-start" onClick={onClick}>
    <Link to={to}>{children}</Link>
  </Button>
);

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Временное состояние для демонстрации
  
  const handleLogout = () => {
    // В реальном проекте здесь будет логика выхода из аккаунта
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-gaming-dark/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl">
            Game<span className="text-gaming-red">Verse</span>
          </Link>

          {/* Global Search */}
          <div className="hidden md:block flex-1 max-w-xl px-6">
            <GlobalSearch />
          </div>

          {/* Menu Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Button asChild variant="ghost">
              <Link to="/games">Игры</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/blog">Блог</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/groups">Группы</Link>
            </Button>
            
            {/* Messages */}
            <Messages />
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gaming-red text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            
            {/* About and Support Links */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <HelpCircle size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gaming-card-bg border-white/10">
                <DropdownMenuItem asChild>
                  <Link to="/about" className="cursor-pointer">О нас</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/terms" className="cursor-pointer">Правила</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/support" className="cursor-pointer">Поддержка</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Profile / Auth Links */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
                      <AvatarFallback className="bg-gaming-dark-accent">U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gaming-card-bg border-white/10">
                  <DropdownMenuItem asChild>
                    <Link to="/profile/123" className="cursor-pointer">Мой профиль</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/123?tab=settings" className="cursor-pointer">Настройки</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer text-gaming-red" onClick={handleLogout}>
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-gaming-red hover:bg-gaming-red/90">
                <Link to="/sign-in">Войти</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden px-4 py-3 space-y-3 bg-gaming-dark border-t border-white/10">
          <div className="mb-3">
            <GlobalSearch />
          </div>
          
          <MobileNavLink to="/games" onClick={() => setShowMobileMenu(false)}>
            Игры
          </MobileNavLink>
          <MobileNavLink to="/blog" onClick={() => setShowMobileMenu(false)}>
            Блог
          </MobileNavLink>
          <MobileNavLink to="/groups" onClick={() => setShowMobileMenu(false)}>
            Группы
          </MobileNavLink>
          
          {isLoggedIn ? (
            <>
              <MobileNavLink to="/profile/123" onClick={() => setShowMobileMenu(false)}>
                Мой профиль
              </MobileNavLink>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gaming-red" 
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <MobileNavLink to="/sign-in" onClick={() => setShowMobileMenu(false)}>
                Войти
              </MobileNavLink>
              <MobileNavLink to="/sign-up" onClick={() => setShowMobileMenu(false)}>
                Регистрация
              </MobileNavLink>
            </>
          )}
          
          <MobileNavLink to="/about" onClick={() => setShowMobileMenu(false)}>
            О нас
          </MobileNavLink>
          <MobileNavLink to="/terms" onClick={() => setShowMobileMenu(false)}>
            Правила пользования
          </MobileNavLink>
          <MobileNavLink to="/support" onClick={() => setShowMobileMenu(false)}>
            Техническая поддержка
          </MobileNavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
