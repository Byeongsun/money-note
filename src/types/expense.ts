export type ExpenseCategory = '식비' | '교통비' | '쇼핑' | '기타';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  memo?: string;
  created_at: string;
  updated_at: string;
}

export interface NewExpense {
  amount: number;
  category: ExpenseCategory;
  date: string;
  memo?: string;
}