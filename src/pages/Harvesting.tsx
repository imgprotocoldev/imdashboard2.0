import { useState } from 'react';
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import HarvestingTableOne from "../components/tables/HarvestingTable/HarvestingTableOne";

export default function Harvesting() {
  const [selectedMonth, setSelectedMonth] = useState('all');

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
        title="IMG Harvesting Data | IMG Protocol Dashboard"
        description="Track IMG token harvesting activities and reward pool distributions"
      />
      <div className="space-y-6">
        <ComponentCard 
          title="Harvesting Data" 
          desc="Track IMG token harvesting activities and reward pool distributions"
          className="relative"
        >
          {/* Monthly Filter in Card Header */}
          <div className="absolute top-4 right-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <HarvestingTableOne selectedMonth={selectedMonth} />
        </ComponentCard>
      </div>
    </>
  );
}
