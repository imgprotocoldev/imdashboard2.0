// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
  onCountryHover?: (countryData: any) => void;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor, onCountryHover }) => {
  // Test data for countries with users
  const countryData = {
    'US': { name: 'United States', flag: 'us', users: 1, percentage: 0.06 },
    'FR': { name: 'France', flag: 'fr', users: 0, percentage: 0 },
    'GB': { name: 'United Kingdom', flag: 'gb', users: 0, percentage: 0 },
    'IN': { name: 'India', flag: 'in', users: 0, percentage: 0 },
    'SE': { name: 'Sweden', flag: 'se', users: 0, percentage: 0 },
    'DE': { name: 'Germany', flag: 'de', users: 0, percentage: 0 },
    'CA': { name: 'Canada', flag: 'ca', users: 0, percentage: 0 },
    'AU': { name: 'Australia', flag: 'au', users: 0, percentage: 0 },
    'BR': { name: 'Brazil', flag: 'br', users: 0, percentage: 0 },
    'JP': { name: 'Japan', flag: 'jp', users: 0, percentage: 0 },
    'CN': { name: 'China', flag: 'cn', users: 0, percentage: 0 },
    'RU': { name: 'Russia', flag: 'ru', users: 0, percentage: 0 },
    'IT': { name: 'Italy', flag: 'it', users: 0, percentage: 0 },
    'ES': { name: 'Spain', flag: 'es', users: 0, percentage: 0 },
    'NL': { name: 'Netherlands', flag: 'nl', users: 0, percentage: 0 },
    'BE': { name: 'Belgium', flag: 'be', users: 0, percentage: 0 },
    'CH': { name: 'Switzerland', flag: 'ch', users: 0, percentage: 0 },
    'AT': { name: 'Austria', flag: 'at', users: 0, percentage: 0 },
    'DK': { name: 'Denmark', flag: 'dk', users: 0, percentage: 0 },
    'NO': { name: 'Norway', flag: 'no', users: 0, percentage: 0 },
    'FI': { name: 'Finland', flag: 'fi', users: 0, percentage: 0 },
    'NZ': { name: 'New Zealand', flag: 'nz', users: 0, percentage: 0 },
    'PL': { name: 'Poland', flag: 'pl', users: 0, percentage: 0 },
    'CZ': { name: 'Czech Republic', flag: 'cz', users: 0, percentage: 0 },
    'HU': { name: 'Hungary', flag: 'hu', users: 0, percentage: 0 },
    'RO': { name: 'Romania', flag: 'ro', users: 0, percentage: 0 },
    'BG': { name: 'Bulgaria', flag: 'bg', users: 0, percentage: 0 },
    'GR': { name: 'Greece', flag: 'gr', users: 0, percentage: 0 },
    'PT': { name: 'Portugal', flag: 'pt', users: 0, percentage: 0 },
    'IE': { name: 'Ireland', flag: 'ie', users: 0, percentage: 0 },
    'LU': { name: 'Luxembourg', flag: 'lu', users: 0, percentage: 0 },
    'MT': { name: 'Malta', flag: 'mt', users: 0, percentage: 0 },
    'CY': { name: 'Cyprus', flag: 'cy', users: 0, percentage: 0 },
    'EE': { name: 'Estonia', flag: 'ee', users: 0, percentage: 0 },
    'LV': { name: 'Latvia', flag: 'lv', users: 0, percentage: 0 },
    'LT': { name: 'Lithuania', flag: 'lt', users: 0, percentage: 0 },
    'SI': { name: 'Slovenia', flag: 'si', users: 0, percentage: 0 },
    'SK': { name: 'Slovakia', flag: 'sk', users: 0, percentage: 0 },
    'HR': { name: 'Croatia', flag: 'hr', users: 0, percentage: 0 },
    'MX': { name: 'Mexico', flag: 'mx', users: 0, percentage: 0 },
    'AR': { name: 'Argentina', flag: 'ar', users: 0, percentage: 0 },
    'CL': { name: 'Chile', flag: 'cl', users: 0, percentage: 0 },
    'CO': { name: 'Colombia', flag: 'co', users: 0, percentage: 0 },
    'PE': { name: 'Peru', flag: 'pe', users: 0, percentage: 0 },
    'VE': { name: 'Venezuela', flag: 've', users: 0, percentage: 0 },
    'UY': { name: 'Uruguay', flag: 'uy', users: 0, percentage: 0 },
    'PY': { name: 'Paraguay', flag: 'py', users: 0, percentage: 0 },
    'BO': { name: 'Bolivia', flag: 'bo', users: 0, percentage: 0 },
    'EC': { name: 'Ecuador', flag: 'ec', users: 0, percentage: 0 },
    'GY': { name: 'Guyana', flag: 'gy', users: 0, percentage: 0 },
    'SR': { name: 'Suriname', flag: 'sr', users: 0, percentage: 0 },
    'ZA': { name: 'South Africa', flag: 'za', users: 0, percentage: 0 },
    'NG': { name: 'Nigeria', flag: 'ng', users: 0, percentage: 0 },
    'EG': { name: 'Egypt', flag: 'eg', users: 0, percentage: 0 },
    'KE': { name: 'Kenya', flag: 'ke', users: 0, percentage: 0 },
    'GH': { name: 'Ghana', flag: 'gh', users: 0, percentage: 0 },
    'MA': { name: 'Morocco', flag: 'ma', users: 0, percentage: 0 },
    'TN': { name: 'Tunisia', flag: 'tn', users: 0, percentage: 0 },
    'DZ': { name: 'Algeria', flag: 'dz', users: 0, percentage: 0 },
    'LY': { name: 'Libya', flag: 'ly', users: 0, percentage: 0 },
    'SD': { name: 'Sudan', flag: 'sd', users: 0, percentage: 0 },
    'ET': { name: 'Ethiopia', flag: 'et', users: 0, percentage: 0 },
    'UG': { name: 'Uganda', flag: 'ug', users: 0, percentage: 0 },
    'TZ': { name: 'Tanzania', flag: 'tz', users: 0, percentage: 0 },
    'ZW': { name: 'Zimbabwe', flag: 'zw', users: 0, percentage: 0 },
    'BW': { name: 'Botswana', flag: 'bw', users: 0, percentage: 0 },
    'NA': { name: 'Namibia', flag: 'na', users: 0, percentage: 0 },
    'ZM': { name: 'Zambia', flag: 'zm', users: 0, percentage: 0 },
    'MW': { name: 'Malawi', flag: 'mw', users: 0, percentage: 0 },
    'MZ': { name: 'Mozambique', flag: 'mz', users: 0, percentage: 0 },
    'MG': { name: 'Madagascar', flag: 'mg', users: 0, percentage: 0 },
    'MU': { name: 'Mauritius', flag: 'mu', users: 0, percentage: 0 },
    'SC': { name: 'Seychelles', flag: 'sc', users: 0, percentage: 0 },
    'KM': { name: 'Comoros', flag: 'km', users: 0, percentage: 0 },
    'DJ': { name: 'Djibouti', flag: 'dj', users: 0, percentage: 0 },
    'SO': { name: 'Somalia', flag: 'so', users: 0, percentage: 0 },
    'ER': { name: 'Eritrea', flag: 'er', users: 0, percentage: 0 },
    'SS': { name: 'South Sudan', flag: 'ss', users: 0, percentage: 0 },
    'CF': { name: 'Central African Republic', flag: 'cf', users: 0, percentage: 0 },
    'TD': { name: 'Chad', flag: 'td', users: 0, percentage: 0 },
    'NE': { name: 'Niger', flag: 'ne', users: 0, percentage: 0 },
    'ML': { name: 'Mali', flag: 'ml', users: 0, percentage: 0 },
    'BF': { name: 'Burkina Faso', flag: 'bf', users: 0, percentage: 0 },
    'CI': { name: 'Ivory Coast', flag: 'ci', users: 0, percentage: 0 },
    'LR': { name: 'Liberia', flag: 'lr', users: 0, percentage: 0 },
    'SL': { name: 'Sierra Leone', flag: 'sl', users: 0, percentage: 0 },
    'GN': { name: 'Guinea', flag: 'gn', users: 0, percentage: 0 },
    'GW': { name: 'Guinea-Bissau', flag: 'gw', users: 0, percentage: 0 },
    'GM': { name: 'Gambia', flag: 'gm', users: 0, percentage: 0 },
    'SN': { name: 'Senegal', flag: 'sn', users: 0, percentage: 0 },
    'MR': { name: 'Mauritania', flag: 'mr', users: 0, percentage: 0 },
    'CV': { name: 'Cape Verde', flag: 'cv', users: 0, percentage: 0 },
    'ST': { name: 'São Tomé and Príncipe', flag: 'st', users: 0, percentage: 0 },
    'GQ': { name: 'Equatorial Guinea', flag: 'gq', users: 0, percentage: 0 },
    'GA': { name: 'Gabon', flag: 'ga', users: 0, percentage: 0 },
    'CG': { name: 'Republic of the Congo', flag: 'cg', users: 0, percentage: 0 },
    'CD': { name: 'Democratic Republic of the Congo', flag: 'cd', users: 0, percentage: 0 },
    'AO': { name: 'Angola', flag: 'ao', users: 0, percentage: 0 },
    'CM': { name: 'Cameroon', flag: 'cm', users: 0, percentage: 0 },
    'UA': { name: 'Ukraine', flag: 'ua', users: 0, percentage: 0 },
    'TR': { name: 'Turkey', flag: 'tr', users: 0, percentage: 0 },
    'KR': { name: 'South Korea', flag: 'kr', users: 0, percentage: 0 },
    'TH': { name: 'Thailand', flag: 'th', users: 0, percentage: 0 },
    'VN': { name: 'Vietnam', flag: 'vn', users: 0, percentage: 0 },
    'MY': { name: 'Malaysia', flag: 'my', users: 0, percentage: 0 },
    'SG': { name: 'Singapore', flag: 'sg', users: 0, percentage: 0 },
    'ID': { name: 'Indonesia', flag: 'id', users: 0, percentage: 0 },
    'PH': { name: 'Philippines', flag: 'ph', users: 0, percentage: 0 },
    'BD': { name: 'Bangladesh', flag: 'bd', users: 0, percentage: 0 },
    'PK': { name: 'Pakistan', flag: 'pk', users: 0, percentage: 0 },
    'LK': { name: 'Sri Lanka', flag: 'lk', users: 0, percentage: 0 },
    'NP': { name: 'Nepal', flag: 'np', users: 0, percentage: 0 },
    'BT': { name: 'Bhutan', flag: 'bt', users: 0, percentage: 0 },
    'MV': { name: 'Maldives', flag: 'mv', users: 0, percentage: 0 },
    'AF': { name: 'Afghanistan', flag: 'af', users: 0, percentage: 0 },
    'IR': { name: 'Iran', flag: 'ir', users: 0, percentage: 0 },
    'IQ': { name: 'Iraq', flag: 'iq', users: 0, percentage: 0 },
    'SY': { name: 'Syria', flag: 'sy', users: 0, percentage: 0 },
    'LB': { name: 'Lebanon', flag: 'lb', users: 0, percentage: 0 },
    'JO': { name: 'Jordan', flag: 'jo', users: 0, percentage: 0 },
    'IL': { name: 'Israel', flag: 'il', users: 0, percentage: 0 },
    'PS': { name: 'Palestine', flag: 'ps', users: 0, percentage: 0 },
    'SA': { name: 'Saudi Arabia', flag: 'sa', users: 0, percentage: 0 },
    'AE': { name: 'United Arab Emirates', flag: 'ae', users: 0, percentage: 0 },
    'QA': { name: 'Qatar', flag: 'qa', users: 0, percentage: 0 },
    'BH': { name: 'Bahrain', flag: 'bh', users: 0, percentage: 0 },
    'KW': { name: 'Kuwait', flag: 'kw', users: 0, percentage: 0 },
    'OM': { name: 'Oman', flag: 'om', users: 0, percentage: 0 },
    'YE': { name: 'Yemen', flag: 'ye', users: 0, percentage: 0 },
    'KZ': { name: 'Kazakhstan', flag: 'kz', users: 0, percentage: 0 },
    'UZ': { name: 'Uzbekistan', flag: 'uz', users: 0, percentage: 0 },
    'TM': { name: 'Turkmenistan', flag: 'tm', users: 0, percentage: 0 },
    'TJ': { name: 'Tajikistan', flag: 'tj', users: 0, percentage: 0 },
    'KG': { name: 'Kyrgyzstan', flag: 'kg', users: 0, percentage: 0 },
    'MN': { name: 'Mongolia', flag: 'mn', users: 0, percentage: 0 },
    'KP': { name: 'North Korea', flag: 'kp', users: 0, percentage: 0 },
    'TW': { name: 'Taiwan', flag: 'tw', users: 0, percentage: 0 },
    'HK': { name: 'Hong Kong', flag: 'hk', users: 0, percentage: 0 },
    'MO': { name: 'Macau', flag: 'mo', users: 0, percentage: 0 },
    'LA': { name: 'Laos', flag: 'la', users: 0, percentage: 0 },
    'KH': { name: 'Cambodia', flag: 'kh', users: 0, percentage: 0 },
    'MM': { name: 'Myanmar', flag: 'mm', users: 0, percentage: 0 },
    'BN': { name: 'Brunei', flag: 'bn', users: 0, percentage: 0 },
    'TL': { name: 'East Timor', flag: 'tl', users: 0, percentage: 0 },
    'FJ': { name: 'Fiji', flag: 'fj', users: 0, percentage: 0 },
    'PG': { name: 'Papua New Guinea', flag: 'pg', users: 0, percentage: 0 },
    'SB': { name: 'Solomon Islands', flag: 'sb', users: 0, percentage: 0 },
    'VU': { name: 'Vanuatu', flag: 'vu', users: 0, percentage: 0 },
    'NC': { name: 'New Caledonia', flag: 'nc', users: 0, percentage: 0 },
    'PF': { name: 'French Polynesia', flag: 'pf', users: 0, percentage: 0 },
    'WS': { name: 'Samoa', flag: 'ws', users: 0, percentage: 0 },
    'TO': { name: 'Tonga', flag: 'to', users: 0, percentage: 0 },
    'KI': { name: 'Kiribati', flag: 'ki', users: 0, percentage: 0 },
    'TV': { name: 'Tuvalu', flag: 'tv', users: 0, percentage: 0 },
    'NR': { name: 'Nauru', flag: 'nr', users: 0, percentage: 0 },
    'PW': { name: 'Palau', flag: 'pw', users: 0, percentage: 0 },
    'FM': { name: 'Micronesia', flag: 'fm', users: 0, percentage: 0 },
    'MH': { name: 'Marshall Islands', flag: 'mh', users: 0, percentage: 0 },
    'IS': { name: 'Iceland', flag: 'is', users: 0, percentage: 0 },
    'LI': { name: 'Liechtenstein', flag: 'li', users: 0, percentage: 0 },
    'MC': { name: 'Monaco', flag: 'mc', users: 0, percentage: 0 },
    'SM': { name: 'San Marino', flag: 'sm', users: 0, percentage: 0 },
    'VA': { name: 'Vatican City', flag: 'va', users: 0, percentage: 0 },
    'AD': { name: 'Andorra', flag: 'ad', users: 0, percentage: 0 },
    'BY': { name: 'Belarus', flag: 'by', users: 0, percentage: 0 },
    'MD': { name: 'Moldova', flag: 'md', users: 0, percentage: 0 },
    'AL': { name: 'Albania', flag: 'al', users: 0, percentage: 0 },
    'BA': { name: 'Bosnia and Herzegovina', flag: 'ba', users: 0, percentage: 0 },
    'ME': { name: 'Montenegro', flag: 'me', users: 0, percentage: 0 },
    'MK': { name: 'North Macedonia', flag: 'mk', users: 0, percentage: 0 },
    'RS': { name: 'Serbia', flag: 'rs', users: 0, percentage: 0 },
    'XK': { name: 'Kosovo', flag: 'xk', users: 0, percentage: 0 },
    'GE': { name: 'Georgia', flag: 'ge', users: 0, percentage: 0 },
    'AM': { name: 'Armenia', flag: 'am', users: 0, percentage: 0 },
    'AZ': { name: 'Azerbaijan', flag: 'az', users: 0, percentage: 0 },
    'GL': { name: 'Greenland', flag: 'gl', users: 0, percentage: 0 },
    'CU': { name: 'Cuba', flag: 'cu', users: 0, percentage: 0 },
    'JM': { name: 'Jamaica', flag: 'jm', users: 0, percentage: 0 },
    'HT': { name: 'Haiti', flag: 'ht', users: 0, percentage: 0 },
    'DO': { name: 'Dominican Republic', flag: 'do', users: 0, percentage: 0 },
    'BS': { name: 'Bahamas', flag: 'bs', users: 0, percentage: 0 },
    'BB': { name: 'Barbados', flag: 'bb', users: 0, percentage: 0 },
    'AG': { name: 'Antigua and Barbuda', flag: 'ag', users: 0, percentage: 0 },
    'DM': { name: 'Dominica', flag: 'dm', users: 0, percentage: 0 },
    'GD': { name: 'Grenada', flag: 'gd', users: 0, percentage: 0 },
    'KN': { name: 'Saint Kitts and Nevis', flag: 'kn', users: 0, percentage: 0 },
    'LC': { name: 'Saint Lucia', flag: 'lc', users: 0, percentage: 0 },
    'VC': { name: 'Saint Vincent and the Grenadines', flag: 'vc', users: 0, percentage: 0 },
    'TT': { name: 'Trinidad and Tobago', flag: 'tt', users: 0, percentage: 0 },
    'BZ': { name: 'Belize', flag: 'bz', users: 0, percentage: 0 },
    'GT': { name: 'Guatemala', flag: 'gt', users: 0, percentage: 0 },
    'HN': { name: 'Honduras', flag: 'hn', users: 0, percentage: 0 },
    'NI': { name: 'Nicaragua', flag: 'ni', users: 0, percentage: 0 },
    'CR': { name: 'Costa Rica', flag: 'cr', users: 0, percentage: 0 },
    'PA': { name: 'Panama', flag: 'pa', users: 0, percentage: 0 },
    'GF': { name: 'French Guiana', flag: 'gf', users: 0, percentage: 0 },
    'FK': { name: 'Falkland Islands', flag: 'fk', users: 0, percentage: 0 },
    'GS': { name: 'South Georgia and the South Sandwich Islands', flag: 'gs', users: 0, percentage: 0 },
    'BV': { name: 'Bouvet Island', flag: 'bv', users: 0, percentage: 0 },
    'SH': { name: 'Saint Helena', flag: 'sh', users: 0, percentage: 0 },
    'AC': { name: 'Ascension Island', flag: 'ac', users: 0, percentage: 0 },
    'TA': { name: 'Tristan da Cunha', flag: 'ta', users: 0, percentage: 0 },
    'AI': { name: 'Anguilla', flag: 'ai', users: 0, percentage: 0 },
    'AW': { name: 'Aruba', flag: 'aw', users: 0, percentage: 0 },
    'BM': { name: 'Bermuda', flag: 'bm', users: 0, percentage: 0 },
    'BQ': { name: 'Caribbean Netherlands', flag: 'bq', users: 0, percentage: 0 },
    'VG': { name: 'British Virgin Islands', flag: 'vg', users: 0, percentage: 0 },
    'KY': { name: 'Cayman Islands', flag: 'ky', users: 0, percentage: 0 },
    'CW': { name: 'Curaçao', flag: 'cw', users: 0, percentage: 0 },
    'SX': { name: 'Sint Maarten', flag: 'sx', users: 0, percentage: 0 },
    'TC': { name: 'Turks and Caicos Islands', flag: 'tc', users: 0, percentage: 0 },
    'VI': { name: 'United States Virgin Islands', flag: 'vi', users: 0, percentage: 0 },
    'PR': { name: 'Puerto Rico', flag: 'pr', users: 0, percentage: 0 },
    'GP': { name: 'Guadeloupe', flag: 'gp', users: 0, percentage: 0 },
    'MQ': { name: 'Martinique', flag: 'mq', users: 0, percentage: 0 },
    'BL': { name: 'Saint Barthélemy', flag: 'bl', users: 0, percentage: 0 },
    'MF': { name: 'Saint Martin', flag: 'mf', users: 0, percentage: 0 },
    'SJ': { name: 'Svalbard and Jan Mayen', flag: 'sj', users: 0, percentage: 0 },
    'FO': { name: 'Faroe Islands', flag: 'fo', users: 0, percentage: 0 },
    'AX': { name: 'Åland Islands', flag: 'ax', users: 0, percentage: 0 },
    'GI': { name: 'Gibraltar', flag: 'gi', users: 0, percentage: 0 },
    'JE': { name: 'Jersey', flag: 'je', users: 0, percentage: 0 },
    'GG': { name: 'Guernsey', flag: 'gg', users: 0, percentage: 0 },
    'IM': { name: 'Isle of Man', flag: 'im', users: 0, percentage: 0 },
    'AQ': { name: 'Antarctica', flag: 'aq', users: 0, percentage: 0 },
    'TF': { name: 'French Southern Territories', flag: 'tf', users: 0, percentage: 0 },
    'HM': { name: 'Heard Island and McDonald Islands', flag: 'hm', users: 0, percentage: 0 },
    'CC': { name: 'Cocos Islands', flag: 'cc', users: 0, percentage: 0 },
    'CX': { name: 'Christmas Island', flag: 'cx', users: 0, percentage: 0 },
    'NF': { name: 'Norfolk Island', flag: 'nf', users: 0, percentage: 0 },
    'PN': { name: 'Pitcairn Islands', flag: 'pn', users: 0, percentage: 0 },
    'TK': { name: 'Tokelau', flag: 'tk', users: 0, percentage: 0 },
    'WF': { name: 'Wallis and Futuna', flag: 'wf', users: 0, percentage: 0 },
    'AS': { name: 'American Samoa', flag: 'as', users: 0, percentage: 0 },
    'GU': { name: 'Guam', flag: 'gu', users: 0, percentage: 0 },
    'MP': { name: 'Northern Mariana Islands', flag: 'mp', users: 0, percentage: 0 },
    'UM': { name: 'United States Minor Outlying Islands', flag: 'um', users: 0, percentage: 0 },
    'EH': { name: 'Western Sahara', flag: 'eh', users: 0, percentage: 0 },
    'IO': { name: 'British Indian Ocean Territory', flag: 'io', users: 0, percentage: 0 },
  };

  const handleRegionHover = (event: any, code: string) => {
    if (onCountryHover) {
      // Check if we have specific data for this country
      const specificData = countryData[code as keyof typeof countryData];
      
      if (specificData) {
        // Use specific data if available
        onCountryHover(specificData);
      } else {
        // For countries not in our data, create a generic entry
        const genericData = {
          name: code.toUpperCase(), // Use country code as name for unknown countries
          flag: code.toLowerCase(), // Use country code as flag
          users: 0,
          percentage: 0
        };
        onCountryHover(genericData);
      }
    }
  };

  const handleRegionOut = () => {
    // Clear hovered country when mouse leaves country
    if (onCountryHover) {
      onCountryHover({
        name: "",
        flag: "",
        users: 0,
        percentage: 0
      });
    }
  };
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      onRegionTipShow={(event: any, tip: any, code: string) => {
        // Show tooltip for all countries
        const specificData = countryData[code as keyof typeof countryData];
        const data = specificData || {
          name: code.toUpperCase(), // Use country code for unknown countries
          flag: code.toLowerCase(),
          users: 0,
          percentage: 0
        };
        
        tip.html(`<div style="padding: 8px; background: #465FFF; color: white; border-radius: 4px; font-family: Outfit, sans-serif;">
          <strong>${data.name}</strong><br/>
          ${data.users > 0 ? `${data.users} Terminal User${data.users !== 1 ? 's' : ''}` : 'No users'}
        </div>`);
      }}
      onRegionOver={(event: any, code: string) => {
        handleRegionHover(event, code);
      }}
      onRegionOut={() => {
        handleRegionOut();
      }}
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
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
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
  );
};

export default CountryMap;
