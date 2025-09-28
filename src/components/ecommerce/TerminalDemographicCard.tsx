import React from "react";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";

export default function TerminalDemographicCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Global",
    flag: "globalusers.webp",
    users: 1559,
    percentage: 100
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // This function will be called when user hovers over a country on the map
  function handleCountryHover(countryData: any) {
    if (countryData && countryData.users > 0) {
      setSelectedCountry({
        name: countryData.name,
        flag: countryData.flag,
        users: countryData.users,
        percentage: countryData.percentage
      });
    }
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
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
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <CountryMap onCountryHover={handleCountryHover} />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="items-center w-full rounded-full max-w-8">
              {selectedCountry.flag === "globalusers.webp" ? (
                <img src="./images/globalusers.webp" alt="global" className="w-8 h-8 rounded-full" />
              ) : (
                <span className={`fi fi-${selectedCountry.flag.toLowerCase()} text-2xl`}></span>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                {selectedCountry.name}
              </p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {selectedCountry.users.toLocaleString()} Terminal Users
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded bg-gray-200 dark:bg-gray-800">
              <div 
                className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"
                style={{ width: `${selectedCountry.percentage}%` }}
              ></div>
            </div>
            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {selectedCountry.percentage}%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="items-center w-full rounded-full max-w-8">
              {/* Empty initially - will be populated on hover */}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                {/* Empty initially - will be populated on hover */}
              </p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {/* Empty initially - will be populated on hover */}
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 flex h-full w-0 items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"></div>
            </div>
            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {/* Empty initially - will be populated on hover */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
