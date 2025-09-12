import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "로그인 실패",
            description: "인증 처리 중 오류가 발생했습니다.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        if (data.session) {
          toast({
            title: "로그인 성공",
            description: "구글 계정으로 로그인되었습니다!",
          });
          navigate('/');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: "로그인 실패",
          description: "인증 처리 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-800 mx-auto"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            구글 로그인 처리 중...
          </h2>
          <p className="text-muted-foreground">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
};
