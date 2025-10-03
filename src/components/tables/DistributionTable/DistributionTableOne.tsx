import { useMemo } from 'react';
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
}

// Sample data for demonstration
const distributionData: DistributionData[] = [
  {
    id: 'D001',
    date: '2025-01-15',
    reward: '0.125',
    value: '$18.75'
  },
  {
    id: 'D002',
    date: '2025-01-15',
    reward: '0.089',
    value: '$13.35'
  },
  {
    id: 'D003',
    date: '2025-01-16',
    reward: '0.234',
    value: '$35.10'
  },
  {
    id: 'D004',
    date: '2025-01-16',
    reward: '0.156',
    value: '$23.40'
  },
  {
    id: 'D005',
    date: '2025-01-17',
    reward: '0.312',
    value: '$46.80'
  },
  {
    id: 'D006',
    date: '2025-01-17',
    reward: '0.178',
    value: '$26.70'
  },
  {
    id: 'D007',
    date: '2025-01-18',
    reward: '0.267',
    value: '$40.05'
  },
  {
    id: 'D008',
    date: '2025-01-18',
    reward: '0.134',
    value: '$20.10'
  },
  {
    id: 'D009',
    date: '2025-01-19',
    reward: '0.298',
    value: '$44.70'
  },
  {
    id: 'D010',
    date: '2025-01-19',
    reward: '0.201',
    value: '$30.15'
  },
  {
    id: 'D011',
    date: '2025-01-20',
    reward: '0.345',
    value: '$51.75'
  },
  {
    id: 'D012',
    date: '2025-01-20',
    reward: '0.189',
    value: '$28.35'
  },
  {
    id: 'D013',
    date: '2025-01-21',
    reward: '0.278',
    value: '$41.70'
  },
  {
    id: 'D014',
    date: '2025-01-21',
    reward: '0.223',
    value: '$33.45'
  },
  {
    id: 'D015',
    date: '2025-01-22',
    reward: '0.312',
    value: '$46.80'
  },
  {
    id: 'D016',
    date: '2025-01-22',
    reward: '0.145',
    value: '$21.75'
  },
  {
    id: 'D017',
    date: '2025-01-23',
    reward: '0.267',
    value: '$40.05'
  },
  {
    id: 'D018',
    date: '2025-01-23',
    reward: '0.198',
    value: '$29.70'
  },
  {
    id: 'D019',
    date: '2025-01-24',
    reward: '0.289',
    value: '$43.35'
  },
  {
    id: 'D020',
    date: '2025-01-24',
    reward: '0.156',
    value: '$23.40'
  }
];

interface DistributionTableOneProps {
  selectedMonth: string;
}

export default function DistributionTableOne({ selectedMonth }: DistributionTableOneProps) {
  // Filter data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === 'all') {
      return distributionData;
    }
    return distributionData.filter(item => 
      item.date.startsWith(selectedMonth)
    );
  }, [selectedMonth]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px]">
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
                  REWARD (SOL)
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  VALUE (USD)
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
                  <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90 font-medium">
                    {item.reward}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90 font-medium">
                    {item.value}
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
