import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ExpenseCategory, NewExpense } from '@/types/expense';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  amount: z.number().min(0.01, '금액을 입력하세요'),
  category: z.enum(['식비', '교통비', '쇼핑', '기타'] as const),
  date: z.string().min(1, '날짜를 선택하세요'),
  memo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ExpenseFormProps {
  onSubmit: (expense: NewExpense) => Promise<void>;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: '식비' as ExpenseCategory,
      date: new Date().toISOString().split('T')[0],
      memo: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit({
        amount: data.amount,
        category: data.category,
        date: data.date,
        memo: data.memo || undefined,
      });
      form.reset({
        amount: 0,
        category: '식비' as ExpenseCategory,
        date: new Date().toISOString().split('T')[0],
        memo: '',
      });
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <Card className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            지출 추가
          </span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          새로운 지출 내역을 추가해보세요
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      💰 금액
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          className="pl-8 h-12 text-lg font-medium border-2 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                          ₩
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      🏷️ 카테고리
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200">
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="식비" className="text-base py-3">
                          <span className="flex items-center gap-2">
                            🍽️ 식비
                          </span>
                        </SelectItem>
                        <SelectItem value="교통비" className="text-base py-3">
                          <span className="flex items-center gap-2">
                            🚌 교통비
                          </span>
                        </SelectItem>
                        <SelectItem value="쇼핑" className="text-base py-3">
                          <span className="flex items-center gap-2">
                            🛍️ 쇼핑
                          </span>
                        </SelectItem>
                        <SelectItem value="기타" className="text-base py-3">
                          <span className="flex items-center gap-2">
                            💰 기타
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    📅 날짜
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      className="h-12 text-lg border-2 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    📝 메모 (선택)
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="메모를 입력하세요..."
                      className="min-h-[80px] text-base border-2 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Plus className="h-5 w-5 mr-2" />
              지출 추가하기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};