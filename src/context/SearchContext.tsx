import React, { createContext, useContext, useState, useMemo } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'event' | 'support' | 'contract' | 'wallet' | 'link';
  url?: string;
  content?: string;
  links?: { name: string; url: string }[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  isDropdownVisible: boolean;
  setIsDropdownVisible: (isVisible: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Define all searchable content
  const searchableContent: SearchResult[] = useMemo(() => [
    // Dashboard Pages
    { id: 'terminal', title: 'Terminal', description: 'Main dashboard with IMG statistics and analytics', type: 'page', url: '/terminal' },
    { id: 'hub', title: 'Hub', description: 'Daily spin games and raid point activities', type: 'page', url: '/hub' },
    { id: 'raidgames', title: 'Raid Games', description: 'Play games to earn XP and reward points', type: 'page', url: '/raidgames' },
    { id: 'raid', title: 'Active Raids', description: 'Join X raids and collect XP rewards', type: 'page', url: '/raid' },
    { id: 'harvesting', title: 'Harvesting', description: 'View harvesting data and statistics', type: 'page', url: '/harvesting' },
    { id: 'distribution', title: 'Distribution', description: 'Track reward distribution and transactions', type: 'page', url: '/distribution' },
    { id: 'earnings', title: 'Earnings', description: 'View your earnings and reward history', type: 'page', url: '/earnings' },
    { id: 'voting', title: 'Voting', description: 'Participate in community polls and voting', type: 'page', url: '/voting' },
    { id: 'events', title: 'Events', description: 'Browse community events and announcements', type: 'page', url: '/events' },
    { id: 'notifications', title: 'Notifications', description: 'View all notifications and updates', type: 'page', url: '/notifications' },
    { id: 'profile', title: 'Profile', description: 'Manage your user profile and settings', type: 'page', url: '/profile' },
    { id: 'support', title: 'Support', description: 'Get help and contact support', type: 'page', url: '/support' },

    // Events
    { id: 'solscan-update', title: 'Solscan Update', description: 'IMG team gains full ownership of Solscan profile', type: 'event', url: '/events/solscan-update' },

    // Support Information - Direct Links
    { id: 'marketplace', title: 'Marketplace', description: 'Price tracking and market data platforms', type: 'link', links: [
      { name: 'CoinGecko', url: 'https://www.coingecko.com/' },
      { name: 'CoinMarketCap', url: 'https://coinmarketcap.com/' },
      { name: 'DexScreener', url: 'https://dexscreener.com/solana/cxgcuecqdabpvjwh5cweir9y5fy9sktjhgutmc95bgy3' }
    ]},
    { id: 'chatroom', title: 'Chatroom', description: 'Community chat and discussion platforms', type: 'link', links: [
      { name: 'Telegram', url: 'https://t.me/imgprotocol' },
      { name: 'Discord', url: 'https://discord.gg/imgprotocol' }
    ]},
    { id: 'socials', title: 'Socials', description: 'Social media and content platforms', type: 'link', links: [
      { name: 'X (Twitter)', url: 'https://x.com/imgprotocol' },
      { name: 'Instagram', url: 'https://instagram.com/' },
      { name: 'Truth Social', url: 'https://truthsocial.com/' },
      { name: 'YouTube', url: 'https://youtube.com/' },
      { name: 'Stocktwits', url: 'https://stocktwits.com/' },
      { name: 'Medium', url: 'https://medium.com/' }
    ]},
    { id: 'dex', title: 'Decentralized Exchange', description: 'DEX platforms for trading IMG', type: 'link', links: [
      { name: 'Raydium', url: 'https://raydium.io' },
      { name: 'Jupiter', url: 'https://jup.ag' },
      { name: 'Orca', url: 'https://www.orca.so/' }
    ]},
    { id: 'cex', title: 'Centralized Exchange', description: 'CEX platforms for trading IMG', type: 'link', links: [
      { name: 'Bitrue', url: 'https://www.bitrue.com/' },
      { name: 'Alph.ai', url: 'https://alph.ai/' },
      { name: 'LBank', url: 'https://www.lbank.com/' }
    ]},
    { id: 'wallets', title: 'Wallets', description: 'Compatible wallets for IMG storage', type: 'link', links: [
      { name: 'Phantom', url: 'https://phantom.app/' },
      { name: 'Solflare', url: 'https://solflare.com/' },
      { name: 'Atomic', url: 'https://atomicwallet.io/' },
      { name: 'Jupiter', url: 'https://jup.ag' }
    ]},
    { id: 'support-page', title: 'Support Page', description: 'View all integrations and contact support', type: 'support', url: '/support', content: 'Visit the Support page to see all integrations, contract addresses, and contact our team.' },

    // Contract Addresses and Wallets
    { id: 'contract-address', title: 'IMG Contract Address', description: 'Official IMG token contract address on Solana', type: 'contract', content: 'znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh' },
    { id: 'infra-wallet', title: 'Infra Wallet', description: 'Infrastructure wallet address for IMG operations', type: 'wallet', content: '7sFfWaCKUfCykeh3suuuT7X9RGXjwq6VtQu6qk1KgUgF' },
    { id: 'reward-address', title: 'Reward Address', description: 'Official reward distribution wallet address', type: 'wallet', content: 'DvJ5raMqt67hKat9XZYUYpSWvKU1yyQdpbAuytauz2X9' },
  ], []);

  // Filter results based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return searchableContent.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      (item.content && item.content.toLowerCase().includes(query))
    );
  }, [searchQuery, searchableContent]);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearchOpen,
      setIsSearchOpen,
      isDropdownVisible,
      setIsDropdownVisible,
    }}>
      {children}
    </SearchContext.Provider>
  );
};
