import React from "react";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";

export default function TerminalDemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  // World regions mapping based on Our World in Data
  const worldRegions = {
    'North America': {
      countries: ['US', 'CA', 'MX', 'GT', 'CU', 'HT', 'DO', 'HN', 'NI', 'CR', 'PA', 'JM', 'BS', 'BB', 'AG', 'DM', 'GD', 'KN', 'LC', 'VC', 'TT', 'BZ', 'GL'],
      users: 0
    },
    'South America': {
      countries: ['BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'UY', 'PY', 'BO', 'EC', 'GY', 'SR', 'GF', 'FK'],
      users: 0
    },
    'Europe': {
      countries: ['GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'DK', 'NO', 'FI', 'SE', 'PL', 'CZ', 'HU', 'RO', 'BG', 'GR', 'PT', 'IE', 'LU', 'MT', 'CY', 'EE', 'LV', 'LT', 'SI', 'SK', 'HR', 'IS', 'LI', 'MC', 'SM', 'VA', 'AD', 'BY', 'MD', 'AL', 'BA', 'ME', 'MK', 'RS', 'XK', 'GE', 'AM', 'AZ', 'UA', 'TR', 'RU'],
      users: 0
    },
    'Asia': {
      countries: ['CN', 'IN', 'JP', 'KR', 'TH', 'VN', 'MY', 'SG', 'ID', 'PH', 'BD', 'PK', 'LK', 'NP', 'BT', 'MV', 'AF', 'IR', 'IQ', 'SY', 'LB', 'JO', 'IL', 'PS', 'SA', 'AE', 'QA', 'BH', 'KW', 'OM', 'YE', 'KZ', 'UZ', 'TM', 'TJ', 'KG', 'MN', 'KP', 'TW', 'HK', 'MO', 'LA', 'KH', 'MM', 'BN', 'TL'],
      users: 0
    },
    'Africa': {
      countries: ['ZA', 'NG', 'EG', 'KE', 'GH', 'MA', 'TN', 'DZ', 'LY', 'SD', 'ET', 'UG', 'TZ', 'ZW', 'BW', 'NA', 'ZM', 'MW', 'MZ', 'MG', 'MU', 'SC', 'KM', 'DJ', 'SO', 'ER', 'SS', 'CF', 'TD', 'NE', 'ML', 'BF', 'CI', 'LR', 'SL', 'GN', 'GW', 'GM', 'SN', 'MR', 'CV', 'ST', 'GQ', 'GA', 'CG', 'CD', 'AO', 'CM'],
      users: 0
    },
    'Oceania': {
      countries: ['AU', 'NZ', 'FJ', 'PG', 'SB', 'VU', 'NC', 'PF', 'WS', 'TO', 'KI', 'TV', 'NR', 'PW', 'FM', 'MH'],
      users: 0
    }
  };

  // Calculate region totals (for now using sample data - will be replaced with real data later)
  const calculateRegionTotals = () => {
    const totals = { ...worldRegions };
    
    // Sample data - in real implementation, this would come from your data source
    totals['North America'].users = 450;
    totals['South America'].users = 320;
    totals['Europe'].users = 380;
    totals['Asia'].users = 280;
    totals['Africa'].users = 89;
    totals['Oceania'].users = 40;
    
    return totals;
  };

  const regionTotals = calculateRegionTotals();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
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
          <CountryMap />
        </div>
      </div>

      {/* World Regions Statistics */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          World Regions Overview
        </h4>
        <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
