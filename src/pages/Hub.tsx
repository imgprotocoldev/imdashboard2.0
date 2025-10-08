import React, { useEffect, useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { useRaidProfile } from '../hooks/useRaidProfile';

const Hub: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const { 
    profile: raidProfile, 
    currentRank
  } = useRaidProfile();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user || !supabase) return;
      const { data } = await supabase
        .from('profiles')
        .select('username, avatar_name, x_handle')
        .eq('id', user.id)
        .single();
      if (data) setProfile(data);
    };
    loadProfile();
  }, [user, supabase]);

  const avatarSrc = profile?.avatar_name
    ? `/images/avatars/${profile.avatar_name}.webp`
    : '/images/user/user1.webp';
  const displayName = profile?.username || 'User';

  // (Reserved for future hub-level state)

  return (
    <>
      <div className="space-y-6">
        {/* Raid Games Section */}
        <ComponentCard title="Raid Games" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Left: Compact profile, then image/text/button */}
            <div className="flex flex-col">
              {/* Compact Profile Stats */}
              <ComponentCard className="h-fit">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/user/user1.webp'; }}
                  />
                  <div>
                    <div className="text-base font-extrabold text-gray-900 dark:text-white leading-5">{displayName}</div>
                    {profile?.x_handle ? (
                      <div className="text-xs text-green-600 dark:text-green-400">Connected to X</div>
                    ) : (
                      <a href="/profile" className="text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 underline-offset-2 hover:underline">Connect to X</a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="relative overflow-hidden rounded-md py-1.5 px-2 text-center border border-indigo-300/60 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/10">
                    <div className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300 tracking-widest">XP</div>
                    <div className="mt-0.5 text-sm font-bold text-indigo-900 dark:text-indigo-100">
                      {(raidProfile?.current_xp || 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-md py-1.5 px-2 text-center border border-emerald-300/60 dark:border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10">
                    <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-widest">Points</div>
                    <div className="mt-0.5 text-sm font-bold text-emerald-900 dark:text-emerald-100">
                      {(raidProfile?.raid_points || 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-md py-1.5 px-2 text-center border border-amber-300/60 dark:border-amber-500/40 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10">
                    <div className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 tracking-widest">Rank</div>
                    <div className="mt-0.5 text-sm font-bold text-amber-900 dark:text-amber-100">
                      {currentRank?.rank_name || 'Unranked'}
                    </div>
                  </div>
                </div>
              </ComponentCard>

              {/* Promo: small image left, text + button right */}
              <div className="mt-3 rounded-xl border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-white/[0.02]">
                <div className="flex items-center gap-5">
                  <div className="shrink-0 w-40 md:w-[44%] h-24 md:h-28 lg:h-32 rounded-lg overflow-hidden border border-gray-100 dark:border-white/10">
                    <img
                      src="/images/raid/raidgamesbanner.webp"
                      alt="Raid Games"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white leading-7">
                      Use Your Raid Points to Play Games!
                    </div>
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                      Spend points to win XP bonuses and prizes.
                    </div>
                    <div className="mt-3">
                      <a
                        href="/raidgames"
                        className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm md:text-base font-bold shadow-[0_4px_12px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_16px_rgba(168,85,247,0.45)] transition-all"
                      >
                        Play Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Daily Spin */}
            <DailySpinCard />
          </div>
        </ComponentCard>

        {/* Other Games Section */}
        <ComponentCard title="Games" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Racing - Highway Chase */}
            <div className="rounded-xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] overflow-hidden flex flex-col">
              <div className="w-full h-40 md:h-44 bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/hub/highwaychasebanner.webp"
                  alt="Highway Chase"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Racing to Highway Chase</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">IMG Reloaded Highway Chase</div>
                <a
                  href="https://gaming.imgprotocol.com/#racing"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium"
                >
                  Play Now
                </a>
              </div>
            </div>

            {/* Lottery Jackpot */}
            <div className="rounded-xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] overflow-hidden flex flex-col">
              <div className="w-full h-40 md:h-44 bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/hub/Jackpotbanner.webp"
                  alt="Lottery Jackpot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Lottery Jackpot</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">Try your luck in the daily lottery draw</div>
                <button
                  className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.06] text-sm font-medium"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Buy Competition */}
            <div className="rounded-xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] overflow-hidden flex flex-col">
              <div className="w-full h-40 md:h-44 bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/hub/buycompetitionbanner.webp"
                  alt="Buy Competition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Buy Competition</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">Compete with other traders in buying challenges</div>
                <button
                  className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.06] text-sm font-medium"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </ComponentCard>

      </div>
    </>
  );
};

