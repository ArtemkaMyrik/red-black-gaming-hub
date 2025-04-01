
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';

// Схема валидации формы восстановления пароля
const formSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email адрес' }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Имитация запроса к серверу
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном проекте здесь будет запрос к API для отправки ссылки для сброса пароля
      setIsSubmitted(true);
      toast.success('Инструкции по восстановлению пароля отправлены на ваш email');
    } catch (err) {
      setError('Произошла ошибка при отправке инструкций. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-dark p-4">
      <Card className="w-full max-w-md bg-gaming-card-bg border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Восстановление пароля</CardTitle>
          <CardDescription className="text-center text-gaming-text-secondary">
            {!isSubmitted 
              ? 'Введите email, связанный с вашим аккаунтом'
              : 'Проверьте свою электронную почту'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900/50 text-red-100">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isSubmitted ? (
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
                <Button
                  type="submit"
                  className="w-full bg-gaming-red hover:bg-gaming-red/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <Alert className="bg-gaming-dark-accent border-white/10">
                <AlertDescription>
                  Мы отправили инструкции по сбросу пароля на указанный вами email. Пожалуйста, проверьте вашу входящую почту, а также папку со спамом.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gaming-red hover:bg-gaming-red/90"
              >
                Отправить еще раз
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-center">
            <Link to="/sign-in" className="flex items-center text-gaming-text-secondary hover:text-gaming-red">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Вернуться к странице входа
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
