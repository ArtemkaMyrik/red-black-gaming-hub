
import { ChevronRight } from 'lucide-react';
import BlogCard from './BlogCard';

const popularBlogs = [
  {
    id: 1,
    title: 'The Evolution of Open World Game Design',
    excerpt: 'From GTA to Breath of the Wild, how open world games have transformed over the decades...',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1770&auto=format&fit=crop',
    author: 'Alex Chen',
    date: 'Apr 18, 2023',
    commentsCount: 42,
    category: 'Game Design'
  },
  {
    id: 2,
    title: 'Are Subscription Services the Future of Gaming?',
    excerpt: 'Analyzing the impact of Xbox Game Pass, PS Plus, and other subscription models on the industry...',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1770&auto=format&fit=crop',
    author: 'Sarah Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1787&auto=format&fit=crop',
    date: 'Apr 15, 2023',
    commentsCount: 36,
    category: 'Industry'
  },
  {
    id: 3,
    title: 'The Art of Balancing Difficulty in Souls-like Games',
    excerpt: 'How FromSoftware and other developers create challenging yet fair gameplay experiences...',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1771&auto=format&fit=crop',
    author: 'Marcus Lee',
    date: 'Apr 12, 2023',
    commentsCount: 29,
    category: 'Game Design'
  },
  {
    id: 4,
    title: 'Indie Games That Defined the Last Decade',
    excerpt: 'From Minecraft to Hollow Knight, these indie titles changed gaming forever...',
    imageUrl: 'https://images.unsplash.com/photo-1517281749396-564b95a206c3?q=80&w=1769&auto=format&fit=crop',
    author: 'Jamie Kim',
    date: 'Apr 10, 2023',
    commentsCount: 24,
    category: 'Indie Games'
  }
];

const PopularBlogs = () => {
  return (
    <section className="py-16 bg-gaming-dark-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Popular Articles</h2>
            <p className="text-gaming-text-secondary mt-2">
              Deep dives into the world of gaming
            </p>
          </div>
          
          <a 
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors"
          >
            View All Articles
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              {...blog}
              className="hover:translate-y-[-5px] transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBlogs;
