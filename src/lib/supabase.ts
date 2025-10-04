import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bxnkvezalchegmulbkwo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmt2ZXphbGNoZWdtdWxia3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODcxOTUsImV4cCI6MjA3NDQ2MzE5NX0.tT3h83AKp_wsWDEahYTfYPot0fxFpgk_4fKOaonq5Qo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Vote {
  id: string
  poll_id: string
  option_id: string
  user_id: string
  created_at: string
}

export interface VoteResult {
  option_id: string
  count: number
  percentage: number
}