export default Hub;

// --- Daily Spin Component (even SVG slices) ---
const DailySpinCard: React.FC = () => {
  const { user } = useSupabaseAuth();
  const { addUserXP } = useRaidProfile();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winLabel, setWinLabel] = useState<string | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  
  const prizes = [
    { label: '1 XP', value: 1, probability: 0.35 },
    { label: '5 XP', value: 5, probability: 0.25 },
    { label: '10 XP', value: 10, probability: 0.15 },
    { label: '15 XP', value: 15, probability: 0.10 },
    { label: '20 XP', value: 20, probability: 0.07 },
    { label: '25 XP', value: 25, probability: 0.04 },
    { label: '30 XP', value: 30, probability: 0.03 },
    { label: '50 XP', value: 50, probability: 0.01 },
  ];

  // Check if user can spin today
  useEffect(() => {
    if (!user?.id) return;
    
    const checkLastSpin = () => {
      const lastSpin = localStorage.getItem(`daily_spin_${user.id}`);
      if (lastSpin) {
        const lastSpinDate = new Date(lastSpin);
        const today = new Date();
        
        // Check if last spin was today
        const isSameDay = lastSpinDate.toDateString() === today.toDateString();
        setCanSpin(!isSameDay);
      } else {
        setCanSpin(true);
      }
    };
    
    checkLastSpin();
  }, [user?.id]);

  const getRandomPrize = () => {
    const rand = Math.random();
    let cumulative = 0;
    
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (rand <= cumulative) {
        return prize;
      }
    }
    
    return prizes[0]; // fallback
  };

  const onSpin = async () => {
    if (spinning || !canSpin || !user?.id) return;
    
    setSpinning(true);
    setWinLabel(null);
    
    const wonPrize = getRandomPrize();
    const prizeLabels = prizes.map(p => p.label);
    const index = prizeLabels.indexOf(wonPrize.label);
    
    const slice = 360 / prizes.length;
    const base = 360 * 5; // full turns for animation
    setRotation((prev) => {
      const currentMod = ((prev % 360) + 360) % 360;
      const targetMod = (360 - (index * slice + slice / 2) + 360) % 360; // align slice center to top pointer
      const offset = (targetMod - currentMod + 360) % 360; // minimal positive offset to reach target
      const delta = base + offset;
      
      // Schedule label update and XP award when animation completes
      setTimeout(async () => {
        setWinLabel(wonPrize.label);
        
        // Award XP to user
        if (wonPrize.value > 0) {
          await addUserXP(wonPrize.value);
        }
        
        // Mark spin as used for today
        const now = new Date().toISOString();
        localStorage.setItem(`daily_spin_${user.id}`, now);
        setCanSpin(false);
        setSpinning(false);
      }, 2000);
      
      return prev + delta;
    });
  };

  const size = 220; // px, smaller wheel
  const r = size / 2;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] px-5 py-4">

      <div className="mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-6">
        {/* Left: title + button */}
        <div className="md:col-span-3 w-full text-center md:text-left">
          <div className="text-4xl md:text-5xl leading-tight font-extrabold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-4 md:mb-6">Daily Spin</div>
          <div className="mt-5 md:mt-6 flex md:block items-center justify-center md:justify-start">
            <button
              onClick={onSpin}
              disabled={spinning || !canSpin || !user?.id}
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold border border-gray-300 ${
                spinning || !canSpin || !user?.id
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
              }`}
            >
              {!user?.id ? 'Sign In to Spin' : spinning ? 'Spinning...' : !canSpin ? 'Come Back Tomorrow' : 'Spin Now'}
            </button>
          </div>
        </div>

        {/* Middle: Wheel container (centered) */}
        <div className="md:col-span-6 flex items-center justify-center" style={{ minHeight: size + 40 }}>
          <div className="relative mt-4" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full border border-gray-300 bg-white"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 2s cubic-bezier(0.22, 1, 0.36, 1)' : 'none' }}
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="sliceBlueLight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
              <linearGradient id="sliceBlueDark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
            </defs>
            {/* Slices */}
            {prizes.map((_, i) => {
              const start = (2 * Math.PI * i) / prizes.length;
              const end = (2 * Math.PI * (i + 1)) / prizes.length;
              const x1 = r + r * Math.cos(start);
              const y1 = r + r * Math.sin(start);
              const x2 = r + r * Math.cos(end);
              const y2 = r + r * Math.sin(end);
              const largeArc = end - start > Math.PI ? 1 : 0;
              const fill = i % 2 === 0 ? 'url(#sliceBlueLight)' : 'url(#sliceBlueDark)';
              return (
                <g key={i}>
                  <path d={`M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={fill} stroke="#D1D5DB" strokeWidth="1" />
                </g>
              );
            })}
            {/* Tick marks */}
            {Array.from({ length: prizes.length }).map((_, i) => {
              const angle = (2 * Math.PI * i) / prizes.length;
              const x1t = r + (r - 10) * Math.cos(angle);
              const y1t = r + (r - 10) * Math.sin(angle);
              const x2t = r + (r - 2) * Math.cos(angle);
              const y2t = r + (r - 2) * Math.sin(angle);
              return <line key={`tick-${i}`} x1={x1t} y1={y1t} x2={x2t} y2={y2t} stroke="#9CA3AF" strokeWidth={1} />;
            })}
            {/* Labels */}
            {prizes.map((prize, i) => {
              const angle = (360 / prizes.length) * (i + 0.5);
              return (
                <g key={`t-${i}`} transform={`rotate(${angle} ${r} ${r})`}>
                  <text x={r} y={r - (size/2 - 34)} textAnchor="middle" fontSize="12" fontWeight={800} fill="#111827">
                    {prize.label}
                  </text>
                </g>
              );
            })}
          </svg>
          {/* Hub center: simple black circle, perfectly centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black" />
          </div>
        </div>
        {/* Pointer outside: black arrow (points down) */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-[16px] border-l-transparent border-r-transparent border-t-black" />
        </div>
        </div>
        </div>
        {/* Right: Success message side panel */}
        <div className="md:col-span-3 mt-4 md:mt-0 flex flex-col items-center md:items-start">
          <div className="mt-2 min-h-[2.25rem] w-full">
            <div className="relative">
              {/* Glow ring */}
              <div className={`absolute -inset-[1px] rounded-lg blur-md transition-all duration-300 ${winLabel ? 'bg-gradient-to-r from-fuchsia-500/30 via-indigo-500/30 to-cyan-500/30' : 'bg-gradient-to-r from-slate-300/10 to-slate-600/10'}`} aria-hidden />
              {/* Message container */}
              <div className={`relative w-full rounded-lg px-4 py-2 backdrop-blur-sm border transition-all duration-300 flex items-center ${
                winLabel
                  ? 'bg-white/5 border-white/15 text-white shadow-[0_0_24px_rgba(168,85,247,0.25)]'
                  : 'bg-white/3 dark:bg-white/5 border-white/10 text-gray-300'
              }`}>
                <span className="font-semibold tracking-wide">
                  {winLabel ? `Won ${winLabel}` : 'Spin & Win!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
