import React from 'react';
import ComponentCard from '../components/common/ComponentCard';

const Hub: React.FC = () => {


  return (
    <>
      <div className="space-y-6">
        {/* Raid Games Section */}
        <ComponentCard title="Raid Games" className="h-fit">
          <div className="relative rounded-xl overflow-hidden">
            {/* Banner Image */}
            <div className="relative h-48 w-full">
              <img
                src="/images/raid/raidgamesbanner.webp"
                alt="Raid Games"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-4">
                    Use Your Raid Points to Play Games!
                  </div>
                  <a
                    href="/raidgames"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-lg font-bold shadow-[0_6px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_8px_24px_rgba(168,85,247,0.5)] transition-all"
                  >
                    Play Now
                  </a>
                </div>
              </div>
            </div>
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
