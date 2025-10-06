import React, { useMemo, useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';

// (No additional interfaces required currently)

const Hub: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [scratchResult, setScratchResult] = useState<string | null>(null);

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
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);
    
    setTimeout(() => {
      const prize = getRandomPrize();
      setSpinResult(prize.label);
      setIsSpinning(false);
    }, 2000);
  };

  const handleScratch = () => {
    if (isScratching) return;
    setIsScratching(true);
    setScratchResult(null);
    
    setTimeout(() => {
      const prize = getRandomPrize();
      setScratchResult(prize.label);
      setIsScratching(false);
    }, 1500);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Games */}
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

        {/* Spin Wheel & Scratch Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spin Wheel */}
          <ComponentCard title="Spin Wheel" className="h-fit">
            <div className="flex flex-col items-center space-y-6">
              {/* Wheel Visual */}
              <div className="relative w-64 h-64">
                <div className={`w-full h-full rounded-full border-8 border-brand-500 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-[0_0_40px_rgba(168,85,247,0.6)] flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}>
                  <div className="w-48 h-48 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border-4 border-yellow-400">
                    {isSpinning ? (
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">SPINNING...</div>
                    ) : spinResult ? (
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">You won</div>
                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">{spinResult}</div>
                      </div>
                    ) : (
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">SPIN!</div>
                    )}
                  </div>
                </div>
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-red-600 drop-shadow-lg"></div>
              </div>

              {/* Prize List */}
              <div className="w-full space-y-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Possible Prizes:</div>
                {prizes.map((prize, idx) => (
                  <div key={idx} className="flex items-center justify-center text-xs px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white font-medium">{prize.label}</span>
                  </div>
                ))}
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full py-3 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_6px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_8px_24px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSpinning ? 'Spinning...' : `Spin Now (Free)`}
              </button>
            </div>
          </ComponentCard>

          {/* Scratch Card */}
          <ComponentCard title="Scratch Card" className="h-fit">
            <div className="flex flex-col items-center space-y-6">
              {/* Scratch Card Visual */}
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.6)]">
                {isScratching || scratchResult ? (
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    {isScratching ? (
                      <div className="text-2xl font-black text-white animate-pulse">SCRATCHING...</div>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm text-white/80 uppercase">You won</div>
                        <div className="text-3xl font-black text-white drop-shadow-lg">{scratchResult}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center relative">
                    <div className="text-4xl font-black text-white/30">SCRATCH ME</div>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
                  </div>
                )}
              </div>

              {/* Prize List */}
              <div className="w-full space-y-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Possible Prizes:</div>
                {prizes.map((prize, idx) => (
                  <div key={idx} className="flex items-center justify-center text-xs px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white font-medium">{prize.label}</span>
                  </div>
                ))}
              </div>

              {/* Scratch Button */}
              <button
                onClick={handleScratch}
                disabled={isScratching}
                className="w-full py-3 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white shadow-[0_6px_20px_rgba(234,179,8,0.4)] hover:shadow-[0_8px_24px_rgba(234,179,8,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isScratching ? 'Scratching...' : `Scratch Now (Free)`}
              </button>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default Hub;
