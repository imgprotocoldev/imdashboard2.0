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
  reward_points: number
  notes?: string
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

// Add XP to user profile with rank-up handling
export const addXP = async (userId: string, xpAmount: number) => {
  try {
    // First, get current profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('current_xp, current_rank, raid_points')
      .eq('id', userId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching profile:', fetchError);
      throw fetchError;
    }
    
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    // Get all rank definitions
    const { data: ranks, error: ranksError } = await supabase
      .from('rank_definitions')
      .select('*')
      .order('rank_id', { ascending: true });
    
    if (ranksError) {
      console.error('Error fetching ranks:', ranksError);
      throw ranksError;
    }
    
    if (!ranks || ranks.length === 0) {
      throw new Error('No rank definitions found');
    }
    
    // Calculate new XP and check for rank-ups
    let currentXp = (profile.current_xp || 0) + xpAmount;
    let currentRankId = profile.current_rank || 1;
    let totalPointsEarned = 0;
    
    // Check for rank-ups
    let rankedUp = false;
    while (true) {
      const nextRank = ranks.find(r => r.rank_id === currentRankId + 1);
      
      if (!nextRank) {
        // Max rank reached
        break;
      }
      
      if (currentXp >= nextRank.xp_required) {
        // Rank up!
        console.log(`Ranking up from ${currentRankId} to ${nextRank.rank_id}!`);
        currentXp -= nextRank.xp_required; // Carry over excess XP
        currentRankId = nextRank.rank_id;
        totalPointsEarned += nextRank.reward_points || 0;
        rankedUp = true;
      } else {
        break;
      }
    }
    
    // Update profile with new XP, rank, and points
    const updateData: any = { 
      current_xp: currentXp,
      current_rank: currentRankId
    };
    
    if (totalPointsEarned > 0) {
      updateData.raid_points = (profile.raid_points || 0) + totalPointsEarned;
    }
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);
    
    if (updateError) {
      console.error('Error updating XP:', updateError);
      throw updateError;
    }
    
    console.log(`Successfully added ${xpAmount} XP. New total: ${currentXp} XP at rank ${currentRankId}`);
    if (rankedUp) {
      console.log(`Ranked up! Earned ${totalPointsEarned} points.`);
    }
    
    return { success: true, rankedUp, pointsEarned: totalPointsEarned };
  } catch (error) {
    console.error('Error in addXP:', error);
    throw error;
  }
};
