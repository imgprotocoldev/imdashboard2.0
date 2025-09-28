import React from "react";
import DistributionBatchChart from "../../components/ecommerce/DistributionBatchChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RewardDistribution from "../../components/ecommerce/RewardDistribution";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PriceUSD from "../../components/ecommerce/PriceUSD";
import Volume24H from "../../components/ecommerce/Volume24H";
import TradingVolumeChart from "../../components/ecommerce/TradingVolumeChart";
import PageMeta from "../../components/common/PageMeta";

export default function Terminal() {
  return (
    <>
      <PageMeta
        title="Terminal Dashboard | IMG Protocol - Terminal Interface"
        description="Terminal interface for IMG Protocol dashboard with real-time price data"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* Custom Terminal Metrics with Price USD and 24H Volume */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <PriceUSD />
            <Volume24H />
          </div>

          <DistributionBatchChart />
        </div>

                <div className="col-span-12 xl:col-span-5">
                  <RewardDistribution />
                </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>

        <div className="col-span-12">
          <TradingVolumeChart />
        </div>
      </div>
    </>
  );
}
