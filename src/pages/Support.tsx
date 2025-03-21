
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HelpCircle, MessageSquare, Faq, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error('Пожалуйста, заполните все поля формы');
      return;
    }
    
    // В реальном проекте здесь был бы код для отправки данных на сервер
    toast.success('Ваше сообщение отправлено. Мы ответим вам в ближайшее время.');
    
    // Очистка формы
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Техническая поддержка</h1>
            
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="contact">Связаться с нами</TabsTrigger>
                <TabsTrigger value="faq">Часто задаваемые вопросы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <MessageSquare className="mr-3 text-gaming-red" size={24} />
                  <h2 className="text-2xl font-bold">Отправить обращение</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Ваше имя
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gaming-dark border-white/10"
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gaming-dark border-white/10"
                        placeholder="Введите ваш email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Тема обращения
                    </label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-gaming-dark border-white/10"
                      placeholder="Введите тему обращения"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Сообщение
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-gaming-dark border-white/10 min-h-[150px]"
                      placeholder="Опишите вашу проблему или вопрос подробно"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-gaming-red hover:bg-gaming-red-hover"
                    >
                      Отправить
                    </Button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center mb-4">
                    <Mail className="mr-3 text-gaming-red" size={24} />
                    <h3 className="text-xl font-bold">Другие способы связи</h3>
                  </div>
                  
                  <div className="text-gaming-text-secondary">
                    <p className="mb-2">Email: support@gameverse.ru</p>
                    <p>Время работы технической поддержки: Пн-Пт, с 10:00 до 19:00 (МСК)</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <Faq className="mr-3 text-gaming-red" size={24} />
                  <h2 className="text-2xl font-bold">FAQ</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Как зарегистрироваться на сайте?</AccordionTrigger>
                    <AccordionContent>
                      Для регистрации нажмите кнопку "Регистрация" в правом верхнем углу сайта. 
                      Заполните все необходимые поля в форме регистрации и подтвердите свой email, 
                      перейдя по ссылке из письма, которое придет на указанный адрес.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Как добавить игру в свою коллекцию?</AccordionTrigger>
                    <AccordionContent>
                      Перейдите на страницу игры, которую хотите добавить, и нажмите кнопку "Добавить в коллекцию". 
                      Вы можете просмотреть свою коллекцию в разделе "Мой профиль" → "Игры".
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Как написать отзыв на игру?</AccordionTrigger>
                    <AccordionContent>
                      Чтобы написать отзыв, перейдите на страницу игры и прокрутите до раздела "Отзывы". 
                      Нажмите кнопку "Написать отзыв", выберите оценку и напишите текст отзыва. 
                      Отзыв будет опубликован после модерации.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Как вступить в группу?</AccordionTrigger>
                    <AccordionContent>
                      Чтобы вступить в группу, перейдите на страницу группы через раздел "Группы". 
                      На странице группы нажмите кнопку "Вступить". Если группа закрытая, 
                      администраторам придет запрос на ваше вступление.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Как сменить пароль?</AccordionTrigger>
                    <AccordionContent>
                      Для смены пароля перейдите в "Мой профиль" → "Настройки" → "Безопасность". 
                      Введите текущий пароль, а затем дважды новый. Нажмите "Сохранить", 
                      чтобы подтвердить изменения.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Почему мой контент был удален?</AccordionTrigger>
                    <AccordionContent>
                      Контент может быть удален, если он нарушает правила пользования сайтом. 
                      Наиболее частые причины: оскорбления, спам, нарушение авторских прав, 
                      реклама без согласования. Если вы считаете, что ваш контент был удален 
                      несправедливо, обратитесь в техническую поддержку.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Как удалить свой аккаунт?</AccordionTrigger>
                    <AccordionContent>
                      Для удаления аккаунта перейдите в "Мой профиль" → "Настройки" → "Аккаунт" → "Удаление аккаунта". 
                      Обратите внимание, что это действие необратимо и приведет к удалению всех ваших данных, 
                      включая отзывы, комментарии и личные сообщения.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6 text-center text-gaming-text-secondary">
                  <p>Не нашли ответ на свой вопрос?</p>
                  <Button 
                    variant="outline" 
                    className="mt-3 border-white/10"
                    onClick={() => document.querySelector('[data-state="inactive"][data-value="contact"]')?.click()}
                  >
                    <HelpCircle className="mr-2" size={16} />
                    Связаться с поддержкой
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
