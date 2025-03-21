
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, ShieldCheck, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Правила пользования</h1>
            
            <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <FileText className="mr-3 text-gaming-red" size={24} />
                <h2 className="text-2xl font-bold">Общие положения</h2>
              </div>
              
              <div className="space-y-4 text-gaming-text-secondary">
                <p>
                  Добро пожаловать на GameVerse! Используя наш сайт, вы соглашаетесь соблюдать настоящие правила. 
                  Пожалуйста, внимательно ознакомьтесь с ними перед началом использования платформы.
                </p>
                <p>
                  Администрация сайта оставляет за собой право изменять правила пользования без предварительного уведомления.
                  Регулярно проверяйте эту страницу, чтобы быть в курсе актуальных правил.
                </p>
              </div>
            </div>
            
            <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <ShieldCheck className="mr-3 text-gaming-red" size={24} />
                <h2 className="text-2xl font-bold">Правила поведения</h2>
              </div>
              
              <div className="space-y-4 text-gaming-text-secondary">
                <h3 className="text-lg font-semibold">1. Уважение к другим пользователям</h3>
                <p>
                  • Запрещены оскорбления, унижение, угрозы или любые формы дискриминации.
                </p>
                <p>
                  • Запрещен спам, флуд и многократные публикации одинакового контента.
                </p>
                <p>
                  • Не разжигайте конфликты и не провоцируйте других пользователей.
                </p>
                
                <h3 className="text-lg font-semibold">2. Контент</h3>
                <p>
                  • Запрещено размещение контента для взрослых, шокирующих материалов или нелегального контента.
                </p>
                <p>
                  • Соблюдайте авторские права. Не публикуйте материалы, на которые у вас нет прав.
                </p>
                <p>
                  • Не размещайте личную информацию других пользователей без их согласия.
                </p>
                
                <h3 className="text-lg font-semibold">3. Учетные записи</h3>
                <p>
                  • Запрещено создание нескольких учетных записей для обхода правил или блокировок.
                </p>
                <p>
                  • Не используйте имена, вводящие в заблуждение или имитирующие других пользователей.
                </p>
                <p>
                  • Владелец учетной записи несет ответственность за все действия, совершенные под его логином.
                </p>
              </div>
            </div>
            
            <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="mr-3 text-gaming-red" size={24} />
                <h2 className="text-2xl font-bold">Нарушения и санкции</h2>
              </div>
              
              <div className="space-y-4 text-gaming-text-secondary">
                <p>
                  За нарушение правил пользования могут быть применены следующие санкции:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Предупреждение</li>
                  <li>Временное ограничение функций (публикации, комментирования)</li>
                  <li>Временная блокировка учетной записи</li>
                  <li>Постоянная блокировка учетной записи в случае серьезных или повторных нарушений</li>
                </ul>
                
                <p className="mt-4">
                  Администрация сайта оставляет за собой право принимать решения о применении санкций на свое усмотрение.
                  Если вы считаете, что санкции были применены несправедливо, вы можете обратиться в службу поддержки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
