import React from "react";
import { useState, useEffect } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";
import { fetchCountryUserData, calculateRegionTotals, worldRegions } from "../../utils/countryData";

export default function TerminalDemographicCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [regionTotals, setRegionTotals] = useState(worldRegions);
  const [loading, setLoading] = useState(true);

  // Load real data from Supabase
  useEffect(() => {
    const loadRegionData = async () => {
      try {
        setLoading(true);
        const countryData = await fetchCountryUserData();
        const totals = calculateRegionTotals(countryData);
        setRegionTotals(totals);
      } catch (error) {
        console.error('Error loading region data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRegionData();
  }, []);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white pt-5 px-5 pb-[18px] dark:border-gray-800 dark:bg-white/[0.03] sm:pt-6 sm:px-6 sm:pb-[22px]">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Network Demographics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Active terminal users by country
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
      <div className="px-4 py-6 mt-6 mb-[22px] overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <CountryMap />
        </div>
      </div>

              {/* World Regions Statistics */}
              <div className="space-y-[14px]">
                {loading ? (
                  <div className="grid grid-cols-2 gap-[14px]">
                    {Object.entries(regionTotals).map(([regionName, regionData]) => (
                      <div key={regionName} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90 text-sm">
                            {regionName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-12 rounded"></div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Terminal Users
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-[14px]">
                    {Object.entries(regionTotals).map(([regionName, regionData]) => (
                      <div key={regionName} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90 text-sm">
                            {regionName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800 dark:text-white/90 text-lg">
                            {regionData.users.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Terminal Users
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
    </div>
  );
}
