import { useMemo } from 'react';
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
  }
];

interface HarvestingTableOneProps {
  selectedMonth: string;
}

export default function HarvestingTableOne({ selectedMonth }: HarvestingTableOneProps) {
  // Filter data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === 'all') {
      return harvestingData;
    }
    return harvestingData.filter(item => 
      item.date.startsWith(selectedMonth)
    );
  }, [selectedMonth]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  DATE
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  TIME
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  IMG SOLD
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  REWARD POOL (SOL)
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  DISTRIBUTED (SOL)
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {item.id}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(item.date).toLocaleDateString('en-GB')}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.time}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90 font-medium">
                    {item.imgSold}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90 font-medium">
                    {item.rewardPool}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90 font-medium">
                    {item.distributed}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
