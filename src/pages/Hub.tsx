import React, { useState, useEffect } from 'react';
import ComponentCard from '../components/common/ComponentCard';

// Token metrics interface
interface TokenMetrics {
  priceUSD: number;
  priceSOL: number;
  liquidity: number;
  fdv: number;
  marketCap: number;
  change1H: number;
  change6H: number;
  change24H: number;
  volume24H: number;
  transactions: number;
  makers: number;
  buys: number;
  sells: number;
  buyVolume: number;
  sellVolume: number;
  buyers: number;
  sellers: number;
}

// Social media platform interface
interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
}

// Game interface
interface Game {
  id: string;
  name: string;
  description: string;
  banner: string;
  playUrl: string;
}

const Hub: React.FC = () => {
  return (
    <>
      <div className="space-y-6">
        {/* Profile Card */}
        <ComponentCard title="Your Raid Profile" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4">
              <img src="/images/avatars/user-01.png" alt="avatar" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Guest</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Connect X to personalize</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rank</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium">Rookie</div>
            </div>
            <div className="flex md:justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">Connect X</button>
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
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-600/20 dark:text-brand-300">New</span>
                </div>
                <div className="h-20 rounded-lg bg-gray-100 dark:bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">XP: 25 • Time: 30m</div>
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

export default Hub;
