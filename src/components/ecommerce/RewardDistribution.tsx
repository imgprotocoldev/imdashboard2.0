import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function RewardDistribution() {
  const series = [210.95, 23.53, 0.87, 1.95]; // SOL amounts
  const options: ApexOptions = {
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"], // Blue, Green, Yellow, Red
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 280,
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total SOL",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1D2939",
              formatter: function (w: any) {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return total.toFixed(2);
              },
            },
            value: {
              show: true,
              fontSize: "14px",
              fontWeight: "500",
              color: "#6B7280",
              formatter: function (val) {
                return val + " SOL";
              },
            },
          },
        },
      },
    },
    labels: [
      "Payment to Holders",
      "Payment to Infra", 
      "Pending Rewards",
      "Net Adjustments"
    ],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (val: number, { w }: any) {
          const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((val / total) * 100).toFixed(1);
          return `${val} SOL (${percentage}%)`;
        },
      },
    },
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Reward Distribution
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Lifetime Allocation in Solana
            </p>
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
        <div className="relative">
          <div className="max-h-[280px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="donut"
              height={280}
            />
          </div>
        </div>
        
      </div>

      <div className="flex items-center justify-center gap-3 px-6 py-2 sm:gap-4 sm:py-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Payment to Holders
            </p>
          </div>
          <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
            210.95 SOL
          </p>
        </div>

        <div className="w-px bg-gray-200 h-5 dark:bg-gray-800"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Payment to Infra
            </p>
          </div>
          <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
            23.53 SOL
          </p>
        </div>

        <div className="w-px bg-gray-200 h-5 dark:bg-gray-800"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pending Rewards
            </p>
          </div>
          <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
            0.87 SOL
          </p>
        </div>

        <div className="w-px bg-gray-200 h-5 dark:bg-gray-800"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Net Adjustments
            </p>
          </div>
          <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
            -1.95 SOL
          </p>
        </div>
      </div>
    </div>
  );
}
