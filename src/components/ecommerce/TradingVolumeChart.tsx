import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function TradingVolumeChart() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Sample data for IMG trading volume (last 7 days)
  const series = [
    {
      name: "Trading Volume",
      data: [125000, 98000, 156000, 89000, 234000, 187000, 145000], // Volume in USD
    },
  ];

  const options: ApexOptions = {
    colors: ["#3B82F6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 350,
      sparkline: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          zoomin: true,
          zoomout: true,
          reset: false,
          pan: false,
          download: false,
          selection: false,
        },
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
        formatter: function (val: number) {
          return "$" + (val / 1000).toFixed(0) + "K";
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val: number) {
          return "$" + val.toLocaleString();
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <>
      <style>
        {`
          .apexcharts-toolbar {
            display: flex !important;
            justify-content: flex-end !important;
          }
          /* Hide all icons by default */
          .apexcharts-toolbar .apexcharts-toolbar-icon,
          .apexcharts-toolbar .apexcharts-zoom-icon,
          .apexcharts-toolbar .apexcharts-zoomx,
          .apexcharts-toolbar .apexcharts-zoomy,
          .apexcharts-toolbar .apexcharts-zoomxy,
          .apexcharts-toolbar .apexcharts-selection-icon,
          .apexcharts-toolbar .apexcharts-pan-icon,
          .apexcharts-toolbar .apexcharts-reset-icon,
          .apexcharts-toolbar .apexcharts-menu-icon,
          .apexcharts-toolbar .apexcharts-download-icon { display: none !important; }

          /* Only show zoom-in and zoom-out */
          .apexcharts-toolbar .apexcharts-zoomin-icon,
          .apexcharts-toolbar .apexcharts-zoomout-icon { display: inline-flex !important; align-items: center; justify-content: center; margin-left: 8px; }

          /* Make zoom icons a bit larger for usability */
          .apexcharts-toolbar .apexcharts-zoomin-icon svg,
          .apexcharts-toolbar .apexcharts-zoomout-icon svg { width: 22px !important; height: 22px !important; }

          /* Fallback scale in case width/height are overridden by theme */
          .apexcharts-toolbar .apexcharts-zoomin-icon,
          .apexcharts-toolbar .apexcharts-zoomout-icon { transform: scale(1.1); }
        `}
      </style>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Reward Conversion Flow
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            IMG / SOL sales per transaction
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
              View Details
            </DropdownItem>
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                window.open('https://solscan.io/', '_blank', 'noopener,noreferrer');
              }}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Solscan
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="relative">
        <Chart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">IMG Sold</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
            $145.2K
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">SOL Earned</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
            1.30 SOL
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
            $10K
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
