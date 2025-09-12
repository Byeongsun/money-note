import { useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // 현재 세션 가져오기
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    };

    getSession();

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // 이메일/비밀번호로 회원가입
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast({
        title: "회원가입 성공",
        description: "이메일을 확인하여 계정을 활성화해주세요.",
      });

      return { data, error: null };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "회원가입 실패",
        description: authError.message,
        variant: "destructive",
      });
      return { data: null, error: authError };
    }
  };

  // 이메일/비밀번호로 로그인
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      });

      return { data, error: null };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "로그인 실패",
        description: authError.message,
        variant: "destructive",
      });
      return { data: null, error: authError };
    }
  };

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "로그아웃",
        description: "안전하게 로그아웃되었습니다.",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "로그아웃 실패",
        description: authError.message,
        variant: "destructive",
      });
    }
  };

  // 비밀번호 재설정 이메일 발송
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "비밀번호 재설정",
        description: "비밀번호 재설정 링크를 이메일로 발송했습니다.",
      });

      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "비밀번호 재설정 실패",
        description: authError.message,
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // 비밀번호 업데이트
  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "비밀번호 변경",
        description: "비밀번호가 성공적으로 변경되었습니다.",
      });

      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "비밀번호 변경 실패",
        description: authError.message,
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // 구글 로그인
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "구글 로그인 실패",
        description: authError.message,
        variant: "destructive",
      });
      return { data: null, error: authError };
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    signInWithGoogle,
  };
};
