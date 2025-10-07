import React, { useMemo, useState, useEffect } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

const RaidGames: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [rank, setRank] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [scratchResult, setScratchResult] = useState<string | null>(null);
  
  // New game states
  const [isPickingCard, setIsPickingCard] = useState<boolean>(false);
  const [cardResult, setCardResult] = useState<string | null>(null);
  const [isRollingDice, setIsRollingDice] = useState<boolean>(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isSpinningSlots, setIsSpinningSlots] = useState<boolean>(false);
  const [slotsResult, setSlotsResult] = useState<string | null>(null);
  const [isPlayingMemory, setIsPlayingMemory] = useState<boolean>(false);
  const [memoryResult, setMemoryResult] = useState<string | null>(null);
  const [isGuessingNumber, setIsGuessingNumber] = useState<boolean>(false);
  const [numberGuess, setNumberGuess] = useState<number | null>(null);
  const [guessResult, setGuessResult] = useState<string | null>(null);

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user || !supabase) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_name, x_handle')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error loading profile:', error);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    loadProfile();
  }, [user, supabase]);

  // Mock data for demonstration - in real app, this would come from your backend
  useEffect(() => {
    // Simulate loading user's raid stats
    setPoints(1250); // User's current points
    setTotalXp(2840); // User's total XP earned
    setRank(47); // User's current rank
  }, []);

  // Get avatar source
  const avatarSrc = profile?.avatar_name 
    ? `/images/avatars/${profile.avatar_name}.webp`
    : '/images/user/user1.webp';
  
  const displayName = profile?.username || 'User';

  // Prize pool for Spin Wheel and Scratch Card
  const prizes = useMemo(() => [
    { label: 'No Luck', value: 0, odds: 30 },
    { label: '+15 XP', value: 15, odds: 20 },
    { label: '+20 XP', value: 20, odds: 15 },
    { label: '+25 XP', value: 25, odds: 10 },
    { label: '+60 XP', value: 60, odds: 5 },
  ], []);

  const getRandomPrize = () => {
    const random = Math.random() * 100;
    let cumulative = 0;
    for (const prize of prizes) {
      cumulative += prize.odds;
      if (random <= cumulative) return prize;
    }
    return prizes[0];
  };

  const handleSpin = () => {
    if (isSpinning || points < 50) return; // Cost 50 points to spin
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      const prize = getRandomPrize();
      setSpinResult(prize.label);
      setPoints(prev => prev - 50); // Deduct spin cost
      if (prize.value > 0) {
        setTotalXp(prev => prev + prize.value); // Add XP reward
      }
      setIsSpinning(false);
    }, 2000);
  };

  const handleScratch = () => {
    if (isScratching || points < 30) return; // Cost 30 points to scratch
    setIsScratching(true);
    setScratchResult(null);

    setTimeout(() => {
      const prize = getRandomPrize();
      setScratchResult(prize.label);
      setPoints(prev => prev - 30); // Deduct scratch cost
      if (prize.value > 0) {
        setTotalXp(prev => prev + prize.value); // Add XP reward
      }
      setIsScratching(false);
    }, 1500);
  };

  // Pick a Card Game
  const handlePickCard = () => {
    if (isPickingCard || points < 25) return; // Cost 25 points
    setIsPickingCard(true);
    setCardResult(null);

    setTimeout(() => {
      const prize = getRandomPrize();
      setCardResult(prize.label);
      setPoints(prev => prev - 25);
      if (prize.value > 0) {
        setTotalXp(prev => prev + prize.value);
      }
      setIsPickingCard(false);
    }, 2000);
  };

  // Dice Roll Game
  const handleDiceRoll = () => {
    if (isRollingDice || points < 20) return; // Cost 20 points
    setIsRollingDice(true);
    setDiceResult(null);

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceResult(roll);
      setPoints(prev => prev - 20);
      
      // Higher numbers give more XP
      const xpReward = roll * 5; // 5-30 XP based on roll
      setTotalXp(prev => prev + xpReward);
      setIsRollingDice(false);
    }, 1500);
  };

  // Slot Machine Game
  const handleSlotMachine = () => {
    if (isSpinningSlots || points < 40) return; // Cost 40 points
    setIsSpinningSlots(true);
    setSlotsResult(null);

    setTimeout(() => {
      const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];
      const result = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]).join(' ');
      setSlotsResult(result);
      setPoints(prev => prev - 40);
      
      // Check for matches
      const symbolsArray = result.split(' ');
      if (symbolsArray[0] === symbolsArray[1] && symbolsArray[1] === symbolsArray[2]) {
        const xpReward = symbolsArray[0] === '💎' ? 100 : 50; // Diamond jackpot!
        setTotalXp(prev => prev + xpReward);
      } else if (symbolsArray[0] === symbolsArray[1] || symbolsArray[1] === symbolsArray[2] || symbolsArray[0] === symbolsArray[2]) {
        setTotalXp(prev => prev + 20); // Partial match
      }
      setIsSpinningSlots(false);
    }, 3000);
  };

  // Memory Game
  const handleMemoryGame = () => {
    if (isPlayingMemory || points < 35) return; // Cost 35 points
    setIsPlayingMemory(true);
    setMemoryResult(null);

    setTimeout(() => {
      const success = Math.random() < 0.3; // 30% success rate
      setMemoryResult(success ? 'Memory Master!' : 'Try Again');
      setPoints(prev => prev - 35);
      
      if (success) {
        setTotalXp(prev => prev + 40);
      }
      setIsPlayingMemory(false);
    }, 2000);
  };

  // Number Guessing Game
  const handleNumberGuess = () => {
    if (isGuessingNumber || points < 15) return; // Cost 15 points
    setIsGuessingNumber(true);
    setGuessResult(null);

    setTimeout(() => {
      const targetNumber = Math.floor(Math.random() * 10) + 1;
      const userGuess = Math.floor(Math.random() * 10) + 1; // Simulated user guess
      setNumberGuess(userGuess);
      
      if (userGuess === targetNumber) {
        setGuessResult('Perfect Match!');
        setTotalXp(prev => prev + 60);
      } else if (Math.abs(userGuess - targetNumber) <= 1) {
        setGuessResult('Close!');
        setTotalXp(prev => prev + 20);
      } else {
        setGuessResult('Not quite');
      }
      
      setPoints(prev => prev - 15);
      setIsGuessingNumber(false);
    }, 1800);
  };

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
              <div className="mt-0.5 text-lg font-bold text-indigo-900 dark:text-indigo-100">{totalXp.toLocaleString()}</div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-indigo-400/0 via-indigo-400/10 to-indigo-400/0" />
            </div>
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-emerald-300/60 dark:border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10">
              <div className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-widest">Points</div>
              <div className="mt-0.5 text-lg font-bold text-emerald-900 dark:text-emerald-100">{points.toLocaleString()}</div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-emerald-400/0 via-emerald-400/10 to-emerald-400/0" />
            </div>
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-amber-300/60 dark:border-amber-500/40 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10">
              <div className="text-xs uppercase font-bold text-amber-700 dark:text-amber-300 tracking-widest">Rank</div>
              <div className="mt-0.5 text-lg font-bold text-amber-900 dark:text-amber-100">#{rank}</div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-400/0 via-amber-400/10 to-amber-400/0" />
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Level Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{totalXp.toLocaleString()} / 1,000 XP</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-green-500 via-brand-500 to-purple-500 rounded-full animate-pulse" style={{ width: `${Math.min((totalXp / 1000) * 100, 100)}%` }}></div>
            </div>
            <div className="flex items-center justify-end mt-2 text-xs text-green-700 dark:text-green-400">
              <span className="font-semibold">Earn +100 Points</span>
            </div>
          </div>

          {/* Introduction Text */}
          <div className="mt-6 text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Use Your Raid Points to Play Games!
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Spend your Raid points on exciting games to win XP bonuses and prizes!
            </div>
          </div>
        </ComponentCard>

        {/* Games Section */}
        <ComponentCard title="Available Games" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Spin Wheel Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-8 text-center">
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Spin Wheel</div>
                <div className="text-lg text-gray-600 dark:text-gray-400">50 points to play</div>
              </div>

              {/* Wheel Visual */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className={`w-full h-full rounded-full border-6 border-brand-500 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}>
                  <div className="w-36 h-36 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border-3 border-yellow-400">
                    {isSpinning ? (
                      <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">SPINNING...</div>
                    ) : spinResult ? (
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">You won</div>
                        <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">{spinResult}</div>
                      </div>
                    ) : (
                      <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">SPIN!</div>
                    )}
                  </div>
                </div>
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-red-600 drop-shadow-lg"></div>
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning || points < 50}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  points >= 50 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_6px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_8px_24px_rgba(168,85,247,0.5)]' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSpinning ? 'Spinning...' : points >= 50 ? 'Spin Now (50 points)' : 'Need 50 points'}
              </button>
            </div>

            {/* Scratch Card Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-8 text-center">
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Scratch Card</div>
                <div className="text-lg text-gray-600 dark:text-gray-400">30 points to play</div>
              </div>

              {/* Scratch Card Visual */}
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-xl overflow-hidden border-3 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                {isScratching || scratchResult ? (
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    {isScratching ? (
                      <div className="text-lg font-black text-white animate-pulse">SCRATCHING...</div>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm text-white/80 uppercase">You won</div>
                        <div className="text-2xl font-black text-white drop-shadow-lg">{scratchResult}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center relative">
                    <div className="text-2xl font-black text-white/30">SCRATCH ME</div>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.1)_8px,rgba(255,255,255,0.1)_16px)]"></div>
                  </div>
                )}
              </div>

              {/* Scratch Button */}
              <button
                onClick={handleScratch}
                disabled={isScratching || points < 30}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  points >= 30 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white shadow-[0_6px_20px_rgba(234,179,8,0.4)] hover:shadow-[0_8px_24px_rgba(234,179,8,0.5)]' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isScratching ? 'Scratching...' : points >= 30 ? 'Scratch Now (30 points)' : 'Need 30 points'}
              </button>
            </div>

            {/* Pick a Card Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center">
              <div className="mb-4">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pick a Card</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">25 points to play</div>
              </div>

              {/* Card Visual */}
              <div className="relative w-32 h-40 mx-auto mb-4">
                <div className={`w-full h-full rounded-lg border-2 border-red-500 bg-gradient-to-br from-red-500 to-pink-600 shadow-lg flex items-center justify-center ${isPickingCard ? 'animate-pulse' : ''}`}>
                  {isPickingCard ? (
                    <div className="text-white font-bold text-sm">PICKING...</div>
                  ) : cardResult ? (
                    <div className="text-center text-white">
                      <div className="text-xs mb-1">You got</div>
                      <div className="text-lg font-bold">{cardResult}</div>
                    </div>
                  ) : (
                    <div className="text-white font-bold text-sm">🎴 PICK</div>
                  )}
                </div>
              </div>

              <button
                onClick={handlePickCard}
                disabled={isPickingCard || points < 25}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  points >= 25 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPickingCard ? 'Picking...' : points >= 25 ? 'Pick Card (25 points)' : 'Need 25 points'}
              </button>
            </div>

            {/* Dice Roll Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center">
              <div className="mb-4">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dice Roll</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">20 points to play</div>
              </div>

              {/* Dice Visual */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className={`w-full h-full rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center ${isRollingDice ? 'animate-bounce' : ''}`}>
                  {isRollingDice ? (
                    <div className="text-white font-bold text-2xl animate-spin">🎲</div>
                  ) : diceResult ? (
                    <div className="text-white font-bold text-3xl">{diceResult}</div>
                  ) : (
                    <div className="text-white font-bold text-2xl">🎲</div>
                  )}
                </div>
              </div>

              <button
                onClick={handleDiceRoll}
                disabled={isRollingDice || points < 20}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  points >= 20 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRollingDice ? 'Rolling...' : points >= 20 ? 'Roll Dice (20 points)' : 'Need 20 points'}
              </button>
            </div>

            {/* Slot Machine Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center">
              <div className="mb-4">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Slot Machine</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">40 points to play</div>
              </div>

              {/* Slot Visual */}
              <div className="relative w-32 h-16 mx-auto mb-4 rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg flex items-center justify-center">
                {isSpinningSlots ? (
                  <div className="text-white font-bold text-2xl animate-pulse">🎰</div>
                ) : slotsResult ? (
                  <div className="text-white font-bold text-xl">{slotsResult}</div>
                ) : (
                  <div className="text-white font-bold text-lg">🎰 🎰 🎰</div>
                )}
              </div>

              <button
                onClick={handleSlotMachine}
                disabled={isSpinningSlots || points < 40}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  points >= 40 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSpinningSlots ? 'Spinning...' : points >= 40 ? 'Spin Slots (40 points)' : 'Need 40 points'}
              </button>
            </div>

            {/* Memory Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center">
              <div className="mb-4">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Memory Match</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">35 points to play</div>
              </div>

              {/* Memory Visual */}
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-lg border-2 border-green-500 bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg flex items-center justify-center">
                {isPlayingMemory ? (
                  <div className="text-white font-bold text-sm animate-pulse">🧠</div>
                ) : memoryResult ? (
                  <div className="text-center text-white">
                    <div className="text-xs mb-1">{memoryResult}</div>
                    <div className="text-lg">🧠</div>
                  </div>
                ) : (
                  <div className="text-white font-bold text-lg">🧠</div>
                )}
              </div>

              <button
                onClick={handleMemoryGame}
                disabled={isPlayingMemory || points < 35}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  points >= 35 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPlayingMemory ? 'Playing...' : points >= 35 ? 'Play Memory (35 points)' : 'Need 35 points'}
              </button>
            </div>

            {/* Number Guessing Game */}
            <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center">
              <div className="mb-4">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Number Guess</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">15 points to play</div>
              </div>

              {/* Number Visual */}
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-lg border-2 border-orange-500 bg-gradient-to-br from-orange-500 to-red-600 shadow-lg flex items-center justify-center">
                {isGuessingNumber ? (
                  <div className="text-white font-bold text-2xl animate-pulse">?</div>
                ) : numberGuess ? (
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">{numberGuess}</div>
                    <div className="text-xs">{guessResult}</div>
                  </div>
                ) : (
                  <div className="text-white font-bold text-2xl">?</div>
                )}
              </div>

              <button
                onClick={handleNumberGuess}
                disabled={isGuessingNumber || points < 15}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  points >= 15 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isGuessingNumber ? 'Guessing...' : points >= 15 ? 'Guess Number (15 points)' : 'Need 15 points'}
              </button>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default RaidGames;
