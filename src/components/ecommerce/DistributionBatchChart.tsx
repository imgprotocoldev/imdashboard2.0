import React from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { useState } from "react";

export default function DistributionBatchChart() {
  // Distribution data - will come from backend later
  const distributionData = {
    batch: 64,
    incomingSOL: 0.224122990,
    paymentToInfra: 0.021912299,
    paymentToHolders: 0.177427844,
    pendingRewards: 0.019776149,
    net: 0.005006698,
    signature: "3jRUd3QNwtxVSszqjMcxFYNZf7nh4fBCtrcRzR8UHD3NFf65yZyAvQFQfr1dPDDvszQAdL5CXLj7X3EL27CmnrLs",
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Format SOL values to 6 decimal places
  const formatSOL = (value: number) => {
    return value.toFixed(6);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-3 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Distribution Batch
          </h3>
          <Badge variant="light" color="info" size="md">
            {distributionData.batch}
          </Badge>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Export Data
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[320px] sm:min-w-[650px] xl:min-w-full px-2">
          <div className="min-h-[180px] flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Incoming SOL */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Incoming SOL
                  </span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {formatSOL(distributionData.incomingSOL)}
                </span>
              </div>

              {/* Payment to Holders */}
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Payment to Holders
                  </span>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {formatSOL(distributionData.paymentToHolders)}
                </span>
              </div>

              {/* Payment to Infra */}
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Payment to Infra
                  </span>
                </div>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {formatSOL(distributionData.paymentToInfra)}
                </span>
              </div>

              {/* Pending Rewards */}
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Pending Rewards
                  </span>
                </div>
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                  {formatSOL(distributionData.pendingRewards)}
                </span>
              </div>

              {/* Net */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Net
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  {formatSOL(distributionData.net)}
                </span>
              </div>

              {/* Transaction Signature */}
              <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Transaction
                  </span>
                </div>
                <a
                  href={`https://solscan.io/tx/${distributionData.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 truncate max-w-[120px]"
                  title={distributionData.signature}
                >
                  View on Solscan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
