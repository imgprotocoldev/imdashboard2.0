import React, { useMemo, useState, useEffect, useRef } from 'react';
import ComponentCard from '../components/common/ComponentCard';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { useRaidProfile } from '../hooks/useRaidProfile';

const RaidGames: React.FC = () => {
  const { user, supabase } = useSupabaseAuth();
  const { 
    profile: raidProfile, 
    currentRank, 
    nextRank, 
    addUserPoints,
    addUserXP,
    spendPoints,
    getProgressToNextRank 
  } = useRaidProfile();
  const [profile, setProfile] = useState<{ username: string; avatar_name: string | null; x_handle?: string | null } | null>(null);
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
  const [isFlippingCoin, setIsFlippingCoin] = useState<boolean>(false);
  const [coinChoice, setCoinChoice] = useState<'heads' | 'tails' | null>(null);
  const [coinResult, setCoinResult] = useState<'heads' | 'tails' | null>(null);
  const [coinWinAmount, setCoinWinAmount] = useState<number | null>(null);
  
  // Purchase states for each game
  const [purchasedGames, setPurchasedGames] = useState<Set<string>>(new Set());

  // Pick a Card - Points randomization with probability
  const [cardPointValues, setCardPointValues] = useState<number[]>([]);
  
  const getRandomPrizeByProbability = () => {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    const prizes = [
      { points: 0, probability: 25 },
      { points: 5, probability: 25 },
      { points: 10, probability: 20 },
      { points: 15, probability: 15 },
      { points: 25, probability: 15 },
    ];
    
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        return prize.points;
      }
    }
    return 0; // Fallback
  };
  
  const initializeCardPoints = () => {
    // One card is always "No Luck" (0 Points)
    // Two other cards have prizes based on probability
    const prize1 = getRandomPrizeByProbability();
    const prize2 = getRandomPrizeByProbability();
    
    // Create array with one "No Luck" and two prizes
    const prizes = [0, prize1, prize2];
    
    // Shuffle the array to randomize positions
    const shuffled = prizes.sort(() => Math.random() - 0.5);
    setCardPointValues(shuffled);
  };

  // Purchase function
  const purchaseGame = async (gameId: string, cost: number) => {
    const success = await spendPoints(cost);
    if (success) {
      setPurchasedGames(prev => new Set([...prev, gameId]));
      
      // Initialize card Points values when Pick a Card is purchased
      if (gameId === 'pick-card') {
        initializeCardPoints();
      }
    } else {
      alert('Insufficient points!');
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

  // Profile data now comes from useRaidProfile hook - no need for mock data

  // Get avatar source
  const avatarSrc = profile?.avatar_name 
    ? `/images/avatars/${profile.avatar_name}.webp`
    : '/images/user/user1.webp';
  
  const displayName = profile?.username || 'User';

  // Prize pool for Spin Wheel and Scratch Card
  const prizes = useMemo(() => [
    { label: 'No Luck', value: 0, odds: 20 },
    { label: '+2 Points', value: 2, odds: 30 },
    { label: '+5 Points', value: 5, odds: 25 },
    { label: '+10 Points', value: 10, odds: 15 },
    { label: '+15 Points', value: 15, odds: 7 },
    { label: '+25 Points', value: 25, odds: 3 },
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

  const handleSpin = async () => {
    if (isSpinning || !purchasedGames.has('fortune-spin')) return;
    
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(async () => {
      const prize = getRandomPrize();
      setSpinResult(prize.label);
      if (prize.value > 0) {
        await addUserPoints(prize.value); // Add Points reward to Supabase
      }
      await addUserXP(10); // Add +10 XP for paid game
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

  const beginScratch = async () => {
    if (isScratching || !purchasedGames.has('scratch-card')) return;
    
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
  const scratchAt = async (x:number, y:number) => {
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
  const onPointerUp = async () => {
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
      if (prize.value > 0) {
        await addUserPoints(prize.value); // Add Points reward to Supabase
      }
      await addUserXP(10); // Add +10 XP for paid game
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

  const handleCardClick = async (cardIndex: number) => {
    if (!purchasedGames.has('pick-card') || isPickingCard || selectedCard !== null) return;
    
    setIsPickingCard(true);
    setSelectedCard(cardIndex);
    
    // Flip the selected card after a short delay
    setTimeout(async () => {
      setFlippedCards(new Set([cardIndex]));
      
      // Reveal prize
      const pointsWon = cardPointValues[cardIndex];
      if (pointsWon > 0) {
        await addUserPoints(pointsWon); // Add Points reward to Supabase
      }
      await addUserXP(10); // Add +10 XP for paid game
      
      // Reset after showing result
      setTimeout(() => {
        setFlippedCards(new Set());
        setSelectedCard(null);
        setIsPickingCard(false);
        // Randomize card positions for next round
        initializeCardPoints();
        // Reset game after playing
        resetGameAfterPlay('pick-card');
      }, 3000);
    }, 400);
  };

  // Dice Roll Game - Pick a number and roll
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const [diceRollClass, setDiceRollClass] = useState<string>('');
  const [diceResultMessage, setDiceResultMessage] = useState<string>('');

  const handleNumberPick = (num: number) => {
    if (!purchasedGames.has('dice-roll') || isRollingDice) return;
    
    setPickedNumber(num);
    setIsRollingDice(true);
    setDiceResult(null);
    setDiceResultMessage('');
    
    // Toggle roll class for animation
    setDiceRollClass(prev => prev === 'reRoll' ? '' : 'reRoll');

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceResult(roll);
      setIsRollingDice(false);
      
      // Delay the message to appear after dice stops rolling
      setTimeout(async () => {
        // Determine prize based on probabilities
        const random = Math.random() * 100;
        let pointsWon = 0;
        
        if (random <= 45) {
          pointsWon = 0; // 45% chance
        } else if (random <= 55) {
          pointsWon = 5; // 10% chance
        } else if (random <= 80) {
          pointsWon = 15; // 25% chance
        } else {
          pointsWon = 20; // 20% chance
        }
        
        if (roll === num) {
          setDiceResultMessage(`You won! Rolled ${roll} - Earned ${pointsWon} Points`);
        } else {
          setDiceResultMessage(`You rolled ${roll}${pointsWon > 0 ? ` - Earned ${pointsWon} Points` : '. Better luck next time!'}`);
        }
        
        if (pointsWon > 0) {
          await addUserPoints(pointsWon);
        }
        await addUserXP(10); // Add +10 XP for paid game
      }, 700);
      
      // Reset after showing result
      setTimeout(() => {
        setDiceResult(null);
        setPickedNumber(null);
        setDiceResultMessage('');
        setDiceRollClass('');
        // Reset game after playing
        resetGameAfterPlay('dice-roll');
      }, 3700);
    }, 1500);
  };


  // Slot Machine Game
  const slotReelRef = useRef<HTMLDivElement>(null);
  const [slotResult, setSlotResult] = useState<number | null>(null);

  const handleSlotMachine = () => {
    if (isSpinningSlots || !purchasedGames.has('slot-machine')) return;
    setIsSpinningSlots(true);
    setSlotResult(null);

    const pointValues = [0, 5, 10, 15, 25]; // Points prizes
    
    // Determine result based on probabilities: 0(30%), 5(40%), 10(15%), 15(10%), 25(5%)
    const random = Math.random() * 100;
    let finalResult = 0;
    if (random <= 30) {
      finalResult = 0; // 0 points - 30%
    } else if (random <= 70) {
      finalResult = 1; // 5 points - 40%
    } else if (random <= 85) {
      finalResult = 2; // 10 points - 15%
    } else if (random <= 95) {
      finalResult = 3; // 15 points - 10%
    } else {
      finalResult = 4; // 25 points - 5%
    }
    const tMax = 2000; // 2 seconds animation
    const height = 400; // 5 items * 80px (h-20)
    const targetPosition = finalResult * 80;

    // Get the inner div that contains all the Points values
    const innerDiv = slotReelRef.current?.querySelector('div[class*="relative"]') as HTMLElement;
    if (!innerDiv) return;

    // 25 Points is at index 4, which is 4 * 80 = 320px
    const startPosition = 320; // Start at 25 Points
    
    // Reset to starting position (25 Points)
    innerDiv.style.transform = `translateY(-${startPosition}px)`;

    let start: number | undefined;
    
    const animate = async (now: number) => {
      if (!start) start = now;
      const t = now - start;

      if (innerDiv) {
        // Easing function for smooth deceleration
        const progress = Math.min(t / tMax, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        // Spin through values, landing back on first set
        const spinDistance = height + targetPosition;
        const position = startPosition + (eased * spinDistance);
        innerDiv.style.transform = `translateY(-${position}px)`;
      }

      if (t < tMax) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - land on target in the first set
        // Since we start at 480 (500 Points), we spin one full loop (560) + target
        // This brings us back to the first set at the target position
        const finalPosition = targetPosition;
        if (innerDiv) {
          innerDiv.style.transform = `translateY(-${finalPosition}px)`;
        }
        setSlotResult(finalResult);
        setIsSpinningSlots(false);
        
        // Add Points after animation completes
        await addUserPoints(pointValues[finalResult]);
        await addUserXP(10); // Add +10 XP for paid game
        
        // Reset game after showing result
        setTimeout(() => {
          setSlotResult(null);
          // Reset position for next spin (back to 25 Points)
          if (innerDiv) {
            innerDiv.style.transform = `translateY(-${startPosition}px)`;
          }
          resetGameAfterPlay('slot-machine');
        }, 3000);
      }
    };

    requestAnimationFrame(animate);
  };

  // Memory Match game removed per request

  // Coin Flip Game - Helper function to get random Points based on probability
  const getCoinFlipPoints = (): number => {
    const rand = Math.random() * 100;
    if (rand < 45) return 0;       // 45%
    if (rand < 55) return 5;       // 10% (45 + 10 = 55)
    if (rand < 80) return 15;      // 25% (55 + 25 = 80)
    return 20;                     // 20% (80 + 20 = 100)
  };

  // Coin Flip Game
  const handleCoinFlip = (choice: 'heads' | 'tails') => {
    if (isFlippingCoin || !purchasedGames.has('coin-flip')) return;
    
    setCoinChoice(choice);
    setIsFlippingCoin(true);
    setCoinResult(null);
    setCoinWinAmount(null);

    setTimeout(async () => {
      // Randomly determine the coin result
      const result: 'heads' | 'tails' = Math.random() < 0.5 ? 'heads' : 'tails';
      setCoinResult(result);
      setIsFlippingCoin(false);
      
      // Calculate points immediately
      if (result === choice) {
        // Player won! Get random Points
        const pointsWon = getCoinFlipPoints();
        setCoinWinAmount(pointsWon);
        await addUserPoints(pointsWon); // Add Points reward to Supabase
      } else {
        // Player lost
        setCoinWinAmount(0);
      }
      await addUserXP(10); // Add +10 XP for paid game
      
      // Reset after showing result
      setTimeout(() => {
        setCoinChoice(null);
        setCoinResult(null);
        setCoinWinAmount(null);
        resetGameAfterPlay('coin-flip');
      }, 3000);
    }, 1500);
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
                    Connected
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
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-blue-300/30 dark:border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10">
              <div className="text-xs uppercase font-bold text-blue-700 dark:text-blue-300 tracking-widest">XP</div>
              <div className="mt-0.5 text-lg font-bold text-blue-900 dark:text-blue-100">
                {raidProfile?.current_xp?.toLocaleString() || 0}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-blue-300/30 dark:border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10">
              <div className="text-xs uppercase font-bold text-blue-700 dark:text-blue-300 tracking-widest">Points</div>
              <div className="mt-0.5 text-lg font-bold text-blue-900 dark:text-blue-100">
                {raidProfile?.raid_points?.toLocaleString() || 0}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg py-2 px-4 text-center border border-blue-300/30 dark:border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10">
              <div className="text-xs uppercase font-bold text-blue-700 dark:text-blue-300 tracking-widest">Rank</div>
              <div className="mt-0.5 text-lg font-bold text-blue-900 dark:text-blue-100">
                {currentRank?.rank_name || 'Rookie'}
              </div>
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
                className="h-full bg-gradient-to-r from-blue-400/70 to-blue-600/70 rounded-full transition-all duration-500" 
                style={{ width: `${getProgressToNextRank()}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-end mt-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold">
                Next Rank: {nextRank?.rank_name || 'Max Rank'} (+{nextRank?.reward_points || 0} Points)
              </span>
            </div>
          </div>

          {/* Introduction Text */}
          <div className="mt-6 text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Use Your Raid Points to Play Games!
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Earn XP and extra reward points for your profile with every game you play.
            </div>
          </div>
        </ComponentCard>

        {/* Games Section */}
        <ComponentCard title="Available Games" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Fortune Spin Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10">
                5 Points
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4 mt-8 sm:mt-0 text-center sm:text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Fortune Spin</div>
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
                    : ((raidProfile?.raid_points || 0) >= 5 ? () => purchaseGame('fortune-spin', 5) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('fortune-spin') 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                    : ((raidProfile?.raid_points || 0) >= 5 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSpinning 
                  ? 'Spinning...' 
                  : purchasedGames.has('fortune-spin') 
                    ? 'Play Now'
                    : ((raidProfile?.raid_points || 0) >= 5 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Scratch Card Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-yellow-300 dark:hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10">
                5 Points
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-4 mt-8 sm:mt-0 text-center sm:text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Scratch Card</div>
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
                    </>
                  )}
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('scratch-card') 
                    ? (isScratching ? undefined : beginScratch)
                    : ((raidProfile?.raid_points || 0) >= 5 ? () => purchaseGame('scratch-card', 5) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('scratch-card') 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white'
                    : ((raidProfile?.raid_points || 0) >= 5 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                } ${isScratching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isScratching 
                  ? 'Scratching...' 
                  : purchasedGames.has('scratch-card') 
                    ? 'Play Now'
                    : ((raidProfile?.raid_points || 0) >= 5 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Pick a Card Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-red-300 dark:hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] dark:hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10">
                5 Points
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-3 mt-8 sm:mt-0 text-center sm:text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Pick a Card</div>
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
                          background: cardPointValues[index] === 0 
                            ? 'linear-gradient(145deg, #3a3a3a, #1a1a1a)' 
                            : 'linear-gradient(145deg, #1a5d1a, #2a782a)',
                          borderColor: cardPointValues[index] === 0 ? '#6b7280' : '#4ade80',
                        }}
                      >
                        {/* Card pattern overlay */}
                        <div className="absolute inset-0 opacity-15 rounded-lg"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 1px, transparent 1px), radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                          }}
                        ></div>

                        {/* Points Prize Display */}
                        <div className="text-center">
                          <div className="text-white text-4xl font-bold mb-1" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>
                            {cardPointValues[index] === 0 ? 'No Luck' : cardPointValues[index] ? `+${cardPointValues[index]} Points` : ''}
                          </div>
                          <div className="text-white text-sm opacity-80">
                            {cardPointValues[index] === 0 ? 'Try Again!' : 'You Won!'}
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
                    : ((raidProfile?.raid_points || 0) >= 5 ? () => purchaseGame('pick-card', 5) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('pick-card') 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white cursor-default' 
                    : ((raidProfile?.raid_points || 0) >= 5 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                }`}
              >
                {purchasedGames.has('pick-card') 
                  ? 'Pick a Card Above'
                    : ((raidProfile?.raid_points || 0) >= 5 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Dice Roll Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10">
                5 Points
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-3 mt-8 sm:mt-0 text-center sm:text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Dice Roll</div>
                </div>

                {/* Number Selection */}
                {purchasedGames.has('dice-roll') && !isRollingDice && !diceResult && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pick your number (1-6):</div>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleNumberPick(num)}
                          className={`w-10 h-10 rounded-lg font-bold text-lg transition-all ${
                            pickedNumber === num
                              ? 'bg-blue-600 text-white scale-110 shadow-lg'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3D Dice */}
                <div className="flex-1 flex items-center justify-center" style={{ perspective: '1000px' }}>
                  <div
                    className="relative pointer-events-none"
                    style={{
                      width: '90px',
                      height: '90px',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 1.5s ease-out',
                      transform: diceResult 
                        ? `rotateX(${diceResult === 1 ? 360 : diceResult === 2 ? 360 : diceResult === 3 ? 360 : diceResult === 4 ? 360 : diceResult === 5 ? 630 : 450}deg) rotateY(${diceResult === 1 ? 360 : diceResult === 2 ? 540 : diceResult === 3 ? 630 : diceResult === 4 ? 450 : diceResult === 5 ? 360 : 360}deg) rotateZ(720deg)${diceRollClass === 'reRoll' ? ' rotateX(0deg) rotateY(0deg) rotateZ(0deg)' : ''}`
                        : 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
                    }}
                  >
                    {/* Side 1 */}
                    <div className="absolute w-full h-full rounded-lg" style={{ transform: 'translateZ(45px)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.25)', background: 'linear-gradient(145deg, #60a5fa, #3b82f6)' }}>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></span>
                    </div>

                    {/* Side 2 */}
                    <div className="absolute w-full h-full rounded-lg" style={{ transform: 'rotateX(-180deg) translateZ(45px)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.25)', background: 'linear-gradient(145deg, #60a5fa, #3b82f6)' }}>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                    </div>

                    {/* Side 3 */}
                    <div className="absolute w-full h-full rounded-lg" style={{ transform: 'rotateY(90deg) translateZ(45px)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.25)', background: 'linear-gradient(145deg, #60a5fa, #3b82f6)' }}>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></span>
                    </div>

                    {/* Side 4 */}
                    <div className="absolute w-full h-full rounded-lg" style={{ transform: 'rotateY(-90deg) translateZ(45px)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.25)', background: 'linear-gradient(145deg, #60a5fa, #3b82f6)' }}>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                    </div>

                    {/* Side 5 */}
                    <div className="absolute w-full h-full rounded-lg" style={{ transform: 'rotateX(90deg) translateZ(45px)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.25)', background: 'linear-gradient(145deg, #60a5fa, #3b82f6)' }}>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></span>
                    </div>

                    {/* Side 6 */}
                    <div className="absolute w-full h-full rounded-lg" style={{ transform: 'rotateX(-90deg) translateZ(45px)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.25)', background: 'linear-gradient(145deg, #60a5fa, #3b82f6)' }}>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '50%', left: '25%', transform: 'translate(-50%, -50%)' }}></span>
                      <span className="absolute w-4 h-4 bg-white rounded-full shadow-lg" style={{ top: '50%', left: '75%', transform: 'translate(-50%, -50%)' }}></span>
                    </div>
                  </div>
                </div>

                {/* Result Message */}
                {diceResultMessage && (
                  <div className={`mt-4 font-bold text-lg ${
                    diceResultMessage.includes('won') 
                      ? 'text-green-500 dark:text-green-400' 
                      : 'text-red-500 dark:text-red-400'
                  } animate-pulse`}>
                    {diceResultMessage}
                  </div>
                )}
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('dice-roll') 
                    ? undefined
                    : ((raidProfile?.raid_points || 0) >= 5 ? () => purchaseGame('dice-roll', 5) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('dice-roll') 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-default' 
                    : ((raidProfile?.raid_points || 0) >= 5 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                }`}
              >
                {purchasedGames.has('dice-roll') 
                  ? (pickedNumber ? 'Rolling...' : 'Pick Your Number')
                    : ((raidProfile?.raid_points || 0) >= 5 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Slot Machine Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10">
                5 Points
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-3 mt-8 sm:mt-0 text-center sm:text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Slot Machine</div>
                </div>

                {/* Slot Machine Container */}
                <div className="flex-1 flex items-center justify-center">
                  {/* Slot Reel */}
                  <div 
                    className="rounded-xl p-5"
                    style={{
                      background: 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)',
                      boxShadow: '0 3px 9px rgba(0,0,0,0.25)',
                    }}
                  >
                    <div 
                      ref={slotReelRef}
                      className="w-32 h-20 overflow-hidden rounded-lg relative"
                      style={{
                        background: 'linear-gradient(to bottom, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%)',
                        boxShadow: '0 2px 7px rgba(0,0,0,0.3) inset, 0 0px 1px rgba(0,0,0,0.2) inset',
                      }}
                    >
                      {/* Top fade overlay - complete block */}
                      <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,1), transparent)' }}></div>
                      {/* Bottom fade overlay - complete block */}
                      <div className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1), transparent)' }}></div>
                      
                      <div className="relative" style={{ transform: 'translateY(-320px)' }}>
                        {/* Duplicate Points values for seamless loop - larger spacing */}
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">0 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">5 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">10 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">15 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">25 Points</p>
                        {/* Duplicate for seamless scrolling */}
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">0 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">5 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">10 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">15 Points</p>
                        <p className="text-3xl font-bold h-20 flex items-center justify-center text-purple-600 dark:text-purple-500">25 Points</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result Message */}
                <div className="min-h-[2rem] flex items-center justify-center">
                  {slotResult !== null && (
                    <div className="text-base font-bold text-green-600 dark:text-green-400">
                      Won {[0, 5, 10, 15, 25][slotResult]} Points!
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('slot-machine') 
                    ? (isSpinningSlots ? undefined : handleSlotMachine)
                    : ((raidProfile?.raid_points || 0) >= 5 ? () => purchaseGame('slot-machine', 5) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all cursor-pointer ${
                  purchasedGames.has('slot-machine') 
                    ? (isSpinningSlots 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white')
                    : ((raidProfile?.raid_points || 0) >= 5 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                }`}
              >
                {isSpinningSlots 
                  ? 'Spinning...'
                  : purchasedGames.has('slot-machine') 
                    ? 'Spin Now'
                    : ((raidProfile?.raid_points || 0) >= 5 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>

            {/* Coin Flip Game */}
            <div className="relative bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10 text-center flex flex-col min-h-[400px] hover:border-yellow-300 dark:hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] overflow-hidden">
              {/* Cost Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10">
                5 Points
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header with Gradient */}
                <div className="mb-3 mt-8 sm:mt-0 text-center sm:text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-2">Coin Flip</div>
                </div>

                {/* Side Selection - Similar to Dice Roll */}
                {!coinChoice && !isFlippingCoin && purchasedGames.has('coin-flip') && (
                  <div className="flex gap-2 justify-center mb-4">
                    <button
                      onClick={() => handleCoinFlip('heads')}
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all text-lg"
                    >
                      IMG
                    </button>
                    <button
                      onClick={() => handleCoinFlip('tails')}
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all text-lg"
                    >
                      SOL
                    </button>
                  </div>
                )}

                {/* Coin Visual */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-32 h-32 mx-auto flex items-center justify-center" style={{ perspective: '1000px' }}>
                    {isFlippingCoin ? (
                      <img
                        src="/images/raidgames/coinflipspin.webp"
                        alt="flipping"
                        className="w-32 h-32 object-contain"
                        style={{
                          animation: 'coinFlip 1.5s ease-in-out',
                          transformStyle: 'preserve-3d'
                        }}
                      />
                    ) : coinResult ? (
                      <img
                        src={coinResult === 'heads' ? '/images/raidgames/coinflipheads.webp' : '/images/raidgames/coinfliptails.webp'}
                        alt={coinResult}
                        className="w-32 h-32 object-contain"
                      />
                    ) : (
                      <img
                        src="/images/raidgames/coinflipheads.webp"
                        alt="coin"
                        className="w-32 h-32 object-contain opacity-50"
                      />
                    )}
                  </div>
                </div>

                {/* Result Message - Fixed at bottom like Dice Roll */}
                <div className="min-h-[2rem] flex items-center justify-center">
                  {coinWinAmount !== null && (
                    <div className={`text-base font-bold ${coinWinAmount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {coinWinAmount > 0 ? `Won ${coinWinAmount} Points!` : 'Better luck next time!'}
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase/Play Tab */}
              <div
                onClick={
                  purchasedGames.has('coin-flip') 
                    ? undefined
                    : ((raidProfile?.raid_points || 0) >= 5 ? () => purchaseGame('coin-flip', 5) : undefined)
                }
                className={`w-full py-4 px-6 font-bold text-base transition-all ${
                  purchasedGames.has('coin-flip') 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white cursor-default'
                    : ((raidProfile?.raid_points || 0) >= 5 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white cursor-pointer' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed')
                }`}
              >
                {purchasedGames.has('coin-flip') 
                  ? 'Pick a Side Above'
                    : ((raidProfile?.raid_points || 0) >= 5 ? 'Purchase' : 'Insufficient Points')
                }
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Coin Flip Animation Styles */}
        <style>{`
          @keyframes coinFlip {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(1800deg);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default RaidGames;
