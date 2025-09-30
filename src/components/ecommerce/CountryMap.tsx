// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useEffect, useState, useCallback } from "react";
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
    const countryMap = data.reduce((acc, { country, userCount }) => {
      acc[country] = userCount;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('CountryMap: Loaded countryUserData:', countryMap);
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

  // Create reactive tooltip handler that always has access to latest state
  const handleRegionTipShow = useCallback((_event: any, tip: any, code: string) => {
    // Get country name and flag from static data
    const specificData = countryData[code as keyof typeof countryData];
    const countryName = specificData?.name || code.toUpperCase();
    const flagCode = code.toLowerCase();
    
    // Get user count directly from state (reactive to changes)
    const userCount = countryUserData[code.toUpperCase()] || countryUserData[code] || 0;
    
    console.log('Tooltip for', code, '- countryUserData:', countryUserData, '- userCount:', userCount);
    
    tip.html(`<div style="padding: 8px; background: #465FFF; color: white; border-radius: 4px; font-family: Outfit, sans-serif; display: flex; align-items: center; gap: 8px;">
      <span class="fi fi-${flagCode}" style="font-size: 16px;"></span>
      <div>
        <strong>${countryName}</strong><br/>
        ${userCount}
      </div>
    </div>`);
  }, [countryUserData]);

  // Static country data for names and flags only
  const countryData = {
    'US': { name: 'United States', flag: 'us' },
    'FR': { name: 'France', flag: 'fr' },
    'GB': { name: 'United Kingdom', flag: 'gb' },
    'IN': { name: 'India', flag: 'in' },
    'SE': { name: 'Sweden', flag: 'se' },
    'DE': { name: 'Germany', flag: 'de' },
    'CA': { name: 'Canada', flag: 'ca' },
    'AU': { name: 'Australia', flag: 'au' },
    'BR': { name: 'Brazil', flag: 'br' },
    'JP': { name: 'Japan', flag: 'jp' },
    'CN': { name: 'China', flag: 'cn' },
    'RU': { name: 'Russia', flag: 'ru' },
    'IT': { name: 'Italy', flag: 'it' },
    'ES': { name: 'Spain', flag: 'es' },
    'NL': { name: 'Netherlands', flag: 'nl' },
    'BE': { name: 'Belgium', flag: 'be' },
    'CH': { name: 'Switzerland', flag: 'ch' },
    'AT': { name: 'Austria', flag: 'at' },
    'DK': { name: 'Denmark', flag: 'dk' },
    'NO': { name: 'Norway', flag: 'no' },
    'FI': { name: 'Finland', flag: 'fi' },
    'NZ': { name: 'New Zealand', flag: 'nz' },
    'PL': { name: 'Poland', flag: 'pl' },
    'CZ': { name: 'Czech Republic', flag: 'cz' },
    'HU': { name: 'Hungary', flag: 'hu' },
    'RO': { name: 'Romania', flag: 'ro' },
    'BG': { name: 'Bulgaria', flag: 'bg' },
    'GR': { name: 'Greece', flag: 'gr' },
    'PT': { name: 'Portugal', flag: 'pt' },
    'IE': { name: 'Ireland', flag: 'ie' },
    'LU': { name: 'Luxembourg', flag: 'lu' },
    'MT': { name: 'Malta', flag: 'mt' },
    'CY': { name: 'Cyprus', flag: 'cy' },
    'EE': { name: 'Estonia', flag: 'ee' },
    'LV': { name: 'Latvia', flag: 'lv' },
    'LT': { name: 'Lithuania', flag: 'lt' },
    'SI': { name: 'Slovenia', flag: 'si' },
    'SK': { name: 'Slovakia', flag: 'sk' },
    'HR': { name: 'Croatia', flag: 'hr' },
    'MX': { name: 'Mexico', flag: 'mx' },
    'AR': { name: 'Argentina', flag: 'ar' },
    'CL': { name: 'Chile', flag: 'cl' },
    'CO': { name: 'Colombia', flag: 'co' },
    'PE': { name: 'Peru', flag: 'pe' },
    'VE': { name: 'Venezuela', flag: 've' },
    'UY': { name: 'Uruguay', flag: 'uy' },
    'PY': { name: 'Paraguay', flag: 'py' },
    'BO': { name: 'Bolivia', flag: 'bo' },
    'EC': { name: 'Ecuador', flag: 'ec' },
    'GY': { name: 'Guyana', flag: 'gy' },
    'SR': { name: 'Suriname', flag: 'sr' },
    'ZA': { name: 'South Africa', flag: 'za' },
    'NG': { name: 'Nigeria', flag: 'ng' },
    'EG': { name: 'Egypt', flag: 'eg' },
    'KE': { name: 'Kenya', flag: 'ke' },
    'GH': { name: 'Ghana', flag: 'gh' },
    'MA': { name: 'Morocco', flag: 'ma' },
    'TN': { name: 'Tunisia', flag: 'tn' },
    'DZ': { name: 'Algeria', flag: 'dz' },
    'LY': { name: 'Libya', flag: 'ly' },
    'SD': { name: 'Sudan', flag: 'sd' },
    'ET': { name: 'Ethiopia', flag: 'et' },
    'UG': { name: 'Uganda', flag: 'ug' },
    'TZ': { name: 'Tanzania', flag: 'tz' },
    'ZW': { name: 'Zimbabwe', flag: 'zw' },
    'BW': { name: 'Botswana', flag: 'bw' },
    'NA': { name: 'Namibia', flag: 'na' },
    'ZM': { name: 'Zambia', flag: 'zm' },
    'MW': { name: 'Malawi', flag: 'mw' },
    'MZ': { name: 'Mozambique', flag: 'mz' },
    'MG': { name: 'Madagascar', flag: 'mg' },
    'MU': { name: 'Mauritius', flag: 'mu' },
    'SC': { name: 'Seychelles', flag: 'sc' },
    'KM': { name: 'Comoros', flag: 'km' },
    'DJ': { name: 'Djibouti', flag: 'dj' },
    'SO': { name: 'Somalia', flag: 'so' },
    'ER': { name: 'Eritrea', flag: 'er' },
    'SS': { name: 'South Sudan', flag: 'ss' },
    'CF': { name: 'Central African Republic', flag: 'cf' },
    'TD': { name: 'Chad', flag: 'td' },
    'NE': { name: 'Niger', flag: 'ne' },
    'ML': { name: 'Mali', flag: 'ml' },
    'BF': { name: 'Burkina Faso', flag: 'bf' },
    'CI': { name: 'Ivory Coast', flag: 'ci' },
    'LR': { name: 'Liberia', flag: 'lr' },
    'SL': { name: 'Sierra Leone', flag: 'sl' },
    'GN': { name: 'Guinea', flag: 'gn' },
    'GW': { name: 'Guinea-Bissau', flag: 'gw' },
    'GM': { name: 'Gambia', flag: 'gm' },
    'SN': { name: 'Senegal', flag: 'sn' },
    'MR': { name: 'Mauritania', flag: 'mr' },
    'CV': { name: 'Cape Verde', flag: 'cv' },
    'ST': { name: 'São Tomé and Príncipe', flag: 'st' },
    'GQ': { name: 'Equatorial Guinea', flag: 'gq' },
    'GA': { name: 'Gabon', flag: 'ga' },
    'CG': { name: 'Republic of the Congo', flag: 'cg' },
    'CD': { name: 'Democratic Republic of the Congo', flag: 'cd' },
    'AO': { name: 'Angola', flag: 'ao' },
    'CM': { name: 'Cameroon', flag: 'cm' },
    'UA': { name: 'Ukraine', flag: 'ua' },
    'TR': { name: 'Turkey', flag: 'tr' },
    'KR': { name: 'South Korea', flag: 'kr' },
    'TH': { name: 'Thailand', flag: 'th' },
    'VN': { name: 'Vietnam', flag: 'vn' },
    'MY': { name: 'Malaysia', flag: 'my' },
    'SG': { name: 'Singapore', flag: 'sg' },
    'ID': { name: 'Indonesia', flag: 'id' },
    'PH': { name: 'Philippines', flag: 'ph' },
    'BD': { name: 'Bangladesh', flag: 'bd' },
    'PK': { name: 'Pakistan', flag: 'pk' },
    'LK': { name: 'Sri Lanka', flag: 'lk' },
    'NP': { name: 'Nepal', flag: 'np' },
    'BT': { name: 'Bhutan', flag: 'bt' },
    'MV': { name: 'Maldives', flag: 'mv' },
    'AF': { name: 'Afghanistan', flag: 'af' },
    'IR': { name: 'Iran', flag: 'ir' },
    'IQ': { name: 'Iraq', flag: 'iq' },
    'SY': { name: 'Syria', flag: 'sy' },
    'LB': { name: 'Lebanon', flag: 'lb' },
    'JO': { name: 'Jordan', flag: 'jo' },
    'IL': { name: 'Israel', flag: 'il' },
    'PS': { name: 'Palestine', flag: 'ps' },
    'SA': { name: 'Saudi Arabia', flag: 'sa' },
    'AE': { name: 'United Arab Emirates', flag: 'ae' },
    'QA': { name: 'Qatar', flag: 'qa' },
    'BH': { name: 'Bahrain', flag: 'bh' },
    'KW': { name: 'Kuwait', flag: 'kw' },
    'OM': { name: 'Oman', flag: 'om' },
    'YE': { name: 'Yemen', flag: 'ye' },
    'KZ': { name: 'Kazakhstan', flag: 'kz' },
    'UZ': { name: 'Uzbekistan', flag: 'uz' },
    'TM': { name: 'Turkmenistan', flag: 'tm' },
    'TJ': { name: 'Tajikistan', flag: 'tj' },
    'KG': { name: 'Kyrgyzstan', flag: 'kg' },
    'MN': { name: 'Mongolia', flag: 'mn' },
    'KP': { name: 'North Korea', flag: 'kp' },
    'TW': { name: 'Taiwan', flag: 'tw' },
    'HK': { name: 'Hong Kong', flag: 'hk' },
    'MO': { name: 'Macau', flag: 'mo' },
    'LA': { name: 'Laos', flag: 'la' },
    'KH': { name: 'Cambodia', flag: 'kh' },
    'MM': { name: 'Myanmar', flag: 'mm' },
    'BN': { name: 'Brunei', flag: 'bn' },
    'TL': { name: 'East Timor', flag: 'tl' },
    'FJ': { name: 'Fiji', flag: 'fj' },
    'PG': { name: 'Papua New Guinea', flag: 'pg' },
    'SB': { name: 'Solomon Islands', flag: 'sb' },
    'VU': { name: 'Vanuatu', flag: 'vu' },
    'NC': { name: 'New Caledonia', flag: 'nc' },
    'PF': { name: 'French Polynesia', flag: 'pf' },
    'WS': { name: 'Samoa', flag: 'ws' },
    'TO': { name: 'Tonga', flag: 'to' },
    'KI': { name: 'Kiribati', flag: 'ki' },
    'TV': { name: 'Tuvalu', flag: 'tv' },
    'NR': { name: 'Nauru', flag: 'nr' },
    'PW': { name: 'Palau', flag: 'pw' },
    'FM': { name: 'Micronesia', flag: 'fm' },
    'MH': { name: 'Marshall Islands', flag: 'mh' },
    'IS': { name: 'Iceland', flag: 'is' },
    'LI': { name: 'Liechtenstein', flag: 'li' },
    'MC': { name: 'Monaco', flag: 'mc' },
    'SM': { name: 'San Marino', flag: 'sm' },
    'VA': { name: 'Vatican City', flag: 'va' },
    'AD': { name: 'Andorra', flag: 'ad' },
    'BY': { name: 'Belarus', flag: 'by' },
    'MD': { name: 'Moldova', flag: 'md' },
    'AL': { name: 'Albania', flag: 'al' },
    'BA': { name: 'Bosnia and Herzegovina', flag: 'ba' },
    'ME': { name: 'Montenegro', flag: 'me' },
    'MK': { name: 'North Macedonia', flag: 'mk' },
    'RS': { name: 'Serbia', flag: 'rs' },
    'XK': { name: 'Kosovo', flag: 'xk' },
    'GE': { name: 'Georgia', flag: 'ge' },
    'AM': { name: 'Armenia', flag: 'am' },
    'AZ': { name: 'Azerbaijan', flag: 'az' },
    'GL': { name: 'Greenland', flag: 'gl' },
    'CU': { name: 'Cuba', flag: 'cu' },
    'JM': { name: 'Jamaica', flag: 'jm' },
    'HT': { name: 'Haiti', flag: 'ht' },
    'DO': { name: 'Dominican Republic', flag: 'do' },
    'BS': { name: 'Bahamas', flag: 'bs' },
    'BB': { name: 'Barbados', flag: 'bb' },
    'AG': { name: 'Antigua and Barbuda', flag: 'ag' },
    'DM': { name: 'Dominica', flag: 'dm' },
    'GD': { name: 'Grenada', flag: 'gd' },
    'KN': { name: 'Saint Kitts and Nevis', flag: 'kn' },
    'LC': { name: 'Saint Lucia', flag: 'lc' },
    'VC': { name: 'Saint Vincent and the Grenadines', flag: 'vc' },
    'TT': { name: 'Trinidad and Tobago', flag: 'tt' },
    'BZ': { name: 'Belize', flag: 'bz' },
    'GT': { name: 'Guatemala', flag: 'gt' },
    'HN': { name: 'Honduras', flag: 'hn' },
    'NI': { name: 'Nicaragua', flag: 'ni' },
    'CR': { name: 'Costa Rica', flag: 'cr' },
    'PA': { name: 'Panama', flag: 'pa' },
    'GF': { name: 'French Guiana', flag: 'gf' },
    'FK': { name: 'Falkland Islands', flag: 'fk' },
    'GS': { name: 'South Georgia and the South Sandwich Islands', flag: 'gs' },
    'BV': { name: 'Bouvet Island', flag: 'bv' },
    'SH': { name: 'Saint Helena', flag: 'sh' },
    'AC': { name: 'Ascension Island', flag: 'ac' },
    'TA': { name: 'Tristan da Cunha', flag: 'ta' },
    'AI': { name: 'Anguilla', flag: 'ai' },
    'AW': { name: 'Aruba', flag: 'aw' },
    'BM': { name: 'Bermuda', flag: 'bm' },
    'BQ': { name: 'Caribbean Netherlands', flag: 'bq' },
    'VG': { name: 'British Virgin Islands', flag: 'vg' },
    'KY': { name: 'Cayman Islands', flag: 'ky' },
    'CW': { name: 'Curaçao', flag: 'cw' },
    'SX': { name: 'Sint Maarten', flag: 'sx' },
    'TC': { name: 'Turks and Caicos Islands', flag: 'tc' },
    'VI': { name: 'United States Virgin Islands', flag: 'vi' },
    'PR': { name: 'Puerto Rico', flag: 'pr' },
    'GP': { name: 'Guadeloupe', flag: 'gp' },
    'MQ': { name: 'Martinique', flag: 'mq' },
    'BL': { name: 'Saint Barthélemy', flag: 'bl' },
    'MF': { name: 'Saint Martin', flag: 'mf' },
    'SJ': { name: 'Svalbard and Jan Mayen', flag: 'sj' },
    'FO': { name: 'Faroe Islands', flag: 'fo' },
    'AX': { name: 'Åland Islands', flag: 'ax' },
    'GI': { name: 'Gibraltar', flag: 'gi' },
    'JE': { name: 'Jersey', flag: 'je' },
    'GG': { name: 'Guernsey', flag: 'gg' },
    'IM': { name: 'Isle of Man', flag: 'im' },
    'AQ': { name: 'Antarctica', flag: 'aq' },
    'TF': { name: 'French Southern Territories', flag: 'tf' },
    'HM': { name: 'Heard Island and McDonald Islands', flag: 'hm' },
    'CC': { name: 'Cocos Islands', flag: 'cc' },
    'CX': { name: 'Christmas Island', flag: 'cx' },
    'NF': { name: 'Norfolk Island', flag: 'nf' },
    'PN': { name: 'Pitcairn Islands', flag: 'pn' },
    'TK': { name: 'Tokelau', flag: 'tk' },
    'WF': { name: 'Wallis and Futuna', flag: 'wf' },
    'AS': { name: 'American Samoa', flag: 'as' },
    'GU': { name: 'Guam', flag: 'gu' },
    'MP': { name: 'Northern Mariana Islands', flag: 'mp' },
    'UM': { name: 'United States Minor Outlying Islands', flag: 'um' },
    'EH': { name: 'Western Sahara', flag: 'eh' },
    'IO': { name: 'British Indian Ocean Territory', flag: 'io' },
  };

  // Effect to highlight countries with users after map loads
  useEffect(() => {
    const highlightCountriesWithUsers = () => {
      // Wait for map to be fully rendered
      setTimeout(() => {
        const allPaths = document.querySelectorAll('svg path');
        console.log(`Found ${allPaths.length} path elements`);
        console.log(`Countries with users:`, countriesWithUsers);
        
        allPaths.forEach((path) => {
          const element = path as HTMLElement;
          const code = element.getAttribute('data-code');
          
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
      key={Object.keys(countryUserData).length > 0 ? Object.keys(countryUserData).join(',') : 'empty'}
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
      onRegionTipShow={handleRegionTipShow}
      onRegionOver={(event: any, code: string) => {
        // Highlight countries with users on hover
        const userCount = countryUserData[code.toUpperCase()] || countryUserData[code] || 0;
        if (userCount > 0) {
          event.target.style.fill = "#10B981";
          event.target.style.fillOpacity = "1";
        }
      }}
      onRegionOut={(event: any, code: string) => {
        // Reset color when mouse leaves
        const userCount = countryUserData[code.toUpperCase()] || countryUserData[code] || 0;
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
