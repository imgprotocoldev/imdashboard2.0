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

// Raid System types
export interface Profile {
  id: string
  username: string
  avatar_url?: string
  current_xp: number
  current_rank: number
  raid_points: number
  created_at: string
}

export interface RankDefinition {
  rank_id: number
  rank_name: string
  xp_required: number
  points_reward: number
  created_at: string
}

export interface RaidAction {
  id: string
  user_id: string
  action_type: 'like' | 'reply' | 'retweet'
  xp_earned: number
  tweet_id?: string
  verified: boolean
  created_at: string
}

// Add XP to user profile (simplified version without RPC)
export const addXP = async (userId: string, xpAmount: number) => {
  try {
    // First, get current profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('current_xp')
      .eq('id', userId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching profile:', fetchError);
      throw fetchError;
    }
    
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    // Update XP
    const newCurrentXp = (profile.current_xp || 0) + xpAmount;
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        current_xp: newCurrentXp
      })
      .eq('id', userId);
    
    if (updateError) {
      console.error('Error updating XP:', updateError);
      throw updateError;
    }
    
    console.log(`Successfully added ${xpAmount} XP. New total: ${newCurrentXp}`);
    return { success: true };
  } catch (error) {
    console.error('Error in addXP:', error);
    throw error;
  }
};
