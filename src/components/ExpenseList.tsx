import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Expense } from '@/types/expense';
import { Trash2, Receipt } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case '식비': return '🍽️';
    case '교통비': return '🚌';
    case '쇼핑': return '🛍️';
    case '기타': return '💰';
    default: return '💰';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case '식비': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case '교통비': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case '쇼핑': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
    case '기타': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (expenses.length === 0) {
    return (
      <Card className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <Receipt className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            지출 내역이 없습니다
          </h3>
          <p className="text-muted-foreground text-center max-w-sm">
            첫 번째 지출을 추가해보세요!<br />
            체계적인 가계부 관리를 시작할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Receipt className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            지출 내역
          </span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          총 {expenses.length}건의 지출 내역
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense, index) => (
            <div
              key={expense.id}
              className="group flex items-center justify-between p-4 bg-gradient-to-r from-white/50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-white/20 dark:border-slate-600/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg shadow-sm">
                    <span className="text-2xl">{getCategoryIcon(expense.category)}</span>
                  </div>
                  <Badge 
                    className={`${getCategoryColor(expense.category)} text-sm font-semibold px-3 py-1 shadow-sm`}
                  >
                    {expense.category}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {formatDate(expense.date)}
                    </p>
                    <p className="font-bold text-xl text-slate-800 dark:text-slate-200">
                      {formatAmount(expense.amount)}
                    </p>
                  </div>
                  {expense.memo && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      {expense.memo}
                    </p>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(expense.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};