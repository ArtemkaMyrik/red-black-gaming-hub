
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  username: string;
  avatar: string | null;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: string;
  updated_at: string;
}

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await (supabase as any)
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, profile: Partial<Profile>): Promise<Profile> => {
  const { data, error } = await (supabase as any)
    .from('profiles')
    .update(profile)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getFavoriteGames = async (userId: string): Promise<Game[]> => {
  const { data, error } = await (supabase as any)
    .from('user_game_favorites')
    .select('game_id, games(*)')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map((item: any) => item.games);
};

export const toggleGameFavorite = async (gameId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error: checkError } = await (supabase as any)
    .from('user_game_favorites')
    .select('*')
    .eq('user_id', user.id)
    .eq('game_id', gameId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (data) {
    const { error } = await (supabase as any)
      .from('user_game_favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('game_id', gameId);

    if (error) throw error;
  } else {
    const { error } = await (supabase as any)
      .from('user_game_favorites')
      .insert([{ user_id: user.id, game_id: gameId }]);

    if (error) throw error;
  }
};
