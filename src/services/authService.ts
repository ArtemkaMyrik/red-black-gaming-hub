
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/utils/userUtils";

// Регистрация нового пользователя
export const signUp = async (email: string, password: string, username: string): Promise<{user: User | null, error: string | null}> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });
    
    if (error) throw error;
    
    // Проверяем, если пользователь успешно создан
    if (data.user) {
      // Преобразуем данные пользователя в нужный формат
      const newUser: User = {
        id: data.user.id,
        username: username,
        email: data.user.email || '',
        isAdmin: false
      };
      
      return { user: newUser, error: null };
    }
    
    return { user: null, error: 'Не удалось создать пользователя' };
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return { user: null, error: (error as Error).message };
  }
};

// Вход пользователя
export const signIn = async (email: string, password: string): Promise<{user: User | null, error: string | null}> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Получаем дополнительные данные профиля пользователя
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      // Преобразуем данные пользователя в нужный формат, обеспечивая безопасное обращение к возможно null полям
      const user: User = {
        id: data.user.id,
        username: profileData?.username || data.user.email?.split('@')[0] || '',
        email: data.user.email || '',
        avatar: profileData?.avatar || undefined,
        isAdmin: Boolean(profileData?.is_admin) || false,
        isModerator: Boolean(profileData?.is_moderator) || false
      };
      
      return { user, error: null };
    }
    
    return { user: null, error: 'Не удалось войти в систему' };
  } catch (error) {
    console.error('Ошибка входа:', error);
    return { user: null, error: (error as Error).message };
  }
};

// Выход пользователя
export const signOut = async (): Promise<{error: string | null}> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Ошибка выхода:', error);
    return { error: (error as Error).message };
  }
};

// Получение текущего пользователя
export const getCurrentUser = async (): Promise<{user: User | null, error: string | null}> => {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (!data.session) {
      return { user: null, error: null };
    }
    
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) throw error;
    
    // Получаем дополнительные данные профиля пользователя
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();
    
    // Преобразуем данные пользователя в нужный формат с безопасным доступом к свойствам
    const user: User = {
      id: userData.user.id,
      username: profileData?.username || userData.user.email?.split('@')[0] || '',
      email: userData.user.email || '',
      avatar: profileData?.avatar || undefined,
      isAdmin: Boolean(profileData?.is_admin) || false,
      isModerator: Boolean(profileData?.is_moderator) || false
    };
    
    return { user, error: null };
  } catch (error) {
    console.error('Ошибка получения текущего пользователя:', error);
    return { user: null, error: (error as Error).message };
  }
};
