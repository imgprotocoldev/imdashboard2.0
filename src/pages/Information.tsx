import React, { useState, useEffect } from 'react';
import ComponentCard from '../components/common/ComponentCard';

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
  const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

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
    { name: 'CoinMarketCap', icon: '/images/hub/coinmarketcaplogo.webp', url: 'https://coinmarketcap.com/currencies/infinite-money-glitch/' }
  ];

  const games: Game[] = [
    { id: 'racing', name: 'Racing', description: 'Compete in high-speed races and win rewards', banner: '/images/hub/newrewardsevent.webp', playUrl: '#' },
    { id: 'lottery', name: 'Lottery Jackpot', description: 'Try your luck in the daily lottery draw', banner: '/images/hub/newrewardsevent.webp', playUrl: '#' },
    { id: 'competition', name: 'Buy Competition', description: 'Compete with other traders in buying challenges', banner: '/images/hub/newrewardsevent.webp', playUrl: '#' },
  ];

  useEffect(() => {
    setLoading(true);
    setTokenMetrics({
      priceUSD: 0.002254,
      priceSOL: 0.059712,
      liquidity: 395000,
      fdv: 2200000,
      marketCap: 2200000,
      change1H: -0.67,
      change6H: 0.86,
      change24H: 7.94,
      volume24H: 21000,
      transactions: 232,
      makers: 101,
      buys: 129,
      sells: 103,
      buyVolume: 13000,
      sellVolume: 7400,
      buyers: 69,
      sellers: 50,
    });
    setLoading(false);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <span className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  return (
    <>
      <div className="space-y-6">
        {/* Token Information */}
        <ComponentCard title="Token Information" className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex items-center gap-4">
              <img src="/images/imgtextlogo.webp" alt="IMG" className="w-14 h-14 rounded-lg object-contain bg-white dark:bg-white/5 p-2 border border-gray-200 dark:border-white/[0.06]" />
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Infinite Money Glitch</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Ticker: <span className="font-medium text-gray-900 dark:text-gray-200">IMG</span></div>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contract Address</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reward Address</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">DvJ5raMqt67hKat9XZYUYpSWvKU1yyQdpbAuytauz2X9</div>
              </div>
              <div className="md:col-span-2 rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Infra Wallet</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">7sFfWaCKUfCykeh3suuuT7X9RGXjwq6VtQu6qk1KgUgF</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">PRICE USD</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{tokenMetrics ? `$${tokenMetrics.priceUSD.toFixed(6)}` : '--'}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">PRICE SOL</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{tokenMetrics ? `${tokenMetrics.priceSOL.toFixed(6)} SOL` : '--'}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">MKT CAP</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{tokenMetrics ? `$${formatNumber(tokenMetrics.marketCap)}` : '--'}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">LIQUIDITY</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{tokenMetrics ? `$${formatNumber(tokenMetrics.liquidity)}` : '--'}</div>
            </div>
          </div>
        </ComponentCard>

        {/* Dex Chart */}
        <ComponentCard title="DEX Chart" className="h-fit">
          <style>{`#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:65%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}`}</style>
          <div id="dexscreener-embed">
            <iframe src="https://dexscreener.com/solana/CXgcuECqdaBpvJWH5cwEir9Y5FY9SKTjhGutMc95bGy3?embed=1&loadChartSettings=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15" />
          </div>
        </ComponentCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComponentCard title="Token Metrics" className="h-fit">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            ) : tokenMetrics ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">PRICE USD</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(tokenMetrics.priceUSD)}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">PRICE SOL</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{tokenMetrics.priceSOL.toFixed(6)} SOL</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">LIQUIDITY</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">${formatNumber(tokenMetrics.liquidity)}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">FDV</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">${formatNumber(tokenMetrics.fdv)}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">MKT CAP</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">${formatNumber(tokenMetrics.marketCap)}</div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Price Changes</div>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">5M</div>
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">N/A</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">1H</div>
                      <div className="text-sm font-semibold">{formatChange(tokenMetrics.change1H)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">6H</div>
                      <div className="text-sm font-semibold">{formatChange(tokenMetrics.change6H)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">24H</div>
                      <div className="text-sm font-semibold">{formatChange(tokenMetrics.change24H)}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Transaction Details</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">TXNS</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{tokenMetrics.transactions}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">MAKERS</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{tokenMetrics.makers}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">VOLUME</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">${formatNumber(tokenMetrics.volume24H)}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">BUYS</div>
                      <div className="text-lg font-semibold text-green-500 mb-1">{tokenMetrics.buys}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(tokenMetrics.buyVolume)} vol</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{tokenMetrics.buyers} buyers</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">SELLS</div>
                      <div className="text-lg font-semibold text-red-500 mb-1">{tokenMetrics.sells}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">${formatNumber(tokenMetrics.sellVolume)} vol</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{tokenMetrics.sellers} sellers</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">Failed to load token metrics</div>
            )}
          </ComponentCard>

          <ComponentCard title="Social Platforms" className="h-fit">
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Chatroom</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {socialPlatforms.filter(s => ['Telegram','Discord'].includes(s.name)).map((platform, index) => (
                    <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                      <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                      <div className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Marketplace</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {socialPlatforms.filter(s => ['CoinGecko','CoinMarketCap'].includes(s.name)).map((platform, index) => (
                    <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                      <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                      <div className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Social Media</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {socialPlatforms.filter(s => ['X','Instagram','Truth Social','YouTube','Stocktwits','Medium'].includes(s.name)).map((platform, index) => (
                    <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                      <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                      <div className="text-xs font-medium text-gray-900 dark:text-white text-center">{platform.name}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>

        <ComponentCard title="Games & Activities" className="w-full">
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


