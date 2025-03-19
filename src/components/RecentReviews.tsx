
import { ChevronRight } from 'lucide-react';
import ReviewCard from './ReviewCard';

const recentReviews = [
  {
    id: 1,
    username: 'GamerX42',
    gameTitle: 'Baldur\'s Gate 3',
    gameImage: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=1674&auto=format&fit=crop',
    rating: 9.5,
    text: 'An incredible RPG that sets a new standard for the genre. The depth of choices and consequences is unmatched, and the combat system is both tactical and engaging. Every character is well written with their own motivations and personalities.',
    date: 'Apr 15, 2023',
    likes: 124
  },
  {
    id: 2,
    username: 'EldenLord',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
    gameTitle: 'Elden Ring',
    gameImage: 'https://images.unsplash.com/photo-1616872380668-d53a7d7e1671?q=80&w=1770&auto=format&fit=crop',
    rating: 9.3,
    text: 'FromSoftware has outdone themselves again. The open world design allows for incredible exploration, while maintaining the challenging combat the studio is known for. The lore is deep and fascinating.',
    date: 'Apr 12, 2023',
    likes: 98
  },
  {
    id: 3,
    username: 'SpiderFan99',
    gameTitle: 'Spider-Man 2',
    gameImage: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=1770&auto=format&fit=crop',
    rating: 8.8,
    text: 'The web-swinging mechanics are better than ever, and having both Peter and Miles as playable characters adds great variety to the gameplay. Story is emotional and visuals are stunning.',
    date: 'Apr 10, 2023',
    likes: 76
  }
];

const RecentReviews = () => {
  return (
    <section className="py-16 bg-gaming-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-glow opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Recent Reviews</h2>
            <p className="text-gaming-text-secondary mt-2">
              Fresh perspectives from our gaming community
            </p>
          </div>
          
          <a 
            href="/reviews"
            className="mt-4 md:mt-0 inline-flex items-center text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
          >
            View All Reviews
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReviews.map((review) => (
            <ReviewCard
              key={review.id}
              {...review}
              className="backdrop-blur-sm bg-opacity-80 hover:translate-y-[-5px] transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentReviews;
