import { useState, useEffect } from 'react';
import { supabase } from './integrations/supabase/client.ts';
import Auth from './components/Auth';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ChartView from './components/ChartView';

export default function App() {
  const [session, setSession] = useState(null);
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // 현재 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 세션 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = expense => {
    setExpenses(prev => [...prev, expense]);
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-kakao-light py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-kakao-dark">소비노트</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            로그아웃
          </button>
        </div>
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList expenses={expenses} />
        <ChartView expenses={expenses} />
      </div>
    </div>
  );
}