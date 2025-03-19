
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';
import BlogComments from '../components/BlogComments';

// Имитация данных статьи
const BLOG_ARTICLE = {
  id: 1,
  title: 'Эволюция дизайна открытого мира в играх',
  content: `
    <p>За последние два десятилетия дизайн открытых миров в играх претерпел значительные изменения. От простых песочниц с несколькими активностями до невероятно детализированных живых миров, геймдизайнеры постоянно расширяют границы возможного.</p>
    
    <h2>Ранние открытые миры</h2>
    <p>Когда GTA III вышла в 2001 году, она произвела настоящую революцию. Впервые игрокам предоставили трехмерный открытый мир, в котором можно было свободно перемещаться и взаимодействовать с окружением. Несмотря на технические ограничения того времени, игра установила основные принципы дизайна открытого мира, которые используются до сих пор.</p>
    
    <p>Последующие игры, такие как The Elder Scrolls III: Morrowind и Gothic, развили концепцию, добавив больше интерактивности и нелинейности. Однако большинство этих миров все еще служили просто фоном для заранее прописанных миссий.</p>
    
    <h2>Новый уровень иммерсивности</h2>
    <p>С выходом игр вроде The Elder Scrolls V: Skyrim и GTA V, открытые миры стали намного более живыми и реагирующими на действия игрока. NPC получили распорядок дня, появились динамические события и случайные встречи, благодаря чему миры стали казаться по-настоящему обитаемыми.</p>
    
    <p>The Witcher 3: Wild Hunt поднял планку еще выше, предложив невероятно детализированный мир, наполненный запоминающимися персонажами и историями. Каждый уголок игры был тщательно проработан, создавая ощущение, что этот мир существовал задолго до появления в нем игрока.</p>
    
    <h2>Революция органичности</h2>
    <p>The Legend of Zelda: Breath of the Wild произвела настоящую революцию в дизайне открытого мира, когда вышла в 2017 году. Вместо заполнения карты значками и заданиями, разработчики создали мир, основанный на органичном исследовании. Игроки могли увидеть интересную локацию вдалеке и просто отправиться туда, будучи уверенными, что их ждет какое-то открытие.</p>
    
    <p>Системы игры были спроектированы таким образом, чтобы поощрять экспериментирование и творческий подход к решению проблем. Это создало ощущение настоящей свободы и приключения, которого не хватало многим предыдущим играм с открытым миром.</p>
    
    <h2>Современные тенденции</h2>
    <p>Сегодня мы видим, как разработчики экспериментируют с разными подходами к созданию открытых миров. Red Dead Redemption 2 делает акцент на реализме и детализации, создавая невероятно правдоподобную среду. Elden Ring сочетает свободу исследования из Breath of the Wild с фирменной сложностью FromSoftware, создавая уникальный опыт открытого мира.</p>
    
    <p>Будущее дизайна открытых миров выглядит многообещающим. С развитием технологий, особенно процедурной генерации и искусственного интеллекта, мы, вероятно, увидим еще более живые, динамичные и реагирующие на действия игрока миры.</p>
  `,
  imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1770&auto=format&fit=crop',
  author: 'Алексей Чен',
  authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  date: '18 апреля 2023',
  commentsCount: 42,
  category: 'Обзоры',
  tags: ['Открытый мир', 'Геймдизайн', 'Breath of the Wild', 'Skyrim', 'GTA'],
  rating: 4.8
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(BLOG_ARTICLE);
  
  // В реальном приложении здесь был бы запрос к API
  useEffect(() => {
    // Имитация загрузки статьи по ID
    setArticle(BLOG_ARTICLE);
    
    // Прокрутка к началу страницы при загрузке
    window.scrollTo(0, 0);
  }, [id]);
  
  // Если статья не найдена
  if (!article) {
    return (
      <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
              <Link to="/blog" className="text-gaming-red hover:underline">
                Вернуться к списку статей
              </Link>
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Навигация назад */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gaming-text-secondary hover:text-gaming-red mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Вернуться к блогу
          </Link>
          
          {/* Заголовок статьи */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          
          {/* Мета-информация */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gaming-text-secondary mb-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {article.date}
            </div>
            
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              {article.author}
            </div>
            
            <div className="flex items-center">
              <Tag size={16} className="mr-1" />
              {article.category}
            </div>
            
            <div className="flex items-center">
              <div className="flex mr-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(article.rating) ? "text-gaming-red fill-gaming-red" : "text-gaming-text-secondary"}
                  />
                ))}
              </div>
              <span>{article.rating.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Обложка статьи */}
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Содержимое статьи */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-invert prose-gaming max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Теги */}
            <div className="mt-8">
              <h3 className="text-sm text-gaming-text-secondary mb-2">Теги:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-block bg-gaming-card-bg text-gaming-text-secondary text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Информация об авторе */}
            <div className="mt-8 p-6 bg-gaming-card-bg rounded-lg border border-white/5">
              <div className="flex items-start gap-4">
                {article.authorAvatar ? (
                  <img 
                    src={article.authorAvatar} 
                    alt={article.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gaming-dark-accent rounded-full flex items-center justify-center text-lg font-bold">
                    {article.author.substring(0, 2).toUpperCase()}
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium">{article.author}</h3>
                  <p className="text-sm text-gaming-text-secondary mt-1">
                    Автор статей о геймдизайне и игровой индустрии
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-12 bg-white/5" />
            
            {/* Секция комментариев */}
            <BlogComments articleId={Number(id)} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
