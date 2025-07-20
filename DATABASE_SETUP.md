# Database Setup Guide

## Supabase Configuration

To enable database features (stats, history, comparison), you need to set up Supabase:

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Environment Variables
Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema
Run these SQL commands in your Supabase SQL editor:

```sql
-- Create test_results table
CREATE TABLE test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  latency DECIMAL NOT NULL,
  polling DECIMAL NOT NULL,
  jitter DECIMAL NOT NULL,
  device_info JSONB,
  anon_id TEXT NOT NULL
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for test_results
CREATE POLICY "Users can insert their own test results" ON test_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own test results" ON test_results
  FOR SELECT USING (true);

-- Create policies for contact_messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

### 4. Features Available After Setup
- ✅ Test results will be saved to database
- ✅ Stats will show your test history
- ✅ History will display all your tests
- ✅ Comparison will show your best results
- ✅ Contact form will work

### 5. Without Database Setup
If you don't set up the database:
- ❌ Test results won't be saved
- ❌ Stats will show "Database not configured"
- ❌ History will show "Database not configured"
- ❌ Comparison will show "Database not configured"
- ✅ All testing features still work
- ✅ Contact form will show error

The app will work perfectly fine without the database - you just won't have persistent storage of your test results. 