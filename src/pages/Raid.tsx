import React, { useEffect, useMemo, useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { XHandleManager } from '../utils/xHandleManager';

const Raid: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleDisconnectX = async () => {
    await supabase.auth.signOut();
    window.location.href = '/raid';
  };
  return (
    <>
      <div className="space-y-6">
        {/* Profile Card */}
        <ComponentCard title="Your Raid Profile" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
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
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{displayName}</div>
                {profile?.x_handle ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Connected to X
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">Connect to X to Raid and earn</div>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rank</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium">Rookie</div>
            </div>
                <div className="flex md:justify-end">
                  <div className="flex items-center gap-3">
                    {profile?.x_handle ? (
                      <button onClick={handleDisconnectX} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Disconnect X</button>
                    ) : (
                      <button 
                        onClick={() => window.location.href = '/profile'} 
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                      >
                        Connect X (Go to Profile)
                      </button>
                    )}
                    <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700">Connect Wallet</button>
                  </div>
                </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">XP</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">0</div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">Raids Joined</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">0</div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">Success Rate</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">--</div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Level Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">0 / 1,000 XP</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center justify-end mt-3">
              <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.06] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.06] disabled:opacity-50" disabled>
                Collect Rewards
              </button>
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
          <div className="space-y-3">
            {[1,2,3,4,5].map((rank) => (
              <div key={rank} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold w-6 text-gray-700 dark:text-gray-300">#{rank}</span>
                  <img src="/images/avatars/user-01.png" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-900 dark:text-white">@handle{rank}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{1000 - rank * 50} XP</div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Raid;


