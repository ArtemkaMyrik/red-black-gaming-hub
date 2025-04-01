
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, AlertCircle } from 'lucide-react';

// Схема валидации формы входа
const formSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email адрес' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Имитация запроса к серверу
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном проекте здесь будет запрос к API для аутентификации
      // Для демонстрации просто проверяем на тестовые данные
      if (values.email === 'demo@example.com' && values.password === 'password123') {
        toast.success('Успешный вход в систему');
        navigate('/');
      } else {
        setError('Неверный email или пароль');
      }
    } catch (err) {
      setError('Произошла ошибка при входе. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-dark p-4">
      <Card className="w-full max-w-md bg-gaming-card-bg border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Вход в аккаунт</CardTitle>
          <CardDescription className="text-center text-gaming-text-secondary">
            Введите свои данные для входа в систему
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900/50 text-red-100">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gaming-text-secondary" />
                        <Input
                          placeholder="example@mail.ru"
                          className="pl-10 bg-gaming-dark border-white/10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gaming-text-secondary" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-gaming-dark border-white/10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-gaming-red hover:underline">
                  Забыли пароль?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-gaming-red hover:bg-gaming-red/90"
                disabled={isLoading}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center">
            <span className="text-gaming-text-secondary">Нет аккаунта? </span>
            <Link to="/sign-up" className="text-gaming-red hover:underline">
              Зарегистрироваться
            </Link>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-white/10 flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6,20H24v8h11.3c-1.1,5.2-5.7,9-11.3,9c-6.6,0-12-5.4-12-12s5.4-12,12-12c3,0,5.8,1.1,7.9,3l6.1-6.1 C33.8,6.4,29.1,4,24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20C44,22.7,43.9,21.3,43.6,20z"/>
                <path fill="#FF3D00" d="M6.3,14.7l7.1,5.2C15.6,14.2,19.6,10,24,10c3,0,5.8,1.1,7.9,3l6.1-6.1C33.8,3.4,29.1,1,24,1 C15.7,1,8.3,6.3,4.4,13.7L6.3,14.7z"/>
                <path fill="#4CAF50" d="M24,44c5,0,9.6-1.3,13.5-3.9l-6.6-5c-2,1.3-4.5,2.1-7,2.1c-6.5,0-12-5.1-12.8-11.7l-1.7-0.2l-7,5.3 C6.7,38.3,14.7,44,24,44z"/>
                <path fill="#1976D2" d="M43.6,20H24v8h11.3c-0.5,2.5-1.9,4.6-3.8,6.2l6.6,5c4-3.7,6.6-9.2,6.6-15.4c0-1.3-0.1-2.7-0.4-4H43.6z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="border-white/10 flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4267B2" d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8926 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"/>
              </svg>
              ВКонтакте
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
