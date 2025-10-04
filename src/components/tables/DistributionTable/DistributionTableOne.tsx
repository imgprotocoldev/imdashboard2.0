import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface DistributionData {
  id: string;
  date: string;
  reward: string;
  value: string;
  address: string;
}

// Sample data with realistic blockchain signatures
const distributionData: DistributionData[] = [
  {
    id: '5z88yMEAZZL4P7D16dHhCjZHKH74wWXXP88FEqFnnmRcQyRDfhKPBx8zdHsgdBpVHoDpFkCiJNh8HrKNEx5TZqu',
    date: '2025-01-15',
    reward: '0.125',
    value: '$18.75',
    address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  },
  {
    id: '3Kj8mNpQ2RtV5XyZ9WcE7FgH4L6MnB8AsD1CvXzPqR3Tj',
    date: '2025-01-15',
    reward: '0.089',
    value: '$13.35',
    address: '7HxK9LmN2PqR5TvW8YzA3BcD6EfG1HjK4MnP7QsT2UvX'
  },
  {
    id: '8RtV5XyZ9WcE7FgH4L6MnB8AsD1CvXzPqR3TjKj8mNpQ2',
    date: '2025-01-16',
    reward: '0.234',
    value: '$35.10',
    address: '5FgH4L6MnB8AsD1CvXzPqR3TjKj8mNpQ2RtV5XyZ9Wc'
  }
];

// Function to truncate signature
const truncateSignature = (signature: string) => {
  if (signature.length <= 8) return signature;
  return `${signature.slice(0, 4)}...${signature.slice(-4)}`;
};

interface DistributionTableOneProps {
  selectedMonth: string;
  searchAddress: string;
}

export default function DistributionTableOne({ selectedMonth, searchAddress }: DistributionTableOneProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Filter data based on selected month and search address
  const filteredData = useMemo(() => {
    let filtered = distributionData;
    
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(item => item.date.startsWith(selectedMonth));
    }
    
    if (searchAddress) {
      filtered = filtered.filter(item => 
        item.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
        item.id.toLowerCase().includes(searchAddress.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedMonth, searchAddress]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                    SIGNATURE
                  </TableCell>
                  <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                    DATE
                  </TableCell>
                  <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                    REWARD (SOL)
                  </TableCell>
                  <TableCell isHeader className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider">
                    VALUE (USD)
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    className={`group hover:bg-gray-100/80 dark:hover:bg-gray-700/40 transition-all duration-200 cursor-pointer ${
                      index % 2 === 0 
                        ? 'bg-white dark:bg-white/[0.02]' 
                        : 'bg-gray-50/50 dark:bg-gray-800/20'
                    }`}
                  >
                    <TableCell className="px-6 py-4 text-start">
                      <a
                        href={`https://solscan.io/tx/${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#3641F5] dark:text-[#7592FF] hover:text-[#2A31D8] dark:hover:text-[#9CB9FF] text-sm font-mono hover:underline transition-colors group-hover:text-[#2A31D8] dark:group-hover:text-[#9CB9FF]"
                      >
                        {truncateSignature(item.id)}
                      </a>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 text-start text-sm dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                      {new Date(item.date).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.reward}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 px-6 py-4 border border-gray-200 dark:border-white/[0.05] rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
