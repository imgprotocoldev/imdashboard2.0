import React, { useEffect, useMemo, useRef, useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { useRaidProfile } from '../hooks/useRaidProfile';
import { XHandleManager } from '../utils/xHandleManager';
import Select from '../components/form/Select';

const Raid: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const { 
    profile: raidProfile, 
    currentRank, 
    nextRank, 
    showRankUpModal,
    rankUpReward,
    setShowRankUpModal,
    logRaidAction,
    spendPoints,
    getProgressToNextRank 
  } = useRaidProfile();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [completedActions, setCompletedActions] = useState<Record<string, { like: boolean; reply: boolean; retweet: boolean }>>({});
  const [selectedRewards, setSelectedRewards] = useState<Record<string, string>>({
    sol: '',
    img: '',
    burn: '',
    usdc: ''
  });
  // Custom Raid Card source data (would come from API)
  type RaidItem = {
    id: string;
    tweetId: string;
    tweetUrl: string;
    profile: { name: string; handle: string; avatar: string };
    banner?: string | null;
    text: string;
    media?: string | null;
    endsAt: string; // ISO
    totalXp: number;
  };

  const initialRaids: RaidItem[] = useMemo(() => [
    {
      id: 'r1',
      tweetId: '1965479870571675783',
      tweetUrl: 'https://x.com/img_protocol/status/1965479870571675783',
      profile: { name: 'Infinite Money Glitch', handle: '@img_protocol', avatar: '/images/raid/IMGlogo.webp' },
      banner: '/images/raid/raidactive1.webp',
      text: 'Join the raid and help boost visibility by engaging with the post!',
      media: null,
      endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      totalXp: 30,
    },
    {
      id: 'r2',
      tweetId: '1975185546201760037',
      tweetUrl: 'https://x.com/img_protocol/status/1975185546201760037',
      profile: { name: 'Infinite Money Glitch', handle: '@img_protocol', avatar: '/images/raid/IMGlogo.webp' },
      banner: '/images/raid/raidactive2.webp',
      text: 'Weekly raid—like, reply, retweet to earn XP!',
      media: null,
      endsAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      totalXp: 30,
    },
    {
      id: 'r3',
      tweetId: '1974980448028651872',
      tweetUrl: 'https://x.com/img_protocol/status/1974980448028651872',
      profile: { name: 'Infinite Money Glitch', handle: '@img_protocol', avatar: '/images/raid/IMGlogo.webp' },
      banner: '/images/raid/raidactive3.webp',
      text: 'Special raid—complete actions and collect XP.',
      media: null,
      endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      totalXp: 30,
    },
  ], []);

  const [raids, setRaids] = useState<RaidItem[]>(initialRaids);
  // Timestamp state retained for future live timers; currently unused
  // const [nowTs, setNowTs] = useState<number>(Date.now());

  // Local cache stub for tweet/profile (extend with real API)
  const cacheLoadedRef = useRef(false);
  useEffect(() => {
    if (cacheLoadedRef.current) return;
    cacheLoadedRef.current = true;
    try {
      const cached = localStorage.getItem('raidTweetCache');
      if (cached) {
        const parsed = JSON.parse(cached) as Record<string, Partial<RaidItem>>;
        setRaids(prev => prev.map(r => ({ ...r, ...parsed[r.tweetId] })));
      }
    } catch {}
  }, []);

  // Load completed actions from Supabase
  useEffect(() => {
    if (!user?.id) return;

    const loadCompletedActions = async () => {
      try {
        const { data, error } = await supabase
          .from('raid_actions')
          .select('tweet_id, action_type')
          .eq('user_id', user.id)
          .eq('verified', true);

        if (error) {
          console.warn('Could not load completed actions:', error);
          return;
        }

        if (data) {
          const completed: Record<string, { like: boolean; reply: boolean; retweet: boolean }> = {};
          
          data.forEach((action) => {
            if (!completed[action.tweet_id]) {
              completed[action.tweet_id] = { like: false, reply: false, retweet: false };
            }
            if (action.action_type === 'like') completed[action.tweet_id].like = true;
            if (action.action_type === 'reply') completed[action.tweet_id].reply = true;
            if (action.action_type === 'retweet') completed[action.tweet_id].retweet = true;
          });

          setCompletedActions(completed);
        }
      } catch (error) {
        console.warn('Error loading completed actions:', error);
      }
    };

    loadCompletedActions();
  }, [user?.id, supabase]);

  // Periodic timer for countdowns
  // useEffect(() => {
  //   const t = setInterval(() => setNowTs(Date.now()), 1000);
  //   return () => clearInterval(t);
  // }, []);

  // Former countdown kept for future use; currently not used due to fixed expiry display
  // const formatRemaining = (endsAtIso: string) => {
  //   const diff = new Date(endsAtIso).getTime() - nowTs;
  //   if (diff <= 0) return 'Ended';
  //   const h = Math.floor(diff / 3600000);
  //   const m = Math.floor((diff % 3600000) / 60000);
  //   const s = Math.floor((diff % 60000) / 1000);
  //   if (h > 0) return `${h}h ${m}m`;
  //   if (m > 0) return `${m}m ${s}s`;
  //   return `${s}s`;
  // };

  // Intents removed from UI for now
  // const tweetIntent = (action: 'like' | 'retweet' | 'reply' | 'view', tweetUrl: string) => {
  //   const encoded = encodeURIComponent(tweetUrl);
  //   switch (action) {
  //     case 'like':
  //       return `https://twitter.com/intent/favorite?tweet_id=${tweetUrl.split('/').pop()}`;
  //     case 'retweet':
  //       return `https://twitter.com/intent/retweet?tweet_id=${tweetUrl.split('/').pop()}`;
  //     case 'reply':
  //       return `https://twitter.com/intent/tweet?in_reply_to=${tweetUrl.split('/').pop()}`;
  //     default:
  //       return encoded;
  //   }
  // };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      
      // Process X login and store handle if needed
      await XHandleManager.processXLogin(user);
      
      // Load profile data
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_name, x_handle')
        .eq('id', user.id)
        .limit(1)
        .maybeSingle();
      
      if (!error && data) {
        setProfile({ 
          username: data.username || '', 
          avatar_name: data.avatar_name || 'user1', 
          x_handle: data.x_handle ?? null 
        });
      } else {
        // Fallback for users without profiles
        setProfile({ 
          username: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Guest', 
          avatar_name: 'user1', 
          x_handle: null 
        });
      }
      setLoading(false);
    };
    load();
  }, [user, supabase]);

  const displayName = useMemo(() => {
    if (loading) return 'Loading...';
    return profile?.username || 'IMG User';
  }, [loading, profile]);

  const avatarSrc = useMemo(() => {
    const name = profile?.avatar_name || 'user1';
    return `/images/user/${name}.webp`;
  }, [profile]);

  const [leaderboardData, setLeaderboardData] = useState<Array<{ 
    id: string;
    username: string; 
    avatar_name: string | null;
    raid_points: number;
    rank_name: string;
    rank_id: number;
  }>>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  // Fetch leaderboard data from Supabase
  useEffect(() => {
    const loadLeaderboard = async () => {
      setLeaderboardLoading(true);
      try {
        // Fetch profiles with their ranks
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select(`
            id,
            username,
            avatar_name,
            raid_points,
            current_rank
          `)
          .order('raid_points', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error loading leaderboard:', error);
          setLeaderboardLoading(false);
          return;
        }

        if (profiles) {
          // Fetch rank definitions to get rank names
          const { data: ranks, error: ranksError } = await supabase
            .from('rank_definitions')
            .select('rank_id, rank_name');

          if (ranksError) {
            console.error('Error loading ranks:', ranksError);
          }

          // Map rank IDs to rank names
          const rankMap = new Map(ranks?.map(r => [r.rank_id, r.rank_name]) || []);

          const leaderboardWithRanks = profiles.map(p => ({
            id: p.id,
            username: p.username,
            avatar_name: p.avatar_name,
            raid_points: p.raid_points,
            rank_name: rankMap.get(p.current_rank) || 'Unranked',
            rank_id: p.current_rank
          }));

          setLeaderboardData(leaderboardWithRanks);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      }
      setLeaderboardLoading(false);
    };

    loadLeaderboard();
  }, [supabase]);

  const currentLeaders = leaderboardData;

  const formatEndsAt = (endsAtIso: string): string => {
    try {
      const localized = new Date(endsAtIso).toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const cleaned = localized.replace(',', ''); // "7/10/2025 15:00"
      return `Ends in: ${cleaned} EST`;
    } catch {
      return 'Ends in: N/A';
    }
  };


  // Handle X connection after OAuth redirect
  useEffect(() => {
    const handleXConnection = async () => {
      if (!user) return;
      
      // Check if this is a fresh X login (not already processed)
      const isXLogin = user.app_metadata?.provider === 'twitter' || user.user_metadata?.provider === 'twitter';
      
      if (isXLogin && profile && !profile.x_handle) {
        // User just connected X, update their existing profile
        const success = await XHandleManager.connectXToExistingProfile(user);
        
        if (success) {
          // Reload profile to get updated X handle
          const { data, error } = await supabase
            .from('profiles')
            .select('x_handle')
            .eq('id', user.id)
            .single();
            
          if (!error && data) {
            setProfile(prev => prev ? { ...prev, x_handle: data.x_handle } : null);
          }
        }
      }
    };
    
    handleXConnection();
  }, [user, profile, supabase]);

  // Removed X disconnect handler as X connect/disconnect controls are not shown on Raid page
  // NOTE: Embedded tweets replaced by custom cards; keep this area free of widget loads.
  return (
    <>
      <div className="space-y-6">
        {/* Profile Card */}
        <ComponentCard className="h-fit">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/5 via-transparent to-green-500/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-4">
              <img
                src={avatarSrc}
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/user/user1.webp';
                }}
              />
              <div>
                <div className="text-lg font-extrabold text-gray-900 dark:text-white">{displayName}</div>
                {profile?.x_handle ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Connected to X
                  </div>
                ) : (
                  <a
                    href="/profile"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 underline-offset-2 hover:underline"
                  >
                    Connect to X to Raid and earn
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-indigo-300/60 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/10">
              <div className="text-xs uppercase font-bold text-indigo-700 dark:text-indigo-300 tracking-widest">XP</div>
              <div className="mt-0.5 text-lg font-bold text-indigo-900 dark:text-indigo-100">
                {raidProfile?.current_xp?.toLocaleString() || 0}
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-indigo-400/0 via-indigo-400/10 to-indigo-400/0" />
            </div>
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-emerald-300/60 dark:border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10">
              <div className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-widest">Points</div>
              <div className="mt-0.5 text-lg font-bold text-emerald-900 dark:text-emerald-100">
                {raidProfile?.raid_points?.toLocaleString() || 0}
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-emerald-400/0 via-emerald-400/10 to-emerald-400/0" />
            </div>
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-amber-300/60 dark:border-amber-500/40 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10">
              <div className="text-xs uppercase font-bold text-amber-700 dark:text-amber-300 tracking-widest">Rank</div>
              <div className="mt-0.5 text-lg font-bold text-amber-900 dark:text-amber-100">
                {currentRank?.rank_name || 'Rookie'}
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-400/0 via-amber-400/10 to-amber-400/0" />
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Level Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {raidProfile?.current_xp?.toLocaleString() || 0} / {currentRank?.xp_required?.toLocaleString() || '1,000'} XP
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-green-500 via-brand-500 to-purple-500 rounded-full transition-all duration-500" 
                style={{ width: `${getProgressToNextRank()}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-end mt-2 text-xs text-green-700 dark:text-green-400">
              <span className="font-semibold">
                Next Rank: {nextRank?.rank_name || 'Max Rank'} (+{nextRank?.reward_points || 0} Points)
              </span>
            </div>
          </div>
        </ComponentCard>

        {/* Active Raids */}
        <ComponentCard title="Active Raids" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {raids.map((raid) => {
              const expiryText = formatEndsAt(raid.endsAt);
              return (
                <div key={raid.id} className="rounded-2xl border-2 border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] overflow-hidden shadow-lg hover:shadow-xl hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 hover:scale-[1.02]">
                  {/* Banner - larger size */}
                  {raid.banner && (
                    <img src={raid.banner} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6 space-y-5">
                    {/* Profile Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <img src={raid.profile.avatar} className="w-12 h-12 rounded-full ring-2 ring-brand-400/30" />
                        <div>
                          <div className="text-base font-bold text-gray-900 dark:text-white">{raid.profile.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{raid.profile.handle}</div>
                        </div>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white text-sm font-bold shadow-md">
                        {raid.totalXp} XP
                      </div>
                    </div>
                    
                    {/* XP Values - compact and thinner */}
                    <div className="flex items-center justify-center gap-2">
                      {/* Like */}
                      <a 
                        href={raid.tweetUrl} 
                        target="_blank" 
                        rel="noopener" 
                        className={`flex-1 rounded-md border py-1.5 text-center transition relative ${
                          completedActions[raid.tweetId]?.like
                            ? 'border-emerald-500 dark:border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50'
                            : 'border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-800/50 hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-900/30 dark:hover:to-emerald-800/30'
                        }`}
                      >
                        {completedActions[raid.tweetId]?.like && (
                          <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className={`text-[9px] uppercase tracking-wide ${completedActions[raid.tweetId]?.like ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}`}>Like</div>
                        <div className={`text-xs font-bold ${completedActions[raid.tweetId]?.like ? 'text-emerald-700 dark:text-emerald-300' : 'text-emerald-600 dark:text-emerald-400'}`}>+5 XP</div>
                      </a>
                      
                      {/* Reply */}
                      <a 
                        href={raid.tweetUrl} 
                        target="_blank" 
                        rel="noopener" 
                        className={`flex-1 rounded-md border py-1.5 text-center transition relative ${
                          completedActions[raid.tweetId]?.reply
                            ? 'border-emerald-500 dark:border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50'
                            : 'border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-800/50 hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-900/30 dark:hover:to-emerald-800/30'
                        }`}
                      >
                        {completedActions[raid.tweetId]?.reply && (
                          <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className={`text-[9px] uppercase tracking-wide ${completedActions[raid.tweetId]?.reply ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}`}>Reply</div>
                        <div className={`text-xs font-bold ${completedActions[raid.tweetId]?.reply ? 'text-emerald-700 dark:text-emerald-300' : 'text-emerald-600 dark:text-emerald-400'}`}>+10 XP</div>
                      </a>
                      
                      {/* Retweet */}
                      <a 
                        href={raid.tweetUrl} 
                        target="_blank" 
                        rel="noopener" 
                        className={`flex-1 rounded-md border py-1.5 text-center transition relative ${
                          completedActions[raid.tweetId]?.retweet
                            ? 'border-emerald-500 dark:border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50'
                            : 'border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-800/50 hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-900/30 dark:hover:to-emerald-800/30'
                        }`}
                      >
                        {completedActions[raid.tweetId]?.retweet && (
                          <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className={`text-[9px] uppercase tracking-wide ${completedActions[raid.tweetId]?.retweet ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}`}>Retweet</div>
                        <div className={`text-xs font-bold ${completedActions[raid.tweetId]?.retweet ? 'text-emerald-700 dark:text-emerald-300' : 'text-emerald-600 dark:text-emerald-400'}`}>+15 XP</div>
                      </a>
                    </div>

                    {/* Actions & Expiry */}
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="flex items-center justify-between gap-3">
                        <button 
                          className="flex-1 text-sm px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.25)] focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                          onClick={async () => {
                            if (!user?.id) {
                              alert('Please sign in to collect XP');
                              return;
                            }
                            
                            const currentActions = completedActions[raid.tweetId] || { like: false, reply: false, retweet: false };
                            
                            // Check if all actions are already completed
                            if (currentActions.like && currentActions.reply && currentActions.retweet) {
                              alert('You have already collected all XP from this raid!');
                              return;
                            }
                            
                            console.log('Attempting to collect XP for user:', user.id);
                            console.log('Raid tweet ID:', raid.tweetId);
                            console.log('Current completed actions:', currentActions);
                            
                            try {
                              let totalXpCollected = 0;
                              const newCompletedActions = { ...currentActions };
                              
                              // Only log and reward XP for actions that haven't been completed
                              if (!currentActions.like) {
                                console.log('Logging like action...');
                                await logRaidAction(raid.tweetId, 'like', 5);
                                newCompletedActions.like = true;
                                totalXpCollected += 5;
                              }
                              
                              if (!currentActions.reply) {
                                console.log('Logging reply action...');
                                await logRaidAction(raid.tweetId, 'reply', 10);
                                newCompletedActions.reply = true;
                                totalXpCollected += 10;
                              }
                              
                              if (!currentActions.retweet) {
                                console.log('Logging retweet action...');
                                await logRaidAction(raid.tweetId, 'retweet', 15);
                                newCompletedActions.retweet = true;
                                totalXpCollected += 15;
                              }
                              
                              if (totalXpCollected > 0) {
                                console.log(`Successfully collected ${totalXpCollected} XP!`);
                                
                                // Update completed actions state
                                setCompletedActions(prev => ({
                                  ...prev,
                                  [raid.tweetId]: newCompletedActions
                                }));
                                
                                alert(`Collected ${totalXpCollected} XP!`);
                              } else {
                                alert('No new XP to collect. Complete the raid tasks first!');
                              }
                            } catch (error: any) {
                              console.error('Error collecting XP:', error);
                              console.error('Error details:', {
                                message: error?.message,
                                code: error?.code,
                                details: error?.details,
                                hint: error?.hint
                              });
                              alert(`Failed to collect XP: ${error?.message || 'Unknown error'}`);
                            }
                          }}
                          disabled={!user?.id || (completedActions[raid.tweetId]?.like && completedActions[raid.tweetId]?.reply && completedActions[raid.tweetId]?.retweet)}
                        >
                          {completedActions[raid.tweetId]?.like && completedActions[raid.tweetId]?.reply && completedActions[raid.tweetId]?.retweet 
                            ? 'All XP Collected' 
                            : 'Collect XP'}
                        </button>
                        <a href={raid.tweetUrl} target="_blank" rel="noopener" className="flex-1 text-sm px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_2px_8px_rgba(79,70,229,0.15)] hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] focus:outline-none transition-all text-center">Join Raid</a>
                      </div>
                      <div className="text-center text-xs px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        {expiryText}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ComponentCard>

        {/* Leaderboard */}
        <ComponentCard title="Leaderboard" className="h-fit">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">Top Players by Points</div>
          </div>
          {leaderboardLoading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading leaderboard...</div>
          ) : currentLeaders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No players yet. Be the first!</div>
          ) : (
            <div className="space-y-3">
              {currentLeaders.map((item, idx) => {
                const avatarSrc = item.avatar_name 
                  ? `/images/avatars/${item.avatar_name}.webp` 
                  : '/images/user/user1.webp';
                
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-lg border bg-white dark:bg-white/[0.03] px-4 py-3 ${idx < 3 ? 'border-amber-300 dark:border-amber-600 shadow-[0_0_14px_rgba(251,191,36,0.45)] dark:shadow-[0_0_16px_rgba(245,158,11,0.35)]' : 'border-gray-200 dark:border-white/[0.06]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold w-6 text-gray-700 dark:text-gray-300">#{idx + 1}</span>
                      <img 
                        src={avatarSrc} 
                        className="w-8 h-8 rounded-full object-cover" 
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/user/user1.webp'; }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.username}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.rank_name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{item.raid_points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Points</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ComponentCard>

        {/* Prize Table as Reward Cards */}
        <ComponentCard title="Prize Table" className="h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                id: 'sol',
                name: 'SOL Tokens', 
                image: '/images/raid/5usdinsol.webp',
                description: 'Claim SOL tokens as your reward'
              },
              { 
                id: 'img',
                name: 'IMG Tokens', 
                image: '/images/raid/imgprizeclaim.webp',
                description: 'Claim IMG tokens as your reward'
              },
              { 
                id: 'burn',
                name: 'IMG Burn', 
                image: '/images/raid/burngimgtokens.webp',
                description: 'Burn IMG tokens for rewards'
              },
              { 
                id: 'usdc',
                name: 'USDC', 
                image: '/images/raids/usdcrewards.webp',
                description: 'Claim USDC as your reward'
              },
            ].map((reward) => {
              const rewardOptions = [
                { value: '5', label: '$5 USD' },
                { value: '10', label: '$10 USD' },
                { value: '25', label: '$25 USD' },
                { value: '50', label: '$50 USD' },
              ];
              
              const pointsMap: Record<string, number> = {
                '5': 300,
                '10': 600,
                '25': 1000,
                '50': 3000
              };
              
              const tierMap: Record<string, string> = {
                '5': 'Bronze',
                '10': 'Silver',
                '25': 'Gold',
                '50': 'Platinum'
              };
              
              const selectedAmount = selectedRewards[reward.id];
              const requiredPoints = selectedAmount ? pointsMap[selectedAmount] : 0;
              const tier = selectedAmount ? tierMap[selectedAmount] : '';
              const isUnlocked = selectedAmount && (raidProfile?.raid_points || 0) >= requiredPoints;
              
              const tierColors = {
                Bronze: 'from-amber-500 to-orange-600',
                Silver: 'from-gray-400 to-gray-600', 
                Gold: 'from-yellow-400 to-yellow-600',
                Platinum: 'from-purple-500 to-indigo-600'
              };
              const tierGlow = {
                Bronze: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
                Silver: 'shadow-[0_0_20px_rgba(156,163,175,0.4)]',
                Gold: 'shadow-[0_0_20px_rgba(234,179,8,0.4)]',
                Platinum: 'shadow-[0_0_20px_rgba(147,51,234,0.4)]'
              };
              
              return (
                <div key={reward.id} className={`group relative rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  isUnlocked 
                    ? `border-brand-400/50 dark:border-brand-500/50 bg-white dark:bg-white/[0.03] ${tierGlow[tier as keyof typeof tierGlow]} hover:border-brand-400 dark:hover:border-brand-500` 
                    : 'border-gray-200/50 dark:border-white/10 bg-white dark:bg-white/[0.03]'
                }`}>
                  {/* Tier Badge */}
                  {tier && (
                    <div className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${tierColors[tier as keyof typeof tierColors]} shadow-lg`}>
                      {tier}
                    </div>
                  )}
                  
                  {/* Image with overlay */}
                  <div className="relative h-40 overflow-hidden">
                    <img src={reward.image} alt={reward.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isUnlocked ? 'from-black/20 to-transparent' : 'from-black/40 to-transparent'
                    }`} />
                    {selectedAmount && !isUnlocked && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                          LOCKED
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 space-y-4">
                    {/* Reward Info */}
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Reward Type</div>
                      <div className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-1">{reward.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{reward.description}</div>
                    </div>
                    
                    {/* Select Amount */}
                    <div className="space-y-2">
                      <label className="text-xs text-gray-600 dark:text-gray-400 font-medium">Select Amount</label>
                      <Select
                        options={rewardOptions}
                        placeholder="Choose reward amount"
                        onChange={(value) => setSelectedRewards(prev => ({ ...prev, [reward.id]: value }))}
                        defaultValue={selectedAmount}
                      />
                    </div>
                    
                    {/* Points & Action */}
                    {selectedAmount && (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Required Points</div>
                          <div className={`text-2xl font-black ${isUnlocked ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600' : 'text-gray-400'}`}>
                            {requiredPoints.toLocaleString()}
                          </div>
                        </div>
                        
                        <button
                          className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                            isUnlocked 
                              ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.5)] hover:scale-[1.02]' 
                              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!isUnlocked}
                          onClick={async () => {
                            if (isUnlocked) {
                              await spendPoints(requiredPoints);
                              alert(`Claimed $${selectedAmount} USD in ${reward.name}!`);
                              setSelectedRewards(prev => ({ ...prev, [reward.id]: '' }));
                            }
                          }}
                        >
                          {isUnlocked ? '🎁 Claim Reward' : '🔒 Locked'}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Glow effect */}
                  {isUnlocked && (
                    <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-brand-500/0 via-brand-500/10 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">🚀 Raid to earn Points and unlock the rewards!</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Current Points: <span className="font-bold text-emerald-600 dark:text-emerald-400">{raidProfile?.raid_points?.toLocaleString() || 0}</span></div>
          </div>
        </ComponentCard>

        {/* Rank Up Modal */}
        {showRankUpModal && rankUpReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-2 border-yellow-400 dark:border-yellow-500 animate-in zoom-in duration-500">
              <div className="text-center">
                {/* Celebration Icon */}
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                
                {/* Rank Up Title */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2">
                  RANK UP!
                </h2>
                
                {/* New Rank */}
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {rankUpReward.rank}
                </div>
                
                {/* Reward */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl p-4 mb-6 border border-emerald-200 dark:border-emerald-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reward Earned</div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    +{rankUpReward.points} Points
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setShowRankUpModal(false)}
                  className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Raid;


