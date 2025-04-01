
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle, Trash2, Save, Image as ImageIcon, X } from "lucide-react";

// Валидационная схема для формы игры
const gameFormSchema = z.object({
  title: z.string().min(2, {
    message: "Название игры должно содержать как минимум 2 символа",
  }),
  description: z.string().min(10, {
    message: "Описание должно содержать как минимум 10 символов",
  }),
  releaseDate: z.string().min(1, {
    message: "Выберите дату релиза",
  }),
  developer: z.string().min(2, {
    message: "Укажите разработчика",
  }),
  publisher: z.string().min(2, {
    message: "Укажите издателя",
  }),
  genre: z.string().min(1, {
    message: "Выберите жанр",
  }),
  price: z.string().refine(val => !isNaN(Number(val)), {
    message: "Цена должна быть числом",
  }),
  platforms: z.array(z.string()).min(1, {
    message: "Выберите хотя бы одну платформу",
  }),
});

type GameFormValues = z.infer<typeof gameFormSchema>;

const platforms = [
  { id: "pc", label: "PC" },
  { id: "ps5", label: "PlayStation 5" },
  { id: "ps4", label: "PlayStation 4" },
  { id: "xbox-series", label: "Xbox Series X/S" },
  { id: "xbox-one", label: "Xbox One" },
  { id: "switch", label: "Nintendo Switch" },
];

const genres = [
  { value: "action", label: "Экшен" },
  { value: "adventure", label: "Приключения" },
  { value: "rpg", label: "RPG" },
  { value: "strategy", label: "Стратегия" },
  { value: "simulation", label: "Симулятор" },
  { value: "sports", label: "Спорт" },
  { value: "racing", label: "Гонки" },
  { value: "puzzle", label: "Головоломка" },
  { value: "fighting", label: "Файтинг" },
  { value: "shooter", label: "Шутер" },
];

interface GameImage {
  id: number;
  url: string;
  isCover: boolean;
}

const AdminGameForm = () => {
  const [images, setImages] = useState<GameImage[]>([
    { id: 1, url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070", isCover: true },
    { id: 2, url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070", isCover: false },
  ]);

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      title: "",
      description: "",
      releaseDate: "",
      developer: "",
      publisher: "",
      genre: "",
      price: "",
      platforms: [],
    },
  });

  const onSubmit = (values: GameFormValues) => {
    if (images.length === 0) {
      toast.error("Необходимо добавить хотя бы одно изображение");
      return;
    }

    if (!images.some(img => img.isCover)) {
      toast.error("Необходимо выбрать обложку игры");
      return;
    }

    // В реальном приложении здесь был бы API-запрос для сохранения игры
    console.log("Отправка данных игры:", { ...values, images });
    toast.success("Игра успешно сохранена");
  };

  const addImageField = () => {
    // В реальном приложении здесь была бы загрузка изображения
    const mockImageUrl = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070";
    const newImage: GameImage = {
      id: Date.now(),
      url: mockImageUrl,
      isCover: images.length === 0, // Первое добавленное изображение становится обложкой
    };
    setImages([...images, newImage]);
  };

  const removeImage = (id: number) => {
    const updatedImages = images.filter(img => img.id !== id);
    
    // Если удаляемое изображение было обложкой, назначаем первое доступное изображение как обложку
    if (images.find(img => img.id === id)?.isCover && updatedImages.length > 0) {
      updatedImages[0].isCover = true;
    }
    
    setImages(updatedImages);
  };

  const setCoverImage = (id: number) => {
    setImages(images.map(img => ({
      ...img,
      isCover: img.id === id
    })));
  };

  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Добавление новой игры</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Основная информация</h3>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название игры</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gaming-dark border-white/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      className="bg-gaming-dark border-white/10 min-h-32" 
                      placeholder="Введите описание игры..." 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата релиза</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="date" 
                        className="bg-gaming-dark border-white/10" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена (₽)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        min="0" 
                        step="1" 
                        className="bg-gaming-dark border-white/10" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Жанр</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gaming-dark border-white/10">
                        <SelectValue placeholder="Выберите жанр" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gaming-dark border-white/10">
                      {genres.map((genre) => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator className="bg-white/10" />
          
          {/* Разработчик и издатель */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Разработчик и издатель</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="developer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Разработчик</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gaming-dark border-white/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Издатель</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gaming-dark border-white/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          {/* Платформы */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Платформы</h3>
            
            <FormField
              control={form.control}
              name="platforms"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platforms.map((platform) => (
                      <FormField
                        key={platform.id}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={platform.id}
                              className="flex flex-row items-center space-x-3 space-y-0 bg-gaming-dark/50 p-3 rounded-md border border-white/5"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(platform.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, platform.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== platform.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {platform.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator className="bg-white/10" />
          
          {/* Изображения */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Изображения</h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addImageField}
                className="border-white/10"
              >
                <PlusCircle size={16} className="mr-2" />
                Добавить изображение
              </Button>
            </div>
            
            <FormItem>
              <FormDescription>
                Добавьте скриншоты и фотографии игры. Установите одно изображение в качестве обложки.
              </FormDescription>
              
              {images.length === 0 ? (
                <div className="border border-dashed border-white/20 rounded-md p-8 text-center bg-gaming-dark/50">
                  <ImageIcon className="mx-auto h-12 w-12 text-white/30" />
                  <p className="mt-2 text-sm text-gaming-text-secondary">
                    Нет добавленных изображений
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className={`aspect-video bg-gaming-dark rounded-md overflow-hidden ${
                        image.isCover ? 'ring-2 ring-gaming-red' : ''
                      }`}>
                        <img 
                          src={image.url} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {!image.isCover && (
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setCoverImage(image.id)}
                            className="bg-gaming-dark/80 border-white/20 hover:bg-gaming-dark"
                          >
                            Сделать обложкой
                          </Button>
                        )}
                        
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => removeImage(image.id)}
                          className="bg-red-900/50 hover:bg-red-900"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      
                      {image.isCover && (
                        <div className="absolute top-2 left-2 bg-gaming-red text-white text-xs py-1 px-2 rounded">
                          Обложка
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FormItem>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="border-white/10"
            >
              <X size={16} className="mr-2" />
              Отмена
            </Button>
            
            <Button 
              type="submit" 
              className="bg-gaming-red hover:bg-gaming-red/90"
            >
              <Save size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminGameForm;
