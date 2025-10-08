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
  const [isScratching, setIsScratching] = useState<boolean>(false); // active scratch session
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [scratchResult, setScratchResult] = useState<string | null>(null);
  const [scratchCoverCleared, setScratchCoverCleared] = useState<boolean>(false);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement | null>(null);
  const isPointerDownRef = React.useRef<boolean>(false);
  const lastPosRef = React.useRef<{x:number;y:number}>({x:0,y:0});
  
  // New game states
  const [isPickingCard, setIsPickingCard] = useState<boolean>(false);
  const [isRollingDice, setIsRollingDice] = useState<boolean>(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isSpinningSlots, setIsSpinningSlots] = useState<boolean>(false);
  const [slotsResult, setSlotsResult] = useState<string | null>(null);
  const [isGuessingNumber, setIsGuessingNumber] = useState<boolean>(false);
  const [numberGuess, setNumberGuess] = useState<number | null>(null);
  const [guessResult, setGuessResult] = useState<string | null>(null);
  
  // Purchase states for each game
  const [purchasedGames, setPurchasedGames] = useState<Set<string>>(new Set());

  // Pick a Card - XP randomization with probability
  const [cardXpValues, setCardXpValues] = useState<number[]>([]);
  
  const getRandomPrizeByProbability = () => {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    const prizes = [
      { xp: 1, probability: 35 },
      { xp: 5, probability: 25 },
      { xp: 10, probability: 15 },
      { xp: 15, probability: 10 },
      { xp: 20, probability: 7 },
      { xp: 25, probability: 4 },
      { xp: 30, probability: 3 },
      { xp: 50, probability: 1 },
    ];
    
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        return prize.xp;
      }
    }
    return 1; // Fallback
  };
  
  const initializeCardXp = () => {
    // One card is always "No Luck" (0 XP)
    // Two other cards have prizes based on probability
    const prize1 = getRandomPrizeByProbability();
    const prize2 = getRandomPrizeByProbability();
    
    // Create array with one "No Luck" and two prizes
    const prizes = [0, prize1, prize2];
    
    // Shuffle the array to randomize positions
    const shuffled = prizes.sort(() => Math.random() - 0.5);
    setCardXpValues(shuffled);
  };

  // Purchase function
  const purchaseGame = (gameId: string, cost: number) => {
    if (points >= cost) {
      setPoints(prev => prev - cost);
      setPurchasedGames(prev => new Set([...prev, gameId]));
      
      // Initialize card XP values when Pick a Card is purchased
      if (gameId === 'pick-card') {
        initializeCardXp();
      }
    }
  };

  // Function to reset game after playing
  const resetGameAfterPlay = (gameId: string) => {
    setPurchasedGames(prev => {
      const newSet = new Set(prev);
      newSet.delete(gameId);
      return newSet;
    });
  };

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
      // Reset game after playing
      resetGameAfterPlay('fortune-spin');
    }, 2000);
  };

  // Initialize scratch canvas cover when activating scratch session
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D | null;
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width || 288;
    const cssH = rect.height || 288;
    canvas.width = Math.max(1, Math.floor(cssW * ratio));
    canvas.height = Math.max(1, Math.floor(cssH * ratio));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    // Opaque purple gradient cover (revealed with destination-out while scratching)
    const grad = ctx.createLinearGradient(0, 0, cssW, cssH);
    grad.addColorStop(0, '#7c3aed'); // violet-600
    grad.addColorStop(0.5, '#a78bfa'); // violet-300
    grad.addColorStop(1, '#6d28d9'); // violet-700
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cssW, cssH);
  }, [isScratching]);

  const beginScratch = () => {
    if (isScratching || points < 30) return;
    setScratchResult(null);
    setScratchCoverCleared(false);
    setIsScratching(true);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    try { (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId); } catch {}
    e.preventDefault();
    isPointerDownRef.current = true;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPosRef.current = { x, y };
    // start scratching immediately at press point
    scratchAt(x, y);
  };
  const scratchAt = (x:number, y:number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current || !isScratching) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // interpolate along line for smooth coverage
    const last = lastPosRef.current;
    const dx = x - last.x;
    const dy = y - last.y;
    const dist = Math.hypot(dx, dy);
    const step = 8;
    for (let i = 0; i <= dist; i += step) {
      const t = i / (dist || 1);
      scratchAt(last.x + dx * t, last.y + dy * t);
    }
    lastPosRef.current = { x, y };
  };
  const onPointerUp = () => {
    if (!isScratching) return;
    isPointerDownRef.current = false;
    // Check cleared percentage
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const data = ctx.getImageData(0, 0, Math.max(1, Math.floor(rect.width * ratio)), Math.max(1, Math.floor(rect.height * ratio))).data;
    let cleared = 0;
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha === 0) cleared++;
    }
    const clearedPct = (cleared / (data.length / 4)) * 100;
    if (clearedPct >= 45 && !scratchCoverCleared) {
      setScratchCoverCleared(true);
      // finalize: deduct points and award prize
      const prize = getRandomPrize();
      setScratchResult(prize.label);
      setPoints(prev => prev - 30);
      if (prize.value > 0) setTotalXp(prev => prev + prize.value);
      // end session (keep cover hidden)
      setIsScratching(false);
      // Reset game after playing
      resetGameAfterPlay('scratch-card');
    }
  };

  // Pick a Card Game - Interactive card flipping (3 cards)
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  
  const cardDefinitions = [
    { symbol: '♠', value: 'A', color: 'black' }, // Ace of Spades (black)
    { symbol: '♥', value: 'Q', color: 'red' },   // Queen of Hearts (red)
    { symbol: '♦', value: 'K', color: 'green' }, // King of Diamonds (green)
  ];

  const handleCardClick = (cardIndex: number) => {
    if (!purchasedGames.has('pick-card') || isPickingCard || selectedCard !== null) return;
    
    setIsPickingCard(true);
    setSelectedCard(cardIndex);
    
    // Flip the selected card after a short delay
    setTimeout(() => {
      setFlippedCards(new Set([cardIndex]));
      
      // Reveal prize
      const xpWon = cardXpValues[cardIndex];
      if (xpWon > 0) {
        setTotalXp(prev => prev + xpWon);
      }
      setPoints(prev => prev - 25);
      
      // Reset after showing result
      setTimeout(() => {
        setFlippedCards(new Set());
        setSelectedCard(null);
        setIsPickingCard(false);
        // Randomize card positions for next round
        initializeCardXp();
        // Reset game after playing
        resetGameAfterPlay('pick-card');
      }, 3000);
    }, 400);
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
      // Reset game after playing
      resetGameAfterPlay('dice-roll');
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
      // Reset game after playing
      resetGameAfterPlay('slot-machine');
    }, 3000);
  };

  // Memory Match game removed per request

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
      // Reset game after playing
      resetGameAfterPlay('number-guess');
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
            {/* Fortune Spin Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                50 Points
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Fortune Spin</div>
                </div>

                {/* Wheel Visual */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className={`w-full h-full rounded-full border-6 border-brand-500 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}>
                    <div className="w-36 h-36 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border-3 border-yellow-400 overflow-hidden">
                      {spinResult ? (
                        <div className="text-center">
                          <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">You won</div>
                          <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">{spinResult}</div>
                        </div>
                      ) : (
                        <img
                          src="/images/raidgames/clover.webp"
                          alt="clover"
                          className={`w-12 h-12 ${isSpinning ? 'animate-spin' : ''}`}
                        />
                      )}
                    </div>
                  </div>
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-red-600 drop-shadow-lg"></div>
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('fortune-spin') 
                    ? (isSpinning ? undefined : handleSpin)
                    : (points >= 50 ? () => purchaseGame('fortune-spin', 50) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('fortune-spin') 
                    ? (points >= 50 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                    : (points >= 50 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSpinning 
                  ? 'Spinning...' 
                  : purchasedGames.has('fortune-spin') 
                    ? (points >= 50 ? 'Play Now' : 'Insufficient Points')
                    : (points >= 50 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Scratch Card Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-yellow-300 dark:hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                30 Points
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Scratch Card</div>
                </div>

                {/* Scratch Card Visual - real scratch with canvas (200x200) */}
                <div className="relative w-[200px] h-[200px] mx-auto mb-6 rounded-lg border-4 border-gray-300 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden" ref={canvasContainerRef}>
                  {/* Prize layer (below) */}
                  <div className="absolute inset-0 flex items-center justify-center select-none z-0">
                    {scratchResult ? (
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-300 uppercase">You won</div>
                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 drop-shadow">{scratchResult}</div>
                      </div>
                    ) : (
                      <img src="/images/raidgames/scratchcard.webp" alt="prize" className="w-full h-full object-cover" />
                    )}
                  </div>
                  {/* Cover canvas (top) - only visible/interactive when isScratching and not cleared */}
                  {(!scratchCoverCleared) && (
                    <>
                      <canvas
                        ref={canvasRef}
                        className={`${isScratching ? '' : 'pointer-events-none opacity-95'} absolute inset-0 w-full h-full touch-none select-none cursor-grab active:cursor-grabbing z-10`}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        onPointerLeave={onPointerUp}
                        onContextMenu={(e)=>{e.preventDefault();}}
                      />
                      {!isScratching && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700/70 text-lg font-semibold bg-white/0">
                          Scratch disabled
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('scratch-card') 
                    ? (isScratching ? undefined : beginScratch)
                    : (points >= 30 ? () => purchaseGame('scratch-card', 30) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('scratch-card') 
                    ? (points >= 30 
                        ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                    : (points >= 30 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isScratching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isScratching 
                  ? 'Scratching...' 
                  : purchasedGames.has('scratch-card') 
                    ? (points >= 30 ? 'Play Now' : 'Insufficient Points')
                    : (points >= 30 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Pick a Card Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-red-300 dark:hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] dark:hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                25 Points
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-3">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Pick a Card</div>
                </div>

                {/* Interactive Cards - 3 Cards Horizontal */}
                <div className="flex justify-center gap-5 flex-1 items-start pt-4">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      onClick={() => purchasedGames.has('pick-card') && !isPickingCard && handleCardClick(index)}
                      className={`relative w-32 h-48 cursor-pointer transition-all duration-700 ${
                        !purchasedGames.has('pick-card') ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                      } ${selectedCard === index ? 'scale-110' : ''}`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: flippedCards.has(index) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        perspective: '1000px',
                      }}
                    >
                      {/* Card Front (Shows playing card face) */}
                      <div
                        className="absolute inset-0 rounded-lg border-2 shadow-xl flex flex-col items-center justify-center p-3"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          background: index === 0 
                            ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' 
                            : index === 1 
                            ? 'linear-gradient(145deg, #350617, #8b0000)'
                            : 'linear-gradient(145deg, #0a3b0a, #1a5d1a)',
                          borderColor: index === 0 ? '#444' : index === 1 ? '#c0392b' : '#2a782a',
                        }}
                      >
                        {/* Card pattern overlay */}
                        <div className="absolute inset-0 opacity-15 rounded-lg"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 1px, transparent 1px), radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                          }}
                        ></div>
                        
                        {/* Playing card symbol and value */}
                        <div className="text-white text-5xl mb-2" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>
                          {cardDefinitions[index].symbol}
                        </div>
                        <div className="text-white text-4xl font-bold" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>
                          {cardDefinitions[index].value}
                        </div>

                        {/* Card edges effect */}
                        <div className="absolute inset-0 rounded-lg border-2 border-black/30"
                          style={{
                            boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.1)',
                          }}
                        ></div>
                      </div>

                      {/* Card Back (Shows XP prize when flipped) */}
                      <div
                        className="absolute inset-0 rounded-lg border-2 shadow-xl flex flex-col items-center justify-center p-3"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          background: cardXpValues[index] === 0 
                            ? 'linear-gradient(145deg, #3a3a3a, #1a1a1a)' 
                            : 'linear-gradient(145deg, #1a5d1a, #2a782a)',
                          borderColor: cardXpValues[index] === 0 ? '#6b7280' : '#4ade80',
                        }}
                      >
                        {/* Card pattern overlay */}
                        <div className="absolute inset-0 opacity-15 rounded-lg"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 1px, transparent 1px), radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                          }}
                        ></div>

                        {/* XP Prize Display */}
                        <div className="text-center">
                          <div className="text-white text-4xl font-bold mb-1" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>
                            {cardXpValues[index] === 0 ? 'No Luck' : cardXpValues[index] ? `+${cardXpValues[index]} XP` : ''}
                          </div>
                          <div className="text-white text-sm opacity-80">
                            {cardXpValues[index] === 0 ? 'Try Again!' : 'You Won!'}
                          </div>
                        </div>

                        {/* Card edges effect */}
                        <div className="absolute inset-0 rounded-lg border-2 border-black/30"
                          style={{
                            boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.1)',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('pick-card') 
                    ? undefined
                    : (points >= 25 ? () => purchaseGame('pick-card', 25) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('pick-card') 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white cursor-default' 
                    : (points >= 25 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                }`}
              >
                {purchasedGames.has('pick-card') 
                  ? 'Pick a Card Above'
                  : (points >= 25 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Dice Roll Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                20 Points
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Dice Roll</div>
                </div>

                {/* Dice Visual */}
                <div className="relative w-20 h-20 mx-auto mb-6">
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
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('dice-roll') 
                    ? (isRollingDice ? undefined : handleDiceRoll)
                    : (points >= 20 ? () => purchaseGame('dice-roll', 20) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('dice-roll') 
                    ? (points >= 20 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                    : (points >= 20 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isRollingDice ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRollingDice 
                  ? 'Rolling...' 
                  : purchasedGames.has('dice-roll') 
                    ? (points >= 20 ? 'Play Now' : 'Insufficient Points')
                    : (points >= 20 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Slot Machine Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                40 Points
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Slot Machine</div>
                </div>

                {/* Slot Visual */}
                <div className="relative w-32 h-16 mx-auto mb-6 rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg flex items-center justify-center">
                  {isSpinningSlots ? (
                    <div className="text-white font-bold text-2xl animate-pulse">🎰</div>
                  ) : slotsResult ? (
                    <div className="text-white font-bold text-xl">{slotsResult}</div>
                  ) : (
                    <div className="text-white font-bold text-lg">🎰 🎰 🎰</div>
                  )}
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('slot-machine') 
                    ? (isSpinningSlots ? undefined : handleSlotMachine)
                    : (points >= 40 ? () => purchaseGame('slot-machine', 40) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('slot-machine') 
                    ? (points >= 40 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                    : (points >= 40 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isSpinningSlots ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSpinningSlots 
                  ? 'Spinning...' 
                  : purchasedGames.has('slot-machine') 
                    ? (points >= 40 ? 'Play Now' : 'Insufficient Points')
                    : (points >= 40 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Number Guessing Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                15 Points
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Number Guess</div>
                </div>

                {/* Number Visual */}
                <div className="relative w-20 h-20 mx-auto mb-6 rounded-lg border-2 border-orange-500 bg-gradient-to-br from-orange-500 to-red-600 shadow-lg flex items-center justify-center">
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
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('number-guess') 
                    ? (isGuessingNumber ? undefined : handleNumberGuess)
                    : (points >= 15 ? () => purchaseGame('number-guess', 15) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('number-guess') 
                    ? (points >= 15 
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                    : (points >= 15 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isGuessingNumber ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isGuessingNumber 
                  ? 'Guessing...' 
                  : purchasedGames.has('number-guess') 
                    ? (points >= 15 ? 'Play Now' : 'Insufficient Points')
                    : (points >= 15 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default RaidGames;
