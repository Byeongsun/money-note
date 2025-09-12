-- Add user_id column to expenses table
ALTER TABLE expenses ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create index for better performance
CREATE INDEX idx_expenses_user_id ON expenses(user_id);

-- Add RLS (Row Level Security) policy
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own expenses
CREATE POLICY "Users can view own expenses" ON expenses
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own expenses
CREATE POLICY "Users can insert own expenses" ON expenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own expenses
CREATE POLICY "Users can update own expenses" ON expenses
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own expenses
CREATE POLICY "Users can delete own expenses" ON expenses
  FOR DELETE USING (auth.uid() = user_id);
