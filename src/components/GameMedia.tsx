
import { useState } from 'react';
import { Image, Play, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Video {
  thumbnail: string;
  url: string;
}

interface GameMediaProps {
  screenshots: string[];
  videos: Video[];
}

const GameMedia = ({ screenshots, videos }: GameMediaProps) => {
  const [activeTab, setActiveTab] = useState('screenshots');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  
  const openLightbox = (media: string, video = false) => {
    setCurrentMedia(media);
    setIsVideo(video);
    setLightboxOpen(true);
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    // Восстанавливаем прокрутку страницы
    document.body.style.overflow = 'auto';
  };
  
  // Получаем ID видео YouTube из URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  return (
    <>
      <div className="bg-gaming-card-bg rounded-md border border-white/5 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gaming-dark border border-white/5 h-auto p-1 mb-6">
            <TabsTrigger 
              value="screenshots" 
              className="data-[state=active]:bg-gaming-red data-[state=active]:text-white"
            >
              <Image size={16} className="mr-2" />
              Скриншоты ({screenshots.length})
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="data-[state=active]:bg-gaming-red data-[state=active]:text-white"
            >
              <Play size={16} className="mr-2" />
              Видео ({videos.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="screenshots" className="mt-0">
            {screenshots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {screenshots.map((screenshot, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer aspect-video bg-gaming-dark rounded-md overflow-hidden"
                    onClick={() => openLightbox(screenshot)}
                  >
                    <img 
                      src={screenshot}
                      alt={`Скриншот ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Image size={24} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gaming-text-secondary">
                <p>Скриншоты отсутствуют.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer aspect-video bg-gaming-dark rounded-md overflow-hidden"
                    onClick={() => openLightbox(video.url, true)}
                  >
                    <img 
                      src={video.thumbnail}
                      alt={`Видео ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gaming-red/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gaming-text-secondary">
                <p>Видео отсутствуют.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Лайтбокс */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 p-2 bg-gaming-dark-accent rounded-full"
            onClick={closeLightbox}
          >
            <X size={24} className="text-white" />
          </button>
          
          <div 
            className={cn(
              "max-w-4xl w-full max-h-[90vh]",
              !isVideo && "overflow-auto"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYoutubeId(currentMedia)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={currentMedia}
                alt="Полноразмерное изображение"
                className="max-w-full max-h-[90vh] mx-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameMedia;
