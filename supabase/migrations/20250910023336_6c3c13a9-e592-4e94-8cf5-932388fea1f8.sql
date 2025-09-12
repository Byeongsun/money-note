-- Create expenses table for personal expense tracking
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('식비', '교통비', '쇼핑', '기타')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for expense access (open access for now, can be restricted later with authentication)
CREATE POLICY "Anyone can view expenses" 
ON public.expenses 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create expenses" 
ON public.expenses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update expenses" 
ON public.expenses 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete expenses" 
ON public.expenses 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();