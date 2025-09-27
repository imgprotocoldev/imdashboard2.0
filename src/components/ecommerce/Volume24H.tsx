import { useState, useEffect } from "react";

export default function Volume24H() {
  const [volume, setVolume] = useState("$0.00");
  const [loading, setLoading] = useState(true);

  // Format volume values
  const formatVolume = (volume: number) => {
    if (!volume) return "$0.00";
    const num = parseFloat(volume.toString());
    
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  // Fetch IMG token 24H volume from CoinGecko
  const fetchIMGVolume = async () => {
    try {
      setLoading(true);
      
      // Use the correct CoinGecko API endpoint for infinite-money-glitch
      const url = 'https://api.coingecko.com/api/v3/coins/infinite-money-glitch';
      
      console.log('🔍 Fetching IMG volume data from CoinGecko...');
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.market_data) {
          const volume24h = data.market_data.total_volume?.usd;
          
          if (volume24h !== undefined) {
            setVolume(formatVolume(volume24h));
            console.log(`✅ Found IMG 24H volume: $${volume24h}`);
            setLoading(false);
            return;
          }
        }
      }

      // Fallback: Try DexScreener API
      console.log('🔄 Trying DexScreener API as fallback...');
      const dexScreenerUrl = 'https://api.dexscreener.com/latest/dex/tokens/znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh';
      const dexResponse = await fetch(dexScreenerUrl);
      
      if (dexResponse.ok) {
        const dexData = await dexResponse.json();
        
        if (dexData.pairs && dexData.pairs.length > 0) {
          const pair = dexData.pairs[0];
          const volume24h = pair.volume?.h24;
          if (volume24h) {
            setVolume(formatVolume(volume24h));
            console.log(`✅ Found IMG volume via DexScreener: $${volume24h}`);
            setLoading(false);
            return;
          }
        }
      }

      // If all fails, set default values
      console.log('❌ All API attempts failed, using default values');
      setVolume("$0.00");
      setLoading(false);

    } catch (error) {
      console.error('❌ Error fetching IMG volume:', error);
      setVolume("$0.00");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIMGVolume();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchIMGVolume, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

        return (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <img
                src="/images/Terminal Icons/volumebardark.svg"
                alt="24H Volume"
                className="w-6 h-6 dark:hidden"
              />
              <img
                src="/images/Terminal Icons/volumebar.svg"
                alt="24H Volume"
                className="w-6 h-6 hidden dark:block"
              />
            </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            24H Volume
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {loading ? "Loading..." : volume}
          </h4>
        </div>
              <div className="flex items-center text-blue-500 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                CoinGecko Data
              </div>
      </div>
    </div>
  );
}
