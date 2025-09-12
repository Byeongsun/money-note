import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Expense } from '@/types/expense';
import { TrendingUp, Calendar, PieChart } from 'lucide-react';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const summary = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const totalThisMonth = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryTotals = thisMonthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const sortedCategories = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return {
      totalThisMonth,
      expenseCount: thisMonthExpenses.length,
      topCategories: sortedCategories,
    };
  }, [expenses]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '식비': return '🍽️';
      case '교통비': return '🚌';
      case '쇼핑': return '🛍️';
      case '기타': return '💰';
      default: return '💰';
    }
  };

  const currentMonthName = new Intl.DateTimeFormat('ko-KR', { 
    year: 'numeric', 
    month: 'long' 
  }).format(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 총 지출 카드 */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-blue-100">이번 달 총 지출</CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold mb-1">{formatAmount(summary.totalThisMonth)}</div>
          <p className="text-sm text-blue-100">
            {currentMonthName}
          </p>
        </CardContent>
      </Card>

      {/* 지출 건수 카드 */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-emerald-100">이번 달 지출 건수</CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Calendar className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold mb-1">{summary.expenseCount}건</div>
          <p className="text-sm text-emerald-100">
            총 {expenses.length}건 중
          </p>
        </CardContent>
      </Card>

      {/* 주요 카테고리 카드 */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-purple-100">주요 지출 카테고리</CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <PieChart className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            {summary.topCategories.length > 0 ? (
              summary.topCategories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(category)}</span>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs font-semibold">
                    {formatAmount(amount)}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-purple-100">데이터 없음</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};