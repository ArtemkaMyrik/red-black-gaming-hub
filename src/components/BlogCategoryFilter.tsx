
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BlogCategory } from '../pages/Blog';

const categories: BlogCategory[] = ['Все', 'Новости', 'Обзоры', 'Гайды', 'Советы', 'Индустрия'];

interface BlogCategoryFilterProps {
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
}

const BlogCategoryFilter = ({ activeCategory, onCategoryChange }: BlogCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
      {categories.map(category => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={cn(
            "border-white/10 hover:bg-gaming-card-bg hover:text-white",
            activeCategory === category
              ? "bg-gaming-red text-white border-gaming-red hover:bg-gaming-red/90 hover:text-white"
              : "bg-gaming-card-bg text-gaming-text-secondary"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default BlogCategoryFilter;
