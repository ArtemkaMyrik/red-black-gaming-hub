
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./profileService";

interface AuthResponse {
  user: User | null;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  isAdmin: boolean;
  isModerator?: boolean;
}

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) throw error;

    if (data.user) {
      const profile = await getProfile(data.user.id);
      const user: User = mapProfileToUser(profile);
      return { user, error: null };
    }

    return { user: null, error: 'Не удалось создать пользователя' };
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return { user: null, error: (error as Error).message };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      const profile = await getProfile(data.user.id);
      const user: User = mapProfileToUser(profile);
      return { user, error: null };
    }

    return { user: null, error: 'Не удалось войти в систему' };
  } catch (error) {
    console.error('Ошибка входа:', error);
    return { user: null, error: (error as Error).message };
  }
};

export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Ошибка выхода:', error);
    return { error: (error as Error).message };
  }
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      return { user: null, error: null };
    }

    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) throw error;

    const profile = await getProfile(userData.user.id);
    const user: User = mapProfileToUser(profile);
    return { user, error: null };
  } catch (error) {
    console.error('Ошибка получения текущего пользователя:', error);
    return { user: null, error: (error as Error).message };
  }
};

const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await (supabase as any)
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

const mapProfileToUser = (profile: Profile): User => ({
  id: profile.id,
  username: profile.username,
  email: '', // Email is not stored in the profile for security
  avatar: profile.avatar || undefined,
  isAdmin: profile.is_admin,
  isModerator: profile.is_moderator
});
