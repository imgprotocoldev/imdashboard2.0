import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface HarvestingData {
  id: string;
  date: string;
  time: string;
  imgSold: string;
  rewardPool: string;
  distributed: string;
}

// Sample data for demonstration
const harvestingData: HarvestingData[] = [
  {
    id: 'H001',
    date: '2025-01-15',
    time: '14:30:25',
    imgSold: '1,250,000',
    rewardPool: '45.67',
    distributed: '42.15'
  },
  {
    id: 'H002',
    date: '2025-01-15',
    time: '15:30:25',
    imgSold: '980,000',
    rewardPool: '38.92',
    distributed: '35.80'
  },
  {
    id: 'H003',
    date: '2025-01-16',
    time: '08:15:10',
    imgSold: '2,100,000',
    rewardPool: '78.45',
    distributed: '72.30'
  },
  {
    id: 'H004',
    date: '2025-01-16',
    time: '14:45:30',
    imgSold: '1,750,000',
    rewardPool: '62.18',
    distributed: '58.90'
  },
  {
    id: 'H005',
    date: '2025-01-17',
    time: '09:20:15',
    imgSold: '3,200,000',
    rewardPool: '115.67',
    distributed: '108.45'
  },
  {
    id: 'H006',
    date: '2025-01-17',
    time: '16:10:45',
    imgSold: '1,890,000',
    rewardPool: '67.23',
    distributed: '61.80'
  },
  {
    id: 'H007',
    date: '2025-01-18',
    time: '11:35:20',
    imgSold: '2,450,000',
    rewardPool: '89.12',
    distributed: '82.15'
  },
  {
    id: 'H008',
    date: '2025-01-18',
    time: '17:25:10',
    imgSold: '1,680,000',
    rewardPool: '59.87',
    distributed: '55.20'
  },
  {
    id: 'H009',
    date: '2025-01-19',
    time: '10:15:30',
    imgSold: '2,800,000',
    rewardPool: '102.45',
    distributed: '94.80'
  },
  {
    id: 'H010',
    date: '2025-01-19',
    time: '15:40:25',
    imgSold: '2,100,000',
    rewardPool: '76.89',
    distributed: '71.25'
  },
  {
    id: 'H011',
    date: '2025-01-20',
    time: '12:20:15',
    imgSold: '3,500,000',
    rewardPool: '128.90',
    distributed: '119.45'
  },
  {
    id: 'H012',
    date: '2025-01-20',
    time: '18:05:40',
    imgSold: '1,950,000',
    rewardPool: '71.23',
    distributed: '66.80'
  },
  {
    id: 'H013',
    date: '2025-01-21',
    time: '09:45:20',
    imgSold: '2,750,000',
    rewardPool: '98.67',
    distributed: '91.30'
  },
  {
    id: 'H014',
    date: '2025-01-21',
    time: '16:30:15',
    imgSold: '2,200,000',
    rewardPool: '79.45',
    distributed: '73.60'
  },
  {
    id: 'H015',
    date: '2025-01-22',
    time: '13:15:25',
    imgSold: '3,100,000',
    rewardPool: '112.78',
    distributed: '104.90'
  },
  {
    id: 'H016',
    date: '2025-01-23',
    time: '09:45:20',
    imgSold: '1,800,000',
    rewardPool: '65.43',
    distributed: '60.25'
  },
  {
    id: 'H017',
    date: '2025-01-23',
    time: '14:20:35',
    imgSold: '2,300,000',
    rewardPool: '83.76',
    distributed: '77.90'
  },
  {
    id: 'H018',
    date: '2025-01-24',
    time: '11:10:50',
    imgSold: '3,100,000',
    rewardPool: '112.34',
    distributed: '104.80'
  },
  {
    id: 'H019',
    date: '2025-01-24',
    time: '16:55:25',
    imgSold: '2,200,000',
    rewardPool: '79.89',
    distributed: '74.15'
  },
  {
    id: 'H020',
    date: '2025-01-25',
    time: '08:30:40',
    imgSold: '1,950,000',
    rewardPool: '70.56',
    distributed: '65.80'
  },
  {
    id: 'H021',
    date: '2025-01-25',
    time: '13:15:10',
    imgSold: '2,700,000',
    rewardPool: '98.23',
    distributed: '91.45'
  },
  {
    id: 'H022',
    date: '2025-01-26',
    time: '10:40:30',
    imgSold: '2,400,000',
    rewardPool: '87.12',
    distributed: '81.60'
  },
  {
    id: 'H023',
    date: '2025-01-26',
    time: '15:25:45',
    imgSold: '1,750,000',
    rewardPool: '63.45',
    distributed: '59.20'
  },
  {
    id: 'H024',
    date: '2025-01-27',
    time: '12:05:20',
    imgSold: '2,850,000',
    rewardPool: '103.78',
    distributed: '96.90'
  },
  {
    id: 'H025',
    date: '2025-01-27',
    time: '17:50:15',
    imgSold: '2,100,000',
    rewardPool: '76.34',
    distributed: '71.25'
  },
  {
    id: 'H026',
    date: '2025-01-28',
    time: '09:20:35',
    imgSold: '3,300,000',
    rewardPool: '119.87',
    distributed: '111.40'
  },
  {
    id: 'H027',
    date: '2025-01-28',
    time: '14:35:50',
    imgSold: '2,600,000',
    rewardPool: '94.56',
    distributed: '88.75'
  },
  {
    id: 'H028',
    date: '2025-01-29',
    time: '11:15:25',
    imgSold: '2,150,000',
    rewardPool: '78.23',
    distributed: '73.10'
  },
  {
    id: 'H029',
    date: '2025-01-29',
    time: '16:40:10',
    imgSold: '2,900,000',
    rewardPool: '105.67',
    distributed: '98.85'
  },
  {
    id: 'H030',
    date: '2025-01-30',
    time: '08:50:45',
    imgSold: '1,850,000',
    rewardPool: '67.34',
    distributed: '62.90'
  },
  {
    id: 'H031',
    date: '2025-01-30',
    time: '13:25:30',
    imgSold: '2,450,000',
    rewardPool: '89.12',
    distributed: '83.45'
  },
  {
    id: 'H032',
    date: '2025-01-31',
    time: '10:10:15',
    imgSold: '3,200,000',
    rewardPool: '116.45',
    distributed: '108.90'
  },
  {
    id: 'H033',
    date: '2025-01-31',
    time: '15:45:40',
    imgSold: '2,300,000',
    rewardPool: '83.76',
    distributed: '78.25'
  },
  {
    id: 'H034',
    date: '2025-02-01',
    time: '12:30:20',
    imgSold: '2,700,000',
    rewardPool: '98.23',
    distributed: '91.80'
  },
  {
    id: 'H035',
    date: '2025-02-01',
    time: '17:15:35',
    imgSold: '2,100,000',
    rewardPool: '76.34',
    distributed: '71.60'
  },
  {
    id: 'H036',
    date: '2025-02-02',
    time: '09:40:10',
    imgSold: '2,800,000',
    rewardPool: '101.78',
    distributed: '95.25'
  },
  {
    id: 'H037',
    date: '2025-02-02',
    time: '14:20:45',
    imgSold: '2,400,000',
    rewardPool: '87.12',
    distributed: '81.90'
  },
  {
    id: 'H038',
    date: '2025-02-03',
    time: '11:05:30',
    imgSold: '3,100,000',
    rewardPool: '112.67',
    distributed: '105.40'
  },
  {
    id: 'H039',
    date: '2025-02-03',
    time: '16:30:15',
    imgSold: '2,200,000',
    rewardPool: '79.89',
    distributed: '74.85'
  },
  {
    id: 'H040',
    date: '2025-02-04',
    time: '08:15:50',
    imgSold: '2,600,000',
    rewardPool: '94.56',
    distributed: '88.70'
  },
  {
    id: 'H041',
    date: '2025-02-04',
    time: '13:50:25',
    imgSold: '2,900,000',
    rewardPool: '105.34',
    distributed: '98.60'
  },
  {
    id: 'H042',
    date: '2025-02-05',
    time: '10:25:40',
    imgSold: '2,350,000',
    rewardPool: '85.67',
    distributed: '80.15'
  },
  {
    id: 'H043',
    date: '2025-02-05',
    time: '15:10:20',
    imgSold: '2,750,000',
    rewardPool: '99.78',
    distributed: '93.45'
  },
  {
    id: 'H044',
    date: '2025-02-06',
    time: '12:45:35',
    imgSold: '3,400,000',
    rewardPool: '123.45',
    distributed: '115.80'
  },
  {
    id: 'H045',
    date: '2025-02-06',
    time: '17:20:10',
    imgSold: '2,100,000',
    rewardPool: '76.34',
    distributed: '71.90'
  },
  {
    id: 'H046',
    date: '2025-02-07',
    time: '09:35:25',
    imgSold: '2,800,000',
    rewardPool: '101.78',
    distributed: '95.60'
  },
  {
    id: 'H047',
    date: '2025-02-07',
    time: '14:15:50',
    imgSold: '2,500,000',
    rewardPool: '90.89',
    distributed: '85.25'
  },
  {
    id: 'H048',
    date: '2025-02-08',
    time: '11:00:15',
    imgSold: '3,200,000',
    rewardPool: '116.45',
    distributed: '109.30'
  },
  {
    id: 'H049',
    date: '2025-02-08',
    time: '16:40:30',
    imgSold: '2,300,000',
    rewardPool: '83.76',
    distributed: '78.85'
  },
  {
    id: 'H050',
    date: '2025-02-09',
    time: '08:25:45',
    imgSold: '2,650,000',
    rewardPool: '96.34',
    distributed: '90.50'
  },
  {
    id: 'H051',
    date: '2025-02-09',
    time: '13:10:20',
    imgSold: '2,900,000',
    rewardPool: '105.67',
    distributed: '99.15'
  },
  {
    id: 'H052',
    date: '2025-02-10',
    time: '10:50:35',
    imgSold: '2,400,000',
    rewardPool: '87.12',
    distributed: '82.40'
  },
  {
    id: 'H053',
    date: '2025-02-10',
    time: '15:35:10',
    imgSold: '2,700,000',
    rewardPool: '98.23',
    distributed: '92.75'
  },
  {
    id: 'H054',
    date: '2025-02-11',
    time: '12:20:25',
    imgSold: '3,100,000',
    rewardPool: '112.67',
    distributed: '106.20'
  },
  {
    id: 'H055',
    date: '2025-02-11',
    time: '17:05:40',
    imgSold: '2,200,000',
    rewardPool: '79.89',
    distributed: '75.60'
  },
  {
    id: 'H056',
    date: '2025-02-12',
    time: '09:30:15',
    imgSold: '2,850,000',
    rewardPool: '103.78',
    distributed: '97.85'
  },
  {
    id: 'H057',
    date: '2025-02-12',
    time: '14:15:30',
    imgSold: '2,500,000',
    rewardPool: '90.89',
    distributed: '86.10'
  },
  {
    id: 'H058',
    date: '2025-02-13',
    time: '11:40:45',
    imgSold: '3,300,000',
    rewardPool: '119.87',
    distributed: '113.25'
  },
  {
    id: 'H059',
    date: '2025-02-13',
    time: '16:25:20',
    imgSold: '2,100,000',
    rewardPool: '76.34',
    distributed: '72.90'
  },
  {
    id: 'H060',
    date: '2025-02-14',
    time: '08:10:35',
    imgSold: '2,600,000',
    rewardPool: '94.56',
    distributed: '89.75'
  }
];

interface HarvestingTableOneProps {
  selectedMonth: string;
}

export default function HarvestingTableOne({ selectedMonth }: HarvestingTableOneProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Filter data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === 'all') {
      return harvestingData;
    }
    return harvestingData.filter(item => 
      item.date.startsWith(selectedMonth)
    );
  }, [selectedMonth]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                  >
                    ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                  >
                    DATE
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                  >
                    TIME
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                  >
                    IMG SOLD
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                  >
                    REWARD POOL (SOL)
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                  >
                    DISTRIBUTED (SOL)
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
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
                      <span className="font-medium text-[#3641F5] dark:text-[#7592FF] text-sm group-hover:text-[#2A31D8] dark:group-hover:text-[#9CB9FF] transition-colors">
                        {item.id}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 text-start text-sm dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                      {new Date(item.date).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 text-start text-sm dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                      {item.time}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.imgSold}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.rewardPool}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.distributed}
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
