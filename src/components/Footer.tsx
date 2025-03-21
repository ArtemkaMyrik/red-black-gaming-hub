import { Link } from 'react-router-dom';
import { Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gaming-card-bg border-t border-white/10 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Колонка 1 - О сайте */}
          <div>
            <h3 className="text-lg font-bold mb-3">Game<span className="text-gaming-red">Verse</span></h3>
            <p className="text-sm text-gaming-text-secondary mb-4">
              Ваш проводник в мире видеоигр. Обзоры, новости, общение с единомышленниками.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gaming-text-secondary hover:text-gaming-red">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gaming-text-secondary hover:text-gaming-red">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gaming-text-secondary hover:text-gaming-red">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-gaming-text-secondary hover:text-gaming-red">
                <Twitch className="h-5 w-5" />
                <span className="sr-only">Twitch</span>
              </a>
            </div>
          </div>
          
          {/* Колонка 2 - Разделы */}
          <div>
            <h3 className="text-lg font-bold mb-3">Разделы</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/games" className="text-gaming-text-secondary hover:text-gaming-red">
                  Игры
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gaming-text-secondary hover:text-gaming-red">
                  Блог
                </Link>
              </li>
              <li>
                <Link to="/groups" className="text-gaming-text-secondary hover:text-gaming-red">
                  Группы
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Колонка 3 - Информация */}
          <div>
            <h3 className="text-lg font-bold mb-3">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gaming-text-secondary hover:text-gaming-red">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gaming-text-secondary hover:text-gaming-red">
                  Правила пользования
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gaming-text-secondary hover:text-gaming-red">
                  Техническая поддержка
                </Link>
              </li>
              <li>
                <a href="#" className="text-gaming-text-secondary hover:text-gaming-red">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-xs text-gaming-text-secondary">
          <p>© 2023-2024 GameVerse. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
