
import { supabase } from "@/integrations/supabase/client";

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

export const getGames = async (): Promise<Game[]> => {
  const { data, error } = await (supabase as any)
    .from('games')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getGame = async (id: string): Promise<Game> => {
  const { data, error } = await (supabase as any)
    .from('games')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createGame = async (game: Omit<Game, 'id' | 'created_at' | 'updated_at'>): Promise<Game> => {
  const { data, error } = await (supabase as any)
    .from('games')
    .insert([game])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateGame = async (id: string, game: Partial<Game>): Promise<Game> => {
  const { data, error } = await (supabase as any)
    .from('games')
    .update(game)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGame = async (id: string): Promise<void> => {
  const { error } = await (supabase as any)
    .from('games')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
