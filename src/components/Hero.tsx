
import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077: Phantom Liberty',
    description: 'Dive into the new expansion with enhanced gameplay and story',
    imageUrl: 'https://images.unsplash.com/photo-1627327719562-f1f61e8364fb?q=80&w=2070&auto=format&fit=crop',
    link: '/games/cyberpunk-2077'
  },
  {
    id: 2,
    title: 'Starfield',
    description: 'Explore the vastness of space in Bethesda\'s latest RPG',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop',
    link: '/games/starfield'
  },
  {
    id: 3,
    title: 'Elden Ring DLC',
    description: 'Shadow of the Erdtree expansion coming soon',
    imageUrl: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1770&auto=format&fit=crop',
    link: '/games/elden-ring'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gaming-dark/30 via-gaming-dark/60 to-gaming-dark z-10"></div>
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 h-full flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-2xl space-y-4 animate-fade-up">
          <div className="inline-block px-3 py-1 bg-gaming-red rounded-sm text-sm font-medium tracking-wider">
            FEATURED
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white text-shadow leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-lg">
            {slides[currentSlide].description}
          </p>
          <div className="pt-4">
            <a 
              href={slides[currentSlide].link}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gaming-red hover:bg-gaming-red-hover text-white font-medium rounded-sm transition-all duration-200 ease-in-out"
            >
              Learn More
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex gap-2">
        <button 
          onClick={goToPrevSlide}
          className="p-2 bg-black/30 backdrop-blur-sm hover:bg-gaming-red/80 text-white rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={goToNextSlide}
          className="p-2 bg-black/30 backdrop-blur-sm hover:bg-gaming-red/80 text-white rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ArrowRight size={24} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-gaming-red"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
