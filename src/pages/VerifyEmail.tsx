
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Пользователь не авторизован');
        return;
      }

      const { data, error } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('code', code)
        .single();

      if (error || !data) {
        setError('Неверный код подтверждения');
        return;
      }

      const isExpired = new Date(data.expires_at) < new Date();
      if (isExpired) {
        setError('Код подтверждения устарел');
        return;
      }

      await supabase
        .from('profiles')
        .update({ is_verified: true })
        .eq('id', user.id);

      await supabase
        .from('verification_codes')
        .update({ verified: true })
        .eq('id', data.id);

      toast.success('Email успешно подтвержден');
      navigate('/');
    } catch (err) {
      setError('Произошла ошибка при подтверждении');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-gaming-card-bg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Подтверждение Email</h2>
        <p className="text-center text-gaming-text-secondary">
          Введите код, отправленный на вашу почту
        </p>
        <Input 
          type="text" 
          placeholder="Введите 6-значный код" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full"
        />
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}
        <Button 
          onClick={handleVerify} 
          disabled={isLoading || code.length !== 6}
          className="w-full"
        >
          {isLoading ? 'Проверка...' : 'Подтвердить'}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
