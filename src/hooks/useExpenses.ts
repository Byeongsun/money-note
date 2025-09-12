import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Expense, NewExpense } from '@/types/expense';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchExpenses = async () => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    try {
      // 임시로 user_id 필터 없이 모든 데이터를 가져옴 (마이그레이션 후 수정 예정)
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses((data as Expense[]) || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast({
        title: "오류",
        description: "지출 내역을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: NewExpense) => {
    if (!user) {
      toast({
        title: "오류",
        description: "로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      // 임시로 user_id 없이 데이터 삽입 (마이그레이션 후 수정 예정)
      const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

      if (error) throw error;
      
      setExpenses(prev => [data as Expense, ...prev]);
      toast({
        title: "성공",
        description: "지출이 추가되었습니다.",
      });
      return data;
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "오류",
        description: "지출 추가에 실패했습니다.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteExpense = async (id: string) => {
    if (!user) {
      toast({
        title: "오류",
        description: "로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      // 임시로 user_id 필터 없이 삭제 (마이그레이션 후 수정 예정)
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      toast({
        title: "성공",
        description: "지출이 삭제되었습니다.",
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "오류",
        description: "지출 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return {
    expenses,
    loading,
    addExpense,
    deleteExpense,
    refetch: fetchExpenses,
  };
};