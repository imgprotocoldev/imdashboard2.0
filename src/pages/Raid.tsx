import React, { useEffect, useMemo, useRef, useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { XHandleManager } from '../utils/xHandleManager';

const Raid: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [points, setPoints] = useState<number>(0);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'weekly' | 'monthly'>('all');
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
      profile: { name: 'IMG Protocol', handle: '@img_protocol', avatar: '/images/avatars/user-01.png' },
      banner: null,
      text: 'Join the raid and help boost visibility by engaging with the post!',
      media: null,
      endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      totalXp: 30,
    },
    {
      id: 'r2',
      tweetId: '1975185546201760037',
      tweetUrl: 'https://x.com/img_protocol/status/1975185546201760037',
      profile: { name: 'IMG Protocol', handle: '@img_protocol', avatar: '/images/avatars/user-02.png' },
      banner: null,
      text: 'Weekly raid—like, reply, retweet to earn XP!',
      media: null,
      endsAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      totalXp: 30,
    },
    {
      id: 'r3',
      tweetId: '1974980448028651872',
      tweetUrl: 'https://x.com/img_protocol/status/1974980448028651872',
      profile: { name: 'IMG Protocol', handle: '@img_protocol', avatar: '/images/avatars/user-03.png' },
      banner: null,
      text: 'Special raid—complete actions and collect XP.',
      media: null,
      endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      totalXp: 30,
    },
  ], []);

  const [raids, setRaids] = useState<RaidItem[]>(initialRaids);
  const [nowTs, setNowTs] = useState<number>(Date.now());

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

  // Periodic timer for countdowns
  useEffect(() => {
    const t = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatRemaining = (endsAtIso: string) => {
    const diff = new Date(endsAtIso).getTime() - nowTs;
    if (diff <= 0) return 'Ended';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const tweetIntent = (action: 'like' | 'retweet' | 'reply' | 'view', tweetUrl: string) => {
    const encoded = encodeURIComponent(tweetUrl);
    switch (action) {
      case 'like':
        // Note: Twitter does not provide a public web intent to auto-like; open tweet instead.
        return `https://twitter.com/intent/favorite?tweet_id=${tweetUrl.split('/').pop()}`;
      case 'retweet':
        return `https://twitter.com/intent/retweet?tweet_id=${tweetUrl.split('/').pop()}`;
      case 'reply':
        return `https://twitter.com/intent/tweet?in_reply_to=${tweetUrl.split('/').pop()}`;
      default:
        return encoded;
    }
  };

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
            <div className="relative overflow-hidden rounded-lg p-4 text-center border border-indigo-300/60 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/10">
              <div className="text-[10px] uppercase font-semibold text-indigo-700 dark:text-indigo-300 tracking-widest">XP</div>
              <div className="mt-0.5 text-2xl font-black text-indigo-900 dark:text-indigo-100">0</div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-indigo-400/0 via-indigo-400/10 to-indigo-400/0" />
            </div>
            <div className="relative overflow-hidden rounded-lg p-4 text-center border border-emerald-300/60 dark:border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10">
              <div className="text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-300 tracking-widest">Points</div>
              <div className="mt-0.5 text-2xl font-black text-emerald-900 dark:text-emerald-100">{points}</div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-emerald-400/0 via-emerald-400/10 to-emerald-400/0" />
            </div>
            <div className="relative overflow-hidden rounded-lg p-4 text-center border border-amber-300/60 dark:border-amber-500/40 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10">
              <div className="text-[10px] uppercase font-semibold text-amber-700 dark:text-amber-300 tracking-widest">Rank</div>
              <div className="mt-0.5 text-2xl font-black text-amber-900 dark:text-amber-100">Rookie</div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-400/0 via-amber-400/10 to-amber-400/0" />
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
            {raids.map((raid) => {
              const remaining = formatRemaining(raid.endsAt);
              const pct = Math.max(0, Math.min(100, 100 - ((new Date(raid.endsAt).getTime() - nowTs) / (6 * 60 * 60 * 1000)) * 100));
              return (
                <div key={raid.id} className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] overflow-hidden shadow-sm hover:shadow-md transition">
                  {/* Optional Banner */}
                  {raid.banner && (
                    <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${raid.banner})` }} />
                  )}
                  <div className="p-4 space-y-3">
                    {/* Profile Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={raid.profile.avatar} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{raid.profile.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{raid.profile.handle}</div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-md border ${remaining === 'Ended' ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'}`}>
                        {remaining === 'Ended' ? 'Ended' : `Ends in: ${remaining}`}
                      </span>
                    </div>

                    {/* Tweet Text */}
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      {raid.text}
                    </div>
                    {raid.media && (
                      <img src={raid.media} className="w-full rounded-lg border border-gray-200 dark:border-white/10" />
                    )}

                    {/* XP Rewards */}
                    <div className="grid grid-cols-3 gap-2 text-center">
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

                    {/* Progress */}
                    <div className="mt-1">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-brand-500" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
                        <span>Total {raid.totalXp} XP</span>
                        <span>Active Raid</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="inline-flex gap-1.5">
                        <a href={tweetIntent('like', raid.tweetUrl)} target="_blank" rel="noopener" className="text-xs px-2.5 py-1.5 rounded-md font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition">Like</a>
                        <a href={tweetIntent('reply', raid.tweetUrl)} target="_blank" rel="noopener" className="text-xs px-2.5 py-1.5 rounded-md font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition">Reply</a>
                        <a href={tweetIntent('retweet', raid.tweetUrl)} target="_blank" rel="noopener" className="text-xs px-2.5 py-1.5 rounded-md font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition">Retweet</a>
                      </div>
                      <div className="inline-flex gap-2">
                        <a href={raid.tweetUrl} target="_blank" rel="noopener" className="text-xs px-3.5 py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition">Join Raid</a>
                        <button className="text-xs px-3.5 py-2 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition" onClick={() => {
                          // Stub: verify via API and award XP
                          console.log('Verify actions for', raid.tweetId);
                        }}>Collect XP</button>
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


