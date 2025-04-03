
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
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

// Схема валидации формы регистрации
const formSchema = z.object({
  username: z.string().min(3, { message: 'Имя пользователя должно содержать минимум 3 символа' }),
  email: z.string().email({ message: 'Введите корректный email адрес' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { 
    message: "Вы должны принять условия пользовательского соглашения" 
  }),
  acceptRules: z.boolean().refine(val => val === true, { 
    message: "Вы должны принять правила сайта" 
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptRules: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Имитация запроса к серверу
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном проекте здесь будет запрос к API для регистрации пользователя
      // Для демонстрации просто имитируем успешную регистрацию
      toast.success('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.');
      navigate('/sign-in');
    } catch (err) {
      setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-dark p-4">
      <Card className="w-full max-w-md bg-gaming-card-bg border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Создать аккаунт</CardTitle>
          <CardDescription className="text-center text-gaming-text-secondary">
            Введите данные для регистрации нового аккаунта
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя пользователя</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gaming-text-secondary" />
                        <Input
                          placeholder="МаксПро"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтверждение пароля</FormLabel>
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
              
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gaming-red border-white/30"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Я согласен с{" "}
                        <Link to="/terms" className="text-gaming-red hover:underline">
                          пользовательским соглашением
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptRules"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gaming-red border-white/30"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Я ознакомился с{" "}
                        <Link to="/terms" className="text-gaming-red hover:underline">
                          правилами сайта
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-gaming-red hover:bg-gaming-red/90"
                disabled={isLoading}
              >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center">
            <span className="text-gaming-text-secondary">Уже есть аккаунт? </span>
            <Link to="/sign-in" className="text-gaming-red hover:underline">
              Войти
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
