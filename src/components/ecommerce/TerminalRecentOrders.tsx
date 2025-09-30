import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the table rows
interface Transaction {
  id: number; // Unique identifier for each transaction
  type: string; // Transaction type (e.g., "Reward Distribution", "Infrastructure Payment")
  amount: string; // Amount in SOL
  status: "Completed" | "Pending" | "Failed"; // Status of the transaction
  timestamp: string; // When the transaction occurred
  hash: string; // Transaction hash
}

// Define the table data using the interface
const tableData: Transaction[] = [
  {
    id: 1,
    type: "Signature",
    amount: "210.95",
    status: "Completed",
    timestamp: "2 hours ago",
    hash: "Snapshot 00001",
  },
  {
    id: 2,
    type: "Signature",
    amount: "23.53",
    status: "Completed",
    timestamp: "4 hours ago",
    hash: "Snapshot 00002",
  },
  {
    id: 3,
    type: "Signature",
    amount: "0.87",
    status: "Pending",
    timestamp: "6 hours ago",
    hash: "Snapshot 00003",
  },
  {
    id: 4,
    type: "Signature",
    amount: "-1.95",
    status: "Completed",
    timestamp: "8 hours ago",
    hash: "Snapshot 00004",
  },
  {
    id: 5,
    type: "Signature",
    amount: "198.42",
    status: "Failed",
    timestamp: "12 hours ago",
    hash: "Snapshot 00005",
  },
  {
    id: 6,
    type: "Signature",
    amount: "12.34",
    status: "Completed",
    timestamp: "just now",
    hash: "Snapshot 00006",
  },
];

export default function TerminalRecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Distribution
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            View All
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Transaction Batch
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount (SOL)
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Time
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((transaction) => (
              <TableRow key={transaction.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-md flex items-center justify-center">
                      <img 
                        src="./images/solanacoin.webp" 
                        alt="Solana Coin" 
                        className="h-[40px] w-[40px] object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {transaction.type}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400 font-mono">
                        {transaction.hash}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                  {transaction.amount}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {transaction.timestamp}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      transaction.status === "Completed"
                        ? "success"
                        : transaction.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 mt-2" />
      <div className="mt-2 pb-1 text-[13px] text-gray-500 dark:text-gray-400 flex justify-center">
        <a
          href="https://solscan.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700 dark:hover:text-gray-300"
        >
          View on Solscan
        </a>
      </div>
    </div>
  );
}
