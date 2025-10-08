import { useState, useEffect } from 'react';
import { supabase, Profile, RankDefinition, addXP } from '../lib/supabase';
import { useSupabaseAuth } from './useSupabaseAuth';

export const useRaidProfile = () => {
  const { user } = useSupabaseAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ranks, setRanks] = useState<RankDefinition[]>([]);
  const [currentRank, setCurrentRank] = useState<RankDefinition | null>(null);
  const [nextRank, setNextRank] = useState<RankDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRankUpModal, setShowRankUpModal] = useState(false);
  const [rankUpReward, setRankUpReward] = useState<{ rank: string; points: number } | null>(null);

  // Load rank definitions
  useEffect(() => {
    const loadRanks = async () => {
      const { data, error } = await supabase
        .from('rank_definitions')
        .select('*')
        .order('rank_id', { ascending: true });

      if (error) {
        console.error('Error loading ranks:', error);
        return;
      }

      if (data) {
        setRanks(data);
      }
    };

    loadRanks();
  }, []);

  // Load user profile
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };

    loadProfile();

    // Set up real-time subscription for profile updates
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          const newProfile = payload.new as Profile;
          const oldProfile = profile;

          // Check if rank increased (rank up!)
          if (oldProfile && newProfile.current_rank > oldProfile.current_rank) {
            const newRankDef = ranks.find(r => r.rank_id === newProfile.current_rank);
            if (newRankDef) {
              setRankUpReward({
                rank: newRankDef.rank_name,
                points: newRankDef.reward_points
              });
              setShowRankUpModal(true);
              
              // Auto-hide after 5 seconds
              setTimeout(() => setShowRankUpModal(false), 5000);
            }
          }

          setProfile(newProfile);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, ranks, profile]);

  // Calculate current and next rank
  useEffect(() => {
    if (!profile || ranks.length === 0) return;

    const current = ranks.find(r => r.rank_id === profile.current_rank);
    const next = ranks.find(r => r.rank_id === profile.current_rank + 1);

    setCurrentRank(current || null);
    setNextRank(next || null);
  }, [profile, ranks]);

  // Add XP to user profile
  const addUserXP = async (xpAmount: number) => {
    if (!user?.id) return;

    try {
      await addXP(user.id, xpAmount);
      // Profile will be updated via real-time subscription
    } catch (error) {
      console.error('Error adding XP:', error);
      throw error;
    }
  };

  // Log raid action
  const logRaidAction = async (
    tweetId: string,
    actionType: 'like' | 'reply' | 'retweet',
    xpEarned: number
  ) => {
    if (!user?.id) return;

    try {
      // Try to log the action (optional - won't block if table doesn't exist)
      try {
        // First check if this action already exists
        const { data: existingAction, error: checkError } = await supabase
          .from('raid_actions')
          .select('id')
          .eq('user_id', user.id)
          .eq('tweet_id', tweetId)
          .eq('action_type', actionType)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          // PGRST116 means no rows found, which is fine
          console.warn('Error checking existing action:', checkError.message);
        }

        if (existingAction) {
          console.log(`Action ${actionType} already logged for tweet ${tweetId}`);
          throw new Error(`You have already collected XP for ${actionType} on this raid!`);
        }

        // Insert the new action
        const { error } = await supabase.from('raid_actions').insert({
          user_id: user.id,
          tweet_id: tweetId,
          action_type: actionType,
          xp_earned: xpEarned,
          verified: true,
        });

        if (error) {
          console.warn('Could not log raid action (table may not exist):', error.message);
          throw error;
        }
      } catch (logError: any) {
        console.warn('Raid action logging error:', logError);
        throw logError;
      }

      // Add XP to profile (this is the important part)
      await addUserXP(xpEarned);
    } catch (error) {
      console.error('Error adding XP:', error);
      throw error;
    }
  };

  // Spend raid points
  const spendPoints = async (amount: number) => {
    if (!user?.id || !profile) return false;

    if (profile.raid_points < amount) {
      console.error('Insufficient points');
      return false;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ raid_points: profile.raid_points - amount })
        .eq('id', user.id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error spending points:', error);
      return false;
    }
  };

  // Calculate progress to next rank
  const getProgressToNextRank = () => {
    if (!profile || !currentRank) return 100;

    const xpInCurrentRank = profile.current_xp;
    const xpRequiredToCompleteCurrentRank = currentRank.xp_required;

    const progress = (xpInCurrentRank / xpRequiredToCompleteCurrentRank) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return {
    profile,
    currentRank,
    nextRank,
    loading,
    showRankUpModal,
    rankUpReward,
    setShowRankUpModal,
    addUserXP,
    logRaidAction,
    spendPoints,
    getProgressToNextRank,
  };
};
