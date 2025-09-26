import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";

// IMG Protocol specific imports will be added here
interface WalletStatus {
  isConnected: boolean;
  isPremium: boolean;
  walletAddress: string;
}

export default function Home() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus>({
    isConnected: false,
    isPremium: false,
    walletAddress: ""
  });

  useEffect(() => {
    // Check wallet status from localStorage
    const walletConnected = localStorage.getItem('walletConnected') === 'true';
    const walletPublicKey = localStorage.getItem('walletPublicKey');
    const walletPremium = localStorage.getItem('walletPremium') === 'true';
    
    setWalletStatus({
      isConnected: walletConnected,
      isPremium: walletPremium,
      walletAddress: walletPublicKey || ''
    });
  }, []);

  return (
    <>
      <PageMeta
        title="IMG Protocol Dashboard - Terminal"
        description="IMG Protocol financial dashboard with wallet integration and premium features"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Token Metrics Section */}
        <div className="col-span-12">
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Token Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="metric-card bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Price USD</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-white">$0.00</div>
              </div>
              <div className="metric-card bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">24h Change</div>
                <div className="text-2xl font-bold text-green-600 dark:text-white">0.00%</div>
              </div>
              <div className="metric-card bg-purple-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Market Cap</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-white">$0.00</div>
              </div>
              <div className="metric-card bg-orange-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Volume 24h</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-white">$0.00</div>
              </div>
              <div className="metric-card bg-red-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Supply</div>
                <div className="text-2xl font-bold text-red-600 dark:text-white">0.00B</div>
              </div>
              <div className="metric-card bg-teal-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Holders</div>
                <div className="text-2xl font-bold text-teal-600 dark:text-white">0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Status Section */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Wallet Status
            </h2>
            {walletStatus.isConnected ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Address:</span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {walletStatus.walletAddress.substring(0, 8)}...
                    {walletStatus.walletAddress.substring(walletStatus.walletAddress.length - 8)}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Premium Status:</span>
                  <span className={`px-2 py-1 rounded ${walletStatus.isPremium ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {walletStatus.isPremium ? 'Premium' : 'Standard'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Connect your wallet to unlock premium features</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Commands/Terminal Section */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Terminal
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              <div className="space-y-2">
                <div className="text-blue-400">IMG Protocol Terminal v2.0</div>
                <div className="text-yellow-400">Initializing connection...</div>
                {walletStatus.isConnected ? (
                  <>
                    <div className="text-green-400">✓ Wallet connected successfully</div>
                    <div className="text-green-400">✓ Premium features {walletStatus.isPremium ? 'enabled' : 'locked'}</div>
                  </>
                ) : (
                  <div className="text-red-400">✗ No wallet connection detected</div>
                )}
                <div className="text-gray-400">&gt; Ready for commands...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section - only if premium */}
        {walletStatus.isConnected && walletStatus.isPremium && (
          <>
            <div className="col-span-12">
              <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Premium Charts
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Price Chart</span>
                  </div>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Volume Chart</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}