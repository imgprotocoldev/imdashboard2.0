import { useState, useEffect } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function PriceUSD() {
  const [price, setPrice] = useState("$0.0000");
  const [priceChange, setPriceChange] = useState(0);
  const [loading, setLoading] = useState(true);

  // Format price values (from website implementation)
  const formatPrice = (price: number) => {
    if (!price) return "$0.0000";
    const num = parseFloat(price.toString());
    if (num < 0.0001) {
      return `$${num.toFixed(6)}`;
    } else if (num < 1) {
      return `$${num.toFixed(4)}`;
    } else if (num < 10) {
      return `$${num.toFixed(3)}`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  // Format percentage values
  const formatPercentage = (value: number) => {
    if (!value) return "+0.00%";
    const num = parseFloat(value.toString());
    const sign = num >= 0 ? "+" : "";
    return `${sign}${num.toFixed(2)}%`;
  };

  // Fetch IMG token price from CoinGecko
  const fetchIMGPrice = async () => {
    try {
      setLoading(true);
      
      // Use the correct CoinGecko API endpoint for infinite-money-glitch
      const url = 'https://api.coingecko.com/api/v3/coins/infinite-money-glitch';
      
      console.log('🔍 Fetching IMG data from CoinGecko...');
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.market_data) {
          const currentPrice = data.market_data.current_price?.usd;
          const priceChange24h = data.market_data.price_change_percentage_24h;
          
          if (currentPrice !== undefined) {
            setPrice(formatPrice(currentPrice));
            setPriceChange(priceChange24h || 0);
            console.log(`✅ Found IMG price: $${currentPrice}, change: ${priceChange24h}%`);
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
          setPrice(formatPrice(pair.priceUsd));
          setPriceChange(pair.priceChange?.h24 || 0);
          console.log(`✅ Found IMG price via DexScreener: ${pair.priceUsd}`);
          setLoading(false);
          return;
        }
      }

      // If all fails, set default values
      console.log('❌ All API attempts failed, using default values');
      setPrice("$0.0000");
      setPriceChange(0);
      setLoading(false);

    } catch (error) {
      console.error('❌ Error fetching IMG price:', error);
      setPrice("$0.0000");
      setPriceChange(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIMGPrice();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchIMGPrice, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const isPositive = priceChange >= 0;
  const badgeColor = isPositive ? "success" : "error";
  const ArrowIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

        return (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <img
                src="/images/Terminal Icons/priceusddark.svg"
                alt="Price USD"
                className="w-6 h-6 dark:hidden"
              />
              <img
                src="/images/Terminal Icons/priceusd.svg"
                alt="Price USD"
                className="w-6 h-6 hidden dark:block"
              />
            </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Price USD
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {loading ? "Loading..." : price}
          </h4>
        </div>
        <Badge color={badgeColor}>
          <ArrowIcon />
          {formatPercentage(priceChange)}
        </Badge>
      </div>
    </div>
  );
}
