import React from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseSummary } from '@/components/ExpenseSummary';
import { ExpenseChart } from '@/components/ExpenseChart';
import { useExpenses } from '@/hooks/useExpenses';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, User } from 'lucide-react';

const Index = () => {
  const { expenses, loading, addExpense, deleteExpense } = useExpenses();
  const { user, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-800 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              가계부를 불러오는 중...
            </h2>
            <p className="text-muted-foreground">잠시만 기다려주세요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 사용자 정보 및 로그아웃 버튼 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 dark:border-slate-600/20">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || '사용자'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            size="sm"
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-600/20 hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            로그아웃
          </Button>
        </div>

        {/* 향상된 헤더 디자인 */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center space-x-4 mb-6 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                개인 비용 관리
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                지출을 체계적으로 관리하고 분석해보세요
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-10">
          {/* 요약 카드 섹션 */}
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
            <div className="relative">
              <ExpenseSummary expenses={expenses} />
            </div>
          </div>

          {/* 메인 콘텐츠 그리드 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slide-in-right">
                <ExpenseForm onSubmit={addExpense} />
              </div>
              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                <ExpenseChart expenses={expenses} />
              </div>
            </div>

            <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '400ms' }}>
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
