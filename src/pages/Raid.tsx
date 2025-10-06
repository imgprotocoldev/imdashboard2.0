import React, { useEffect, useMemo, useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { XHandleManager } from '../utils/xHandleManager';

const Raid: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [points, setPoints] = useState<number>(0);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'weekly' | 'monthly'>('all');

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

  const leaderboardData: Record<'all' | 'weekly' | 'monthly', Array<{ handle: string; xp: number }>> = useMemo(() => ({
    all: Array.from({ length: 10 }, (_, i) => ({ handle: `topuser${i + 1}`, xp: 5000 - i * 250 })),
    weekly: Array.from({ length: 10 }, (_, i) => ({ handle: `week${i + 1}`, xp: 1200 - i * 50 })),
    monthly: Array.from({ length: 10 }, (_, i) => ({ handle: `month${i + 1}`, xp: 3000 - i * 120 })),
  }), []);

  const currentLeaders = leaderboardData[leaderboardFilter];


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
            <div className="flex md:justify-end">
              <div className="grid grid-cols-1 gap-2">
                <div className="relative overflow-hidden rounded-lg p-2 text-center border border-green-300/60 dark:border-green-500/40 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10 w-44 md:w-52">
                  <div className="text-[9px] uppercase font-semibold text-green-700 dark:text-green-300 tracking-widest">Points</div>
                  <div className="mt-0.5 text-lg font-extrabold text-green-800 dark:text-green-200">{points}</div>
                  <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-green-400/0 via-green-400/10 to-green-400/0" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center border border-gray-200/70 dark:border-white/10 shadow-[0_0_10px_rgba(99,102,241,0.12)]">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">XP</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white">0</div>
            </div>
            <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center border border-gray-200/70 dark:border-white/10 shadow-[0_0_10px_rgba(99,102,241,0.12)]">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">Raids Joined</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white">0</div>
            </div>
            <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center border border-gray-200/70 dark:border-white/10 shadow-[0_0_10px_rgba(99,102,241,0.12)]">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">Rank</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white">Rookie</div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Level Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">0 / 1,000 XP</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-green-500 via-brand-500 to-purple-500 rounded-full animate-pulse" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center justify-end mt-2 text-xs text-green-700 dark:text-green-400">
              <span className="font-semibold">Earn +100 Points</span>
            </div>
          </div>
        </ComponentCard>

        {/* Active Raids */}
        <ComponentCard title="Active Raids" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1,2,3].map((id) => (
              <div key={id} className="rounded-xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">X Post</div>
                    <div className="font-semibold text-gray-900 dark:text-white">Raid #{id}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Ends in</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">29m</span>
                  </div>
                </div>
                <div className="h-20 rounded-lg bg-gray-100 dark:bg-gray-800" />
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">LIKE</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">+5 XP</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">REPLY</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">+10 XP</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">RETWEET</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">+15 XP</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total: 30 XP • Duration: 30m</div>
                  <button className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-3 py-1.5 rounded-lg">Join Raid</button>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* Leaderboard */}
        <ComponentCard title="Leaderboard" className="h-fit">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">Tracks Top XP Earners and Top Ranks</div>
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {([
                { key: 'all', label: 'All-Time' },
                { key: 'weekly', label: 'Weekly' },
                { key: 'monthly', label: 'Monthly' },
              ] as Array<{key: 'all'|'weekly'|'monthly'; label: string}>).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setLeaderboardFilter(key)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${leaderboardFilter === key ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {currentLeaders.map((item, idx) => (
              <div
                key={`${leaderboardFilter}-${idx}`}
                className={`flex items-center justify-between rounded-lg border bg-white dark:bg-white/[0.03] px-4 py-3 ${idx < 3 ? 'border-amber-300 dark:border-amber-600 shadow-[0_0_14px_rgba(251,191,36,0.45)] dark:shadow-[0_0_16px_rgba(245,158,11,0.35)]' : 'border-gray-200 dark:border-white/[0.06]'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold w-6 text-gray-700 dark:text-gray-300">#{idx + 1}</span>
                  <img src="/images/avatars/user-01.png" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-900 dark:text-white">@{item.handle}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.xp} XP</div>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* Prize Table as Reward Cards */}
        <ComponentCard title="Prize Table" className="h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { reward: '$5 USD in SOL Tokens', cost: 300 },
              { reward: '$10 USD in SOL Tokens', cost: 600 },
              { reward: '$25 USD in SOL Tokens', cost: 1000 },
              { reward: '$50 USD in SOL Tokens', cost: 3000 },
            ].map((row, i) => (
              <div key={i} className="relative rounded-xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-[0_0_12px_rgba(34,197,94,0.12)]">
                <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Reward</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{row.reward}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Cost</div>
                    <div className="text-lg font-extrabold text-green-700 dark:text-green-400">{row.cost}</div>
                  </div>
                  <button
                    className="px-3 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
                    disabled={points < row.cost}
                    onClick={() => {
                      if (points >= row.cost) {
                        setPoints(points - row.cost);
                      }
                    }}
                  >
                    {points >= row.cost ? 'Claim' : 'Locked'}
                  </button>
                </div>
                <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-brand-500/0 via-brand-500/5 to-brand-500/0" />
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Manual early stage: earn Points by ranking up; spend them on rewards.</div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Raid;


