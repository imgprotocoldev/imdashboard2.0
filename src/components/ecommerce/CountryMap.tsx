// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useEffect, useState } from "react";
import { fetchCountryUserData, getCountriesWithUsers } from "../../utils/countryData";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  const [countryUserData, setCountryUserData] = useState<Record<string, number>>({});
  const [countriesWithUsers, setCountriesWithUsers] = useState<string[]>([]);

  // Load country data from Supabase
  const loadCountryData = async () => {
    const data = await fetchCountryUserData();
    console.log('CountryMap: Fetched data from Supabase:', data);
    
    const countryMap = data.reduce((acc, { country, userCount }) => {
      acc[country] = userCount;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('CountryMap: Processed countryMap:', countryMap);
    setCountryUserData(countryMap);
    setCountriesWithUsers(getCountriesWithUsers(data));
  };

  useEffect(() => {
    loadCountryData();
  }, []);

  // Listen for profile updates to refresh country data
  useEffect(() => {
    const handleProfileUpdate = () => {
      console.log('Profile updated, refreshing country data...');
      loadCountryData();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);


  // Effect to highlight countries with users after map loads
  useEffect(() => {
    const highlightCountriesWithUsers = () => {
      // Wait for map to be fully rendered
      setTimeout(() => {
        const allPaths = document.querySelectorAll('svg path');
        console.log(`Found ${allPaths.length} path elements`);
        console.log(`Countries with users:`, countriesWithUsers);
        
        allPaths.forEach((path, index) => {
          const element = path as HTMLElement;
          const code = element.getAttribute('data-code');
          const name = element.getAttribute('data-name');
          
          // Check if this country has users
          if (code && countriesWithUsers.includes(code.toUpperCase())) {
            console.log(`Highlighting ${code} - has ${countryUserData[code.toUpperCase()]} users`);
            element.style.fill = "#10B981";
            element.style.fillOpacity = "1";
            element.style.stroke = "#059669";
            element.style.strokeWidth = "1";
          }
        });
      }, 2000);
    };

    if (countriesWithUsers.length > 0) {
      highlightCountriesWithUsers();
    }
  }, [countriesWithUsers, countryUserData]);

  return (
    <>
      <style>
        {`
          /* Highlight countries with users */
          ${countriesWithUsers.map(countryCode => `
            path[data-code="${countryCode}"],
            path[data-code="${countryCode.toLowerCase()}"],
            .jvectormap-region[data-code="${countryCode}"],
            .jvectormap-region[data-code="${countryCode.toLowerCase()}"] {
              fill: #10B981 !important;
              fill-opacity: 1 !important;
              stroke: #059669 !important;
              stroke-width: 1 !important;
            }
          `).join('')}
        `}
      </style>
      <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.8,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      onRegionTipShow={(event: any, tip: any, code: string) => {
        // Get user count directly from countryUserData (same source as World Regions Overview)
        const userCount = countryUserData[code] || 0;
        console.log('CountryMap Tooltip:', { code, userCount, countryUserData });
        
        // Country name mapping for proper display
        const countryNames: Record<string, string> = {
          'US': 'United States', 'CA': 'Canada', 'MX': 'Mexico', 'GB': 'United Kingdom',
          'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
          'BE': 'Belgium', 'CH': 'Switzerland', 'AT': 'Austria', 'DK': 'Denmark', 'NO': 'Norway',
          'FI': 'Finland', 'SE': 'Sweden', 'PL': 'Poland', 'CZ': 'Czech Republic', 'HU': 'Hungary',
          'RO': 'Romania', 'BG': 'Bulgaria', 'GR': 'Greece', 'PT': 'Portugal', 'IE': 'Ireland',
          'LU': 'Luxembourg', 'MT': 'Malta', 'CY': 'Cyprus', 'EE': 'Estonia', 'LV': 'Latvia',
          'LT': 'Lithuania', 'SI': 'Slovenia', 'SK': 'Slovakia', 'HR': 'Croatia', 'BR': 'Brazil',
          'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru', 'VE': 'Venezuela',
          'UY': 'Uruguay', 'PY': 'Paraguay', 'BO': 'Bolivia', 'EC': 'Ecuador', 'ZA': 'South Africa',
          'NG': 'Nigeria', 'EG': 'Egypt', 'KE': 'Kenya', 'GH': 'Ghana', 'MA': 'Morocco',
          'TN': 'Tunisia', 'DZ': 'Algeria', 'LY': 'Libya', 'SD': 'Sudan', 'ET': 'Ethiopia',
          'UG': 'Uganda', 'TZ': 'Tanzania', 'ZW': 'Zimbabwe', 'BW': 'Botswana', 'NA': 'Namibia',
          'ZM': 'Zambia', 'MW': 'Malawi', 'MZ': 'Mozambique', 'MG': 'Madagascar', 'MU': 'Mauritius',
          'SC': 'Seychelles', 'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'TH': 'Thailand',
          'VN': 'Vietnam', 'MY': 'Malaysia', 'SG': 'Singapore', 'ID': 'Indonesia', 'PH': 'Philippines',
          'BD': 'Bangladesh', 'PK': 'Pakistan', 'LK': 'Sri Lanka', 'NP': 'Nepal', 'BT': 'Bhutan',
          'MV': 'Maldives', 'AF': 'Afghanistan', 'IR': 'Iran', 'IQ': 'Iraq', 'SY': 'Syria',
          'LB': 'Lebanon', 'JO': 'Jordan', 'IL': 'Israel', 'PS': 'Palestine', 'SA': 'Saudi Arabia',
          'AE': 'United Arab Emirates', 'QA': 'Qatar', 'BH': 'Bahrain', 'KW': 'Kuwait', 'OM': 'Oman',
          'YE': 'Yemen', 'KZ': 'Kazakhstan', 'UZ': 'Uzbekistan', 'TM': 'Turkmenistan', 'TJ': 'Tajikistan',
          'KG': 'Kyrgyzstan', 'MN': 'Mongolia', 'KP': 'North Korea', 'TW': 'Taiwan', 'HK': 'Hong Kong',
          'MO': 'Macau', 'LA': 'Laos', 'KH': 'Cambodia', 'MM': 'Myanmar', 'BN': 'Brunei',
          'TL': 'East Timor', 'AU': 'Australia', 'NZ': 'New Zealand', 'FJ': 'Fiji', 'PG': 'Papua New Guinea',
          'SB': 'Solomon Islands', 'VU': 'Vanuatu', 'RU': 'Russia', 'UA': 'Ukraine', 'TR': 'Turkey',
          'IS': 'Iceland', 'LI': 'Liechtenstein', 'MC': 'Monaco', 'SM': 'San Marino', 'VA': 'Vatican City',
          'AD': 'Andorra', 'BY': 'Belarus', 'MD': 'Moldova', 'AL': 'Albania', 'BA': 'Bosnia and Herzegovina',
          'ME': 'Montenegro', 'MK': 'North Macedonia', 'RS': 'Serbia', 'XK': 'Kosovo', 'GE': 'Georgia',
          'AM': 'Armenia', 'AZ': 'Azerbaijan', 'GL': 'Greenland', 'CU': 'Cuba', 'JM': 'Jamaica',
          'HT': 'Haiti', 'DO': 'Dominican Republic', 'BS': 'Bahamas', 'BB': 'Barbados', 'AG': 'Antigua and Barbuda',
          'DM': 'Dominica', 'GD': 'Grenada', 'KN': 'Saint Kitts and Nevis', 'LC': 'Saint Lucia',
          'VC': 'Saint Vincent and the Grenadines', 'TT': 'Trinidad and Tobago', 'BZ': 'Belize',
          'GT': 'Guatemala', 'HN': 'Honduras', 'NI': 'Nicaragua', 'CR': 'Costa Rica', 'PA': 'Panama'
        };
        
        const countryName = countryNames[code] || code.toUpperCase();
        const flagCode = code.toLowerCase();
        
        tip.html(`<div style="padding: 8px; background: #465FFF; color: white; border-radius: 4px; font-family: Outfit, sans-serif; display: flex; align-items: center; gap: 8px;">
          <span class="fi fi-${flagCode}" style="font-size: 16px;"></span>
          <div>
            <strong>${countryName}</strong><br/>
            ${userCount}
          </div>
        </div>`);
      }}
      onRegionOver={(event: any, code: string) => {
        // Highlight countries with users on hover
        const userCount = countryUserData[code] || 0;
        if (userCount > 0) {
          event.target.style.fill = "#10B981";
          event.target.style.fillOpacity = "1";
        }
      }}
      onRegionOut={(event: any, code: string) => {
        // Reset color when mouse leaves
        const userCount = countryUserData[code] || 0;
        if (userCount > 0) {
          event.target.style.fill = "#10B981";
          event.target.style.fillOpacity = "1";
        } else {
          event.target.style.fill = mapColor || "#D0D5DD";
          event.target.style.fillOpacity = "1";
        }
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
    </>
  );
};

export default CountryMap;
