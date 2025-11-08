-- ============================================
-- Complete Supabase Database Setup Script
-- For Mouse Tester Pro Application
-- ============================================

-- ============================================
-- 1. Create test_results table
-- ============================================
CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  latency DECIMAL NOT NULL,
  polling DECIMAL NOT NULL,
  jitter DECIMAL NOT NULL,
  device_info JSONB,
  anon_id TEXT NOT NULL
);

-- ============================================
-- 2. Create contact_messages table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

-- ============================================
-- 3. Create indexes for better performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_test_results_anon_id ON test_results(anon_id);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_results_latency ON test_results(latency);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ============================================
-- 4. Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. Drop existing policies if they exist (for clean setup)
-- ============================================
DROP POLICY IF EXISTS "Users can insert their own test results" ON test_results;
DROP POLICY IF EXISTS "Users can view their own test results" ON test_results;
DROP POLICY IF EXISTS "Users can view all test results" ON test_results;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can view contact messages" ON contact_messages;

-- ============================================
-- 6. Create RLS policies for test_results
-- ============================================
-- Allow anyone to insert test results
CREATE POLICY "Users can insert their own test results" ON test_results
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to view their own test results (filtered by anon_id in application)
CREATE POLICY "Users can view their own test results" ON test_results
  FOR SELECT 
  USING (true);

-- ============================================
-- 7. Create RLS policies for contact_messages
-- ============================================
-- Allow anyone to insert contact messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT 
  WITH CHECK (true);

-- Note: Contact messages viewing is typically restricted to admins
-- If you need to allow viewing, uncomment the following:
-- CREATE POLICY "Anyone can view contact messages" ON contact_messages
--   FOR SELECT 
--   USING (true);

-- ============================================
-- 8. Create RPC function for leaderboard
-- ============================================
-- This function gets the best result (lowest latency) per anonymous user
CREATE OR REPLACE FUNCTION get_leaderboard_best_per_user()
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  latency DECIMAL,
  polling DECIMAL,
  jitter DECIMAL,
  anon_id TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH ranked_results AS (
    SELECT 
      tr.*,
      ROW_NUMBER() OVER (PARTITION BY tr.anon_id ORDER BY tr.latency ASC, tr.created_at DESC) as rn
    FROM test_results tr
  )
  SELECT 
    rr.id,
    rr.created_at,
    rr.latency,
    rr.polling,
    rr.jitter,
    rr.anon_id
  FROM ranked_results rr
  WHERE rr.rn = 1
  ORDER BY rr.latency ASC, rr.created_at DESC
  LIMIT 20;
END;
$$;

-- ============================================
-- 9. Grant necessary permissions
-- ============================================
-- Grant execute permission on the RPC function to authenticated and anon users
GRANT EXECUTE ON FUNCTION get_leaderboard_best_per_user() TO anon, authenticated;

-- ============================================
-- Setup Complete!
-- ============================================
-- Your database is now ready to use.
-- 
-- Tables created:
--   - test_results: Stores mouse latency test results
--   - contact_messages: Stores contact form submissions
--
-- Features enabled:
--   - Row Level Security (RLS) for data protection
--   - Indexes for optimal query performance
--   - Leaderboard function for best results per user
--
-- Next steps:
--   1. Add your Supabase URL and anon key to environment variables
--   2. Test the application to ensure everything works
-- ============================================

