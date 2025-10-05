import React from 'react';
import ComponentCard from '../components/common/ComponentCard';

// TokenMetrics type removed (no longer used)

// SocialPlatform removed

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
  // Tabs removed

  // const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

  // Social platforms removed

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
        {/* Token information and integrations removed */}

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


