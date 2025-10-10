import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useState } from "react";

export default function TerminalStatisticsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "quarterly" | "annually">("monthly");

  // Data for different time periods
  const dataSets = {
    monthly: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      harvesting: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
      distribution: [160, 170, 140, 120, 155, 145, 150, 180, 210, 190, 220, 200],
    },
    quarterly: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      harvesting: [540, 500, 605, 685],
      distribution: [120, 155, 280, 420],
    },
    annually: {
      categories: ["2021", "2022", "2023", "2024"],
      harvesting: [2000, 2300, 2500, 2100],
      distribution: [500, 800, 1200, 950],
    },
  };

  const currentData = dataSets[selectedPeriod];

  const options: ApexOptions = {
    legend: {
      show: false, // Hide legend
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"], // Define line colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "straight", // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true,
      shared: true, // Show all series in one tooltip
      intersect: false, // Show tooltip when hovering anywhere on the chart
      x: {
        show: true,
        format: "dd MMM yyyy",
      },
      y: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif",
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: currentData.categories,
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toString(); // Remove SOL unit from y-axis labels
        },
        style: {
          fontSize: "12px", // Adjust font size for y-axis labels
          colors: ["#6B7280"], // Color of the labels
        },
      },
      title: {
        text: "", // Remove y-axis title
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Harvesting",
      data: currentData.harvesting,
    },
    {
      name: "Distribution",
      data: currentData.distribution,
    },
  ];
  return (
    <>
      <style>
        {`
          .apexcharts-tooltip {
            min-width: 120px !important;
          }
          .apexcharts-tooltip-series-group {
            display: flex !important;
            align-items: center !important;
            margin-bottom: 2px !important;
            flex-direction: row-reverse !important;
          }
          .apexcharts-tooltip-marker {
            vertical-align: middle !important;
            margin-top: 0 !important;
            margin-left: 6px !important;
            margin-right: 0 !important;
          }
          .apexcharts-tooltip-text {
            line-height: 1.2 !important;
          }
        `}
      </style>
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Cumulative Reward Flow
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Harvest vs. Distribution correlation in SOL
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab 
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
    </>
  );
}
