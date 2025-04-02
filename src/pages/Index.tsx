
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TopGames from '../components/TopGames';
import RecentReviews from '../components/RecentReviews';
import PopularBlogs from '../components/PopularBlogs';
import ReleaseCalendar from '../components/ReleaseCalendar';
import GameRecommendations from '../components/GameRecommendations';
import Footer from '../components/Footer';

const Index = () => {
  // Прокрутка вверх при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <TopGames />
        <RecentReviews />
        <PopularBlogs />
        <ReleaseCalendar />
        <GameRecommendations />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
