
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  game_id: string;
  user_id: string;
  rating: number;
  text: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  // Дополнительные поля, которые мы получаем через JOIN запросы
  game_title?: string;
  username?: string;
}

export const fetchReviews = async (): Promise<Review[]> => {
  // Делаем запрос с JOIN-ами, чтобы получить название игры и имя пользователя
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      games:game_id (title),
      profiles:user_id (username)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка при получении отзывов:', error);
    throw error;
  }

  // Преобразуем данные для соответствия интерфейсу Review
  const reviews: Review[] = data.map((item: any) => ({
    id: item.id,
    game_id: item.game_id,
    user_id: item.user_id,
    rating: item.rating,
    text: item.text,
    published: item.published,
    created_at: item.created_at,
    updated_at: item.updated_at,
    game_title: item.games?.title,
    username: item.profiles?.username
  }));

  return reviews;
};

export const approveReview = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('reviews')
    .update({ published: true })
    .eq('id', id);

  if (error) {
    console.error('Ошибка при публикации отзыва:', error);
    throw error;
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Ошибка при удалении отзыва:', error);
    throw error;
  }
};
