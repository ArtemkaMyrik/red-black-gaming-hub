
import { Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  authorAvatar?: string;
  date: string;
  commentsCount: number;
  category: string;
  className?: string;
}

const BlogCard = ({
  id,
  title,
  excerpt,
  imageUrl,
  author,
  authorAvatar,
  date,
  commentsCount,
  category,
  className
}: BlogCardProps) => {
  return (
    <div 
      className={cn(
        "group bg-gaming-card-bg rounded-md overflow-hidden border border-white/5 transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-4 left-4 bg-gaming-red/90 text-white text-xs font-medium px-2 py-1 rounded">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-gaming-red transition-colors">
          {title}
        </h3>
        
        <p className="mt-2 text-sm text-gaming-text-secondary line-clamp-2">
          {excerpt}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {authorAvatar ? (
              <img 
                src={authorAvatar} 
                alt={author}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gaming-dark-accent rounded-full flex items-center justify-center text-xs font-bold">
                {author.substring(0, 2).toUpperCase()}
              </div>
            )}
            
            <div>
              <p className="text-xs font-medium">{author}</p>
              <div className="flex items-center text-xs text-gaming-text-secondary mt-0.5">
                <Calendar size={10} className="mr-1" />
                {date}
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-gaming-text-secondary">
            <MessageSquare size={12} className="mr-1" />
            {commentsCount}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
          <a 
            href={`/blog/${id}`}
            className="inline-flex items-center gap-1 text-sm text-gaming-text-secondary group-hover:text-gaming-red transition-colors"
          >
            Read Article
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
