-- Create suggestions table
CREATE TABLE public.suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  downvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow everyone to read suggestions
CREATE POLICY "Anyone can view suggestions"
  ON public.suggestions
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert suggestions
CREATE POLICY "Anyone can create suggestions"
  ON public.suggestions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to update vote counts
CREATE POLICY "Anyone can update vote counts"
  ON public.suggestions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create an index for faster queries
CREATE INDEX idx_suggestions_created_at ON public.suggestions(created_at DESC);
CREATE INDEX idx_suggestions_approved ON public.suggestions(approved);