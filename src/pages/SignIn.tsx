
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
        <CardFooter className="flex justify-center">
          <div className="text-center">
            <span className="text-gaming-text-secondary">Нет аккаунта? </span>
            <Link to="/sign-up" className="text-gaming-red hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
