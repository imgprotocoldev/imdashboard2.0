import React, { useState } from 'react';
import ComponentCard from '../components/common/ComponentCard';

// TokenMetrics type removed (no longer used)

interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
}

interface Game {
  id: string;
  name: string;
  description: string;
  banner: string;
  playUrl: string;
}

const Information: React.FC = () => {
  // const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics | null>(null);
  // const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'Chatroom' | 'Marketplace' | 'Social Media'>('Chatroom');

  // const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

  const socialPlatforms: SocialPlatform[] = [
    { name: 'X', icon: '/images/hub/xlogo.webp', url: 'https://x.com/imgprotocol' },
    { name: 'Telegram', icon: '/images/hub/telegram.webp', url: 'https://t.me/imgprotocol' },
    { name: 'Discord', icon: '/images/hub/discord.webp', url: 'https://discord.gg/imgprotocol' },
    { name: 'YouTube', icon: '/images/hub/youtube.webp', url: 'https://youtube.com/@imgprotocol' },
    { name: 'Instagram', icon: '/images/hub/instagram.webp', url: 'https://instagram.com/imgprotocol' },
    { name: 'Truth Social', icon: '/images/hub/truthsocial.webp', url: 'https://truthsocial.com/@imgprotocol' },
    { name: 'Medium', icon: '/images/hub/medium.webp', url: 'https://medium.com/@imgprotocol' },
    { name: 'Stocktwits', icon: '/images/hub/stocktwits1.webp', url: 'https://stocktwits.com/imgprotocol' },
    { name: 'CoinGecko', icon: '/images/hub/CoinGeckologo.webp', url: 'https://www.coingecko.com/en/coins/infinite-money-glitch' },
    { name: 'CoinMarketCap', icon: '/images/hub/coinmarketcaplogo.webp', url: 'https://coinmarketcap.com/currencies/infinite-money-glitch/' },
    { name: 'DexScreener', icon: '/images/hub/dexscreener.webp', url: 'https://dexscreener.com/solana/cxgcuecqdabpvjwh5cweir9y5fy9sktjhgutmc95bgy3' }
  ];

  const games: Game[] = [
    { id: 'racing', name: 'Racing', description: 'Compete in high-speed races and win rewards', banner: '/images/hub/newrewardsevent.webp', playUrl: '#' },
    { id: 'lottery', name: 'Lottery Jackpot', description: 'Try your luck in the daily lottery draw', banner: '/images/hub/newrewardsevent.webp', playUrl: '#' },
    { id: 'competition', name: 'Buy Competition', description: 'Compete with other traders in buying challenges', banner: '/images/hub/newrewardsevent.webp', playUrl: '#' },
  ];

  // useEffect(() => {
  //   setLoading(true);
  //   setTokenMetrics({
  //     priceUSD: 0.002254,
  //     priceSOL: 0.059712,
  //     liquidity: 395000,
  //     fdv: 2200000,
  //     marketCap: 2200000,
  //     change1H: -0.67,
  //     change6H: 0.86,
  //     change24H: 7.94,
  //     volume24H: 21000,
  //     transactions: 232,
  //     makers: 101,
  //     buys: 129,
  //     sells: 103,
  //     buyVolume: 13000,
  //     sellVolume: 7400,
  //     buyers: 69,
  //     sellers: 50,
  //   });
  //   setLoading(false);
  // }, []);

  // const formatPrice = (price: number) => price < 0.01 ? `$${price.toFixed(6)}` : `$${price.toFixed(4)}`;

  // const formatChange = (change: number) => {
  //   const isPositive = change >= 0;
  //   return (
  //     <span className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
  //       {isPositive ? '+' : ''}{change.toFixed(2)}%
  //     </span>
  //   );
  // };

  return (
    <>
      <div className="space-y-6">
        {/* Token Information (headerless) */}
        <ComponentCard className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex items-center gap-4 md:col-span-1">
              <img src="/images/hub/imglogonew.webp" alt="IMG" className="w-16 h-16 rounded-lg object-contain bg-white dark:bg-white/5 p-2 border border-gray-200 dark:border-white/[0.06]" />
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">Infinite Money Glitch</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Ticker: <span className="font-medium text-gray-900 dark:text-gray-200">IMG</span></div>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contract Address</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reward Address</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">DvJ5raMqt67hKat9XZYUYpSWvKU1yyQdpbAuytauz2X9</div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Infra Wallet</div>
                  <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">7sFfWaCKUfCykeh3suuuT7X9RGXjwq6VtQu6qk1KgUgF</div>
                </div>
                <div className="flex items-center md:justify-end gap-3">
                  <a href="https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Buy Now</a>
                  <a href="https://dexscreener.com/solana/cxgcuecqdabpvjwh5cweir9y5fy9sktjhgutmc95bgy3" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.06] text-sm font-medium">View Chart</a>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Integrations with tabs */}
        <ComponentCard title="Integrations" className="h-fit">
          <div>
            <div className="flex gap-2 border-b border-gray-200 dark:border-white/[0.06] mb-4">
              {(['Chatroom','Marketplace','Social Media'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-sm rounded-t-md ${activeTab===tab? 'bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white border border-b-0 border-gray-200 dark:border-white/[0.06]':'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}>{tab}</button>
              ))}
            </div>
            {activeTab === 'Chatroom' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.filter(s => ['Telegram','Discord'].includes(s.name)).map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Marketplace' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.filter(s => ['CoinGecko','CoinMarketCap','DexScreener'].includes(s.name)).map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Social Media' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.filter(s => ['X','Instagram','Truth Social','YouTube','Stocktwits','Medium'].includes(s.name)).map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white text-center">{platform.name}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </ComponentCard>

        {/* Removed Dex chart and Token Metrics as requested */}

        <ComponentCard title="Games" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game) => (
              <div key={game.id} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                <div className="relative h-32 overflow-hidden">
                  <img src={game.banner} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{game.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{game.description}</p>
                  <button onClick={() => window.open(game.playUrl, '_blank')} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Play Now</button>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Information;


