import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Expense } from '@/types/expense';

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = {
  '식비': '#FF8042',
  '교통비': '#0088FE',
  '쇼핑': '#FF69B4',
  '기타': '#82CA9D',
};

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const categoryTotals = thisMonthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: COLORS[category as keyof typeof COLORS],
    }));
  }, [expenses]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatAmount(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const currentMonthName = new Intl.DateTimeFormat('ko-KR', { 
    year: 'numeric', 
    month: 'long' 
  }).format(new Date());

  if (chartData.length === 0) {
    return (
      <Card className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg">
              <PieChart className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              카테고리별 지출 분석
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="p-6 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-full mb-4">
              <PieChart className="h-16 w-16 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              데이터가 없습니다
            </h3>
            <p className="text-muted-foreground text-center">
              이번 달 지출 데이터가 없습니다.<br />
              지출을 추가하면 차트가 표시됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg">
            <PieChart className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            카테고리별 지출 분석
          </span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          {currentMonthName} 지출 현황
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                stroke="white"
                strokeWidth={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {chartData.map((item, index) => (
            <div 
              key={item.name} 
              className="flex items-center justify-between p-3 bg-gradient-to-r from-white/50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg border border-white/20 dark:border-slate-600/20 backdrop-blur-sm hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {formatAmount(item.value)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};