import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Building, Mail, Github } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">О нас</h1>
            
            <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
              <p className="text-gaming-text-secondary mb-6">
                Игровой портал GameVerse был создан энтузиастами гейминга для объединения игрового сообщества. 
                Наша цель — создать пространство, где геймеры могут делиться опытом, находить единомышленников 
                и быть в курсе последних новостей игровой индустрии.
              </p>
              
              <div className="flex items-center mb-4">
                <Building className="mr-3 text-gaming-red" size={24} />
                <h3 className="text-xl font-bold">История создания</h3>
              </div>
              <p className="text-gaming-text-secondary mb-6">
                Проект был запущен в 2023 году группой друзей, объединенных любовью к видеоиграм. 
                Мы начинали как небольшой блог, но быстро выросли в полноценную социальную платформу 
                благодаря поддержке нашего сообщества.
              </p>
            </div>
            
            <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Наша команда</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gaming-dark-accent rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Алексей Петров</h3>
                  <p className="text-sm text-gaming-text-secondary mb-2">Основатель и руководитель проекта</p>
                  <p className="text-gaming-text-secondary">
                    Опытный геймер с 15-летним стажем, увлекается RPG и стратегиями. 
                    Имеет опыт работы в геймдеве и организации киберспортивных турниров.
                  </p>
                </div>
                
                <div className="bg-gaming-dark-accent rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Мария Иванова</h3>
                  <p className="text-sm text-gaming-text-secondary mb-2">Главный редактор</p>
                  <p className="text-gaming-text-secondary">
                    Журналист с опытом работы в игровых изданиях. Отвечает за создание контента, 
                    редактирование статей и поддержание высокого качества материалов.
                  </p>
                </div>
                
                <div className="bg-gaming-dark-accent rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Дмитрий Сидоров</h3>
                  <p className="text-sm text-gaming-text-secondary mb-2">Технический директор</p>
                  <p className="text-gaming-text-secondary">
                    Разработчик с 7-летним опытом. Отвечает за техническую сторону проекта, 
                    разработку новых функций и поддержание работоспособности платформы.
                  </p>
                </div>
                
                <div className="bg-gaming-dark-accent rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Ольга Смирнова</h3>
                  <p className="text-sm text-gaming-text-secondary mb-2">Комьюнити-менеджер</p>
                  <p className="text-gaming-text-secondary">
                    Модерирует сообщества, организует мероприятия и турниры, помогает новым 
                    пользователям освоиться на платформе.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Связаться с нами</h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <a 
                  href="mailto:info@gameverse.ru" 
                  className="flex items-center bg-gaming-dark-accent rounded-lg p-4 hover:bg-gaming-red transition-colors"
                >
                  <Mail className="mr-3" size={20} />
                  <span>info@gameverse.ru</span>
                </a>
                
                <a 
                  href="https://github.com/gameverse" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center bg-gaming-dark-accent rounded-lg p-4 hover:bg-gaming-red transition-colors"
                >
                  <Github className="mr-3" size={20} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
