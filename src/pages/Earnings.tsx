import { useState, useMemo, useEffect } from 'react';
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";

export default function Earnings() {
  const [volume24h, setVolume24h] = useState<string>('100,000');
  const [imgHoldings, setImgHoldings] = useState<string>('1,000,000');
  const [solPrice, setSolPrice] = useState<number>(230); // Default fallback price
  const [imgPrice, setImgPrice] = useState<number>(0.0001); // Default fallback price
  const [isLoadingPrice, setIsLoadingPrice] = useState<boolean>(true);
  const [isLoadingImgPrice, setIsLoadingImgPrice] = useState<boolean>(true);

  // Helper functions for number formatting
  const formatNumberWithCommas = (value: string) => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    // Add commas for thousands separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseFormattedNumber = (value: string) => {
    // Remove commas and parse as float
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const handleVolumeChange = (value: string) => {
    const formatted = formatNumberWithCommas(value);
    setVolume24h(formatted);
  };

  const handleHoldingsChange = (value: string) => {
    const formatted = formatNumberWithCommas(value);
    setImgHoldings(formatted);
  };

  // Fetch SOL price from CoinGecko
  const fetchSolPrice = async () => {
    try {
      setIsLoadingPrice(true);
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      
      if (data.solana && data.solana.usd) {
        setSolPrice(data.solana.usd);
      }
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      // Keep the default fallback price of $230
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // Fetch IMG price from CoinGecko
  const fetchImgPrice = async () => {
    try {
      setIsLoadingImgPrice(true);
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=infinite-money-glitch&vs_currencies=usd');
      const data = await response.json();
      
      if (data['infinite-money-glitch'] && data['infinite-money-glitch'].usd) {
        setImgPrice(data['infinite-money-glitch'].usd);
      }
    } catch (error) {
      console.error('Error fetching IMG price:', error);
      // Keep the default fallback price of $0.0001
    } finally {
      setIsLoadingImgPrice(false);
    }
  };

  // Fetch prices on component mount
  useEffect(() => {
    fetchSolPrice();
    fetchImgPrice();
  }, []);

  // Calculate earnings based on the provided formula
  const calculateEarnings = useMemo(() => {
    const volume = parseFormattedNumber(volume24h);
    const holdings = parseFormattedNumber(imgHoldings);
    
    // Total IMG supply
    const totalImgSupply = 998947261;
    
    // Assuming 4.5% of volume goes to rewards pool and 0.5% to infrawallet
    const rewardsPoolRate = 0.045;
    const infrawalletRate = 0.005;
    
    // Calculate daily earnings (assuming daily volume)
    const dailyRewardsPool = volume * rewardsPoolRate;
    const dailyInfrawallet = volume * infrawalletRate;
    const dailyEarnings = (dailyRewardsPool * holdings) / totalImgSupply;
    
    // Calculate other periods
    const weeklyEarnings = dailyEarnings * 7;
    const monthlyEarnings = dailyEarnings * 30;
    const annualEarnings = dailyEarnings * 365;
    const twoYearEarnings = annualEarnings * 2;
    const threeYearEarnings = annualEarnings * 3;
    
    // Calculate SOL values using real-time price from CoinGecko
    const dailyEarningsSOL = dailyEarnings / solPrice;
    const weeklyEarningsSOL = weeklyEarnings / solPrice;
    const monthlyEarningsSOL = monthlyEarnings / solPrice;
    const annualEarningsSOL = annualEarnings / solPrice;
    const twoYearEarningsSOL = twoYearEarnings / solPrice;
    const threeYearEarningsSOL = threeYearEarnings / solPrice;
    
    // Calculate rewards pool and infrawallet for different periods
    const dailyRewardsPoolTotal = dailyRewardsPool;
    const weeklyRewardsPoolTotal = dailyRewardsPool * 7;
    const monthlyRewardsPoolTotal = dailyRewardsPool * 30;
    const annualRewardsPoolTotal = dailyRewardsPool * 365;
    const twoYearRewardsPoolTotal = annualRewardsPoolTotal * 2;
    const threeYearRewardsPoolTotal = annualRewardsPoolTotal * 3;
    
    const dailyInfrawalletTotal = dailyInfrawallet;
    const weeklyInfrawalletTotal = dailyInfrawallet * 7;
    const monthlyInfrawalletTotal = dailyInfrawallet * 30;
    const annualInfrawalletTotal = dailyInfrawallet * 365;
    const twoYearInfrawalletTotal = annualInfrawalletTotal * 2;
    const threeYearInfrawalletTotal = annualInfrawalletTotal * 3;

    return {
      daily: {
        earnings: dailyEarnings,
        earningsSOL: dailyEarningsSOL,
        rewardsPool: dailyRewardsPoolTotal,
        infrawallet: dailyInfrawalletTotal
      },
      weekly: {
        earnings: weeklyEarnings,
        earningsSOL: weeklyEarningsSOL,
        rewardsPool: weeklyRewardsPoolTotal,
        infrawallet: weeklyInfrawalletTotal
      },
      monthly: {
        earnings: monthlyEarnings,
        earningsSOL: monthlyEarningsSOL,
        rewardsPool: monthlyRewardsPoolTotal,
        infrawallet: monthlyInfrawalletTotal
      },
      annual: {
        earnings: annualEarnings,
        earningsSOL: annualEarningsSOL,
        rewardsPool: annualRewardsPoolTotal,
        infrawallet: annualInfrawalletTotal
      },
      twoYear: {
        earnings: twoYearEarnings,
        earningsSOL: twoYearEarningsSOL,
        rewardsPool: twoYearRewardsPoolTotal,
        infrawallet: twoYearInfrawalletTotal
      },
      threeYear: {
        earnings: threeYearEarnings,
        earningsSOL: threeYearEarningsSOL,
        rewardsPool: threeYearRewardsPoolTotal,
        infrawallet: threeYearInfrawalletTotal
      }
    };
  }, [volume24h, imgHoldings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const tableData = [
    {
      type: 'DAILY',
      volume: formatCurrency(parseFormattedNumber(volume24h)),
      holdings: `${formatNumber(parseFormattedNumber(imgHoldings), 0)} IMG`,
      earnings: formatCurrency(calculateEarnings.daily.earnings),
      earningsSOL: `${formatNumber(calculateEarnings.daily.earningsSOL, 6)} SOL`,
      rewardsPool: formatCurrency(calculateEarnings.daily.rewardsPool),
      infrawallet: formatCurrency(calculateEarnings.daily.infrawallet)
    },
    {
      type: 'WEEKLY',
      volume: formatCurrency(parseFormattedNumber(volume24h)),
      holdings: `${formatNumber(parseFormattedNumber(imgHoldings), 0)} IMG`,
      earnings: formatCurrency(calculateEarnings.weekly.earnings),
      earningsSOL: `${formatNumber(calculateEarnings.weekly.earningsSOL, 6)} SOL`,
      rewardsPool: formatCurrency(calculateEarnings.weekly.rewardsPool),
      infrawallet: formatCurrency(calculateEarnings.weekly.infrawallet)
    },
    {
      type: 'MONTHLY',
      volume: formatCurrency(parseFormattedNumber(volume24h)),
      holdings: `${formatNumber(parseFormattedNumber(imgHoldings), 0)} IMG`,
      earnings: formatCurrency(calculateEarnings.monthly.earnings),
      earningsSOL: `${formatNumber(calculateEarnings.monthly.earningsSOL, 6)} SOL`,
      rewardsPool: formatCurrency(calculateEarnings.monthly.rewardsPool),
      infrawallet: formatCurrency(calculateEarnings.monthly.infrawallet)
    },
    {
      type: 'ANNUAL',
      volume: formatCurrency(parseFormattedNumber(volume24h)),
      holdings: `${formatNumber(parseFormattedNumber(imgHoldings), 0)} IMG`,
      earnings: formatCurrency(calculateEarnings.annual.earnings),
      earningsSOL: `${formatNumber(calculateEarnings.annual.earningsSOL, 6)} SOL`,
      rewardsPool: formatCurrency(calculateEarnings.annual.rewardsPool),
      infrawallet: formatCurrency(calculateEarnings.annual.infrawallet)
    },
    {
      type: '2 YEARS',
      volume: formatCurrency(parseFormattedNumber(volume24h)),
      holdings: `${formatNumber(parseFormattedNumber(imgHoldings), 0)} IMG`,
      earnings: formatCurrency(calculateEarnings.twoYear.earnings),
      earningsSOL: `${formatNumber(calculateEarnings.twoYear.earningsSOL, 6)} SOL`,
      rewardsPool: formatCurrency(calculateEarnings.twoYear.rewardsPool),
      infrawallet: formatCurrency(calculateEarnings.twoYear.infrawallet)
    },
    {
      type: '3 YEARS',
      volume: formatCurrency(parseFormattedNumber(volume24h)),
      holdings: `${formatNumber(parseFormattedNumber(imgHoldings), 0)} IMG`,
      earnings: formatCurrency(calculateEarnings.threeYear.earnings),
      earningsSOL: `${formatNumber(calculateEarnings.threeYear.earningsSOL, 6)} SOL`,
      rewardsPool: formatCurrency(calculateEarnings.threeYear.rewardsPool),
      infrawallet: formatCurrency(calculateEarnings.threeYear.infrawallet)
    }
  ];

  return (
    <>
      <PageMeta
        title="IMG Earnings Calculator | IMG Protocol Dashboard"
        description="Calculate your potential earnings from IMG token holdings based on trading volume"
      />
      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ComponentCard 
                  title="Input Parameters" 
                  desc="Enter your trading volume and IMG holdings to calculate potential earnings"
                >
                  <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  24H Volume (USD)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={volume24h}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                    placeholder="Enter 24H volume in USD (e.g., 100,000)"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded">
                      USD
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your IMG Holdings
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={imgHoldings}
                    onChange={(e) => handleHoldingsChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                    placeholder="Enter your IMG token holdings (e.g., 1,000,000)"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded">
                      IMG
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Currency Rates Display */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">SOL Price</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${isLoadingPrice ? 'Loading...' : solPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">IMG Price</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${isLoadingImgPrice ? 'Loading...' : imgPrice.toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Quick Stats */}
          <ComponentCard 
            title="Quick Earnings Overview" 
            desc="Your projected earnings across different time periods"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Daily Earnings</h3>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {formatCurrency(calculateEarnings.daily.earnings)}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {formatNumber(calculateEarnings.daily.earningsSOL, 6)} SOL
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Weekly Earnings</h3>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {formatCurrency(calculateEarnings.weekly.earnings)}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {formatNumber(calculateEarnings.weekly.earningsSOL, 6)} SOL
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Monthly Projection</h3>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {formatCurrency(calculateEarnings.monthly.earnings)}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {formatNumber(calculateEarnings.monthly.earningsSOL, 6)} SOL
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Annual Projection</h3>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {formatCurrency(calculateEarnings.annual.earnings)}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {formatNumber(calculateEarnings.annual.earningsSOL, 6)} SOL
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* Detailed Earnings Table */}
        <ComponentCard 
          title="Detailed Earnings Breakdown" 
          desc="Comprehensive earnings analysis across all time periods"
        >
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1000px]">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        TYPE
                      </TableCell>
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        24H VOLUME
                      </TableCell>
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        IMG HOLDINGS
                      </TableCell>
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        EARNINGS
                      </TableCell>
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        EARNINGS (SOL)
                      </TableCell>
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        REWARDS POOL
                      </TableCell>
                      <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                        INFRAWALLET
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {tableData.map((row, index) => (
                      <TableRow 
                        key={row.type}
                        className={`group hover:bg-gray-100/80 dark:hover:bg-gray-700/40 transition-all duration-200 cursor-pointer ${
                          index % 2 === 0 
                            ? 'bg-white dark:bg-white/[0.02]' 
                            : 'bg-gray-50/50 dark:bg-gray-800/20'
                        }`}
                      >
                        <TableCell className="px-6 py-4 text-start">
                          <span className="font-medium text-[#3641F5] dark:text-[#7592FF] text-sm group-hover:text-[#2A31D8] dark:group-hover:text-[#9CB9FF] transition-colors">
                            {row.type}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-600 text-start text-sm dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                          {row.volume}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-600 text-start text-sm dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                          {row.holdings}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-green-600 dark:text-green-400 text-start text-sm font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                          {row.earnings}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-green-600 dark:text-green-400 text-start text-sm font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                          {row.earningsSOL}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {row.rewardsPool}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {row.infrawallet}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
