
import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from '@supabase/supabase-js';
import { Database } from "@/integrations/supabase/types";

export interface Profile {
  id: string;
  username: string;
  avatar: string | null;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  release_date: string | null;
  developer: string | null;
  publisher: string | null;
  created_at: string;
  updated_at: string;
}

interface ServiceResponse<T> {
  data: T | null;
  error: PostgrestError | null;
  isLoading?: boolean;
}

export const getProfile = async (userId: string): Promise<ServiceResponse<Profile>> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  } catch (e) {
    console.error('Error fetching profile:', e);
    return { data: null, error: e as PostgrestError };
  }
};

export const updateProfile = async (userId: string, profile: Partial<Profile>): Promise<ServiceResponse<Profile>> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  } catch (e) {
    console.error('Error updating profile:', e);
    return { data: null, error: e as PostgrestError };
  }
};

export const getFavoriteGames = async (userId: string): Promise<ServiceResponse<Game[]>> => {
  try {
    const { data, error } = await supabase
      .from('user_game_favorites')
      .select('game_id, games(*)')
      .eq('user_id', userId);

    if (error) throw error;

    const games = data?.map(item => item.games) as Game[] || [];
    return { data: games, error: null };
  } catch (e) {
    console.error('Error fetching favorite games:', e);
    return { data: null, error: e as PostgrestError };
  }
};

export const toggleGameFavorite = async (gameId: string): Promise<ServiceResponse<void>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { 
        data: null, 
        error: { 
          message: 'User not authenticated',
          details: '',
          hint: '',
          code: 'AUTH_ERROR'
        } as PostgrestError 
      };
    }

    const { data, error: checkError } = await supabase
      .from('user_game_favorites')
      .select('*')
      .eq('user_id', user.id)
      .eq('game_id', gameId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (data) {
      const { error } = await supabase
        .from('user_game_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('game_id', gameId);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_game_favorites')
        .insert([{ user_id: user.id, game_id: gameId }]);

      if (error) throw error;
    }

    return { data: undefined, error: null };
  } catch (e) {
    console.error('Error toggling game favorite:', e);
    return { data: null, error: e as PostgrestError };
  }
};
