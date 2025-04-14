
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
  game_title?: string;
  username?: string;
}

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const { data, error } = await (supabase as any)
      .from('reviews')
      .select(`
        *,
        games (title),
        profiles (username)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((item: any) => ({
      ...item,
      game_title: item.games?.title,
      username: item.profiles?.username
    }));
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    throw error;
  }
};

export const approveReview = async (id: string): Promise<void> => {
  try {
    const { error } = await (supabase as any)
      .from('reviews')
      .update({ published: true })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Ошибка при публикации отзыва:', error);
    throw error;
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  try {
    const { error } = await (supabase as any)
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error);
    throw error;
  }
};
