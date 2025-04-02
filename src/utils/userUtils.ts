
// Интерфейс пользователя
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

// Ключ для хранения в localStorage
const USER_STORAGE_KEY = 'gameverse_user';

// Создание пользователя
export const createUser = (user: User): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

// Получение текущего пользователя
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    return null;
  }
};

// Проверка авторизации пользователя
export const isUserLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

// Выход пользователя
export const logoutUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

// Создаем тестового пользователя с указанными данными
export const createTestUser = (): void => {
  const testUser: User = {
    id: 'test-user-1',
    username: 'АндрейМуравьев',
    email: 'AAMyravev@yandex.ru',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
    isAdmin: false
  };
  
  createUser(testUser);
};
