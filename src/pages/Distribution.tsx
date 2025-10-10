import { useState } from 'react';
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import DistributionTableOne from "../components/tables/DistributionTable/DistributionTableOne";

export default function Distribution() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchAddress, setSearchAddress] = useState('');

  // Generate month options
  const monthOptions = [
    { value: 'all', label: 'All Months' },
    { value: '2025-01', label: 'January 2025' },
    { value: '2025-02', label: 'February 2025' },
    { value: '2025-03', label: 'March 2025' },
    { value: '2025-04', label: 'April 2025' },
    { value: '2025-05', label: 'May 2025' },
    { value: '2025-06', label: 'June 2025' },
    { value: '2025-07', label: 'July 2025' },
    { value: '2025-08', label: 'August 2025' },
    { value: '2025-09', label: 'September 2025' },
    { value: '2025-10', label: 'October 2025' },
    { value: '2025-11', label: 'November 2025' },
    { value: '2025-12', label: 'December 2025' }
  ];

  return (
    <>
      <PageMeta
        title="IMG Distribution Data | IMG Protocol Dashboard"
        description="Track SOL reward distributions to holders and their USD values"
      />
      <div className="space-y-6">
        <ComponentCard 
          title="Distribution Data" 
          desc="Track SOL reward distributions to holders and their USD values"
          className="relative"
        >
          {/* Search and Filter Controls - Desktop: absolute top-right, Mobile: below header */}
          <div className="mb-4 lg:mb-0 lg:absolute lg:top-4 lg:right-4 flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search Address..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            {/* Monthly Filter */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <DistributionTableOne selectedMonth={selectedMonth} searchAddress={searchAddress} />
        </ComponentCard>
      </div>
    </>
  );
}
