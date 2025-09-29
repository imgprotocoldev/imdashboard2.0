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
    const countryMap = data.reduce((acc, { country, userCount }) => {
      acc[country] = userCount;
      return acc;
    }, {} as Record<string, number>);
    
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

  // Create dynamic country data based on actual user data
  const countryData = {
    'US': { name: 'United States', flag: 'us', users: countryUserData['US'] || 0, percentage: 0.06 },
    'FR': { name: 'France', flag: 'fr', users: countryUserData['FR'] || 0, percentage: 0 },
    'GB': { name: 'United Kingdom', flag: 'gb', users: countryUserData['GB'] || 0, percentage: 0 },
    'IN': { name: 'India', flag: 'in', users: countryUserData['IN'] || 0, percentage: 0 },
    'SE': { name: 'Sweden', flag: 'se', users: countryUserData['SE'] || 0, percentage: 0 },
    'DE': { name: 'Germany', flag: 'de', users: countryUserData['DE'] || 0, percentage: 0 },
    'CA': { name: 'Canada', flag: 'ca', users: countryUserData['CA'] || 0, percentage: 0 },
    'AU': { name: 'Australia', flag: 'au', users: countryUserData['AU'] || 0, percentage: 0 },
    'BR': { name: 'Brazil', flag: 'br', users: countryUserData['BR'] || 0, percentage: 0 },
    'JP': { name: 'Japan', flag: 'jp', users: countryUserData['JP'] || 0, percentage: 0 },
    'CN': { name: 'China', flag: 'cn', users: countryUserData['CN'] || 0, percentage: 0 },
    'RU': { name: 'Russia', flag: 'ru', users: countryUserData['RU'] || 0, percentage: 0 },
    'IT': { name: 'Italy', flag: 'it', users: countryUserData['IT'] || 0, percentage: 0 },
    'ES': { name: 'Spain', flag: 'es', users: countryUserData['ES'] || 0, percentage: 0 },
    'NL': { name: 'Netherlands', flag: 'nl', users: countryUserData['NL'] || 0, percentage: 0 },
    'BE': { name: 'Belgium', flag: 'be', users: countryUserData['BE'] || 0, percentage: 0 },
    'CH': { name: 'Switzerland', flag: 'ch', users: countryUserData['CH'] || 0, percentage: 0 },
    'AT': { name: 'Austria', flag: 'at', users: countryUserData['AT'] || 0, percentage: 0 },
    'DK': { name: 'Denmark', flag: 'dk', users: countryUserData['DK'] || 0, percentage: 0 },
    'NO': { name: 'Norway', flag: 'no', users: countryUserData['NO'] || 0, percentage: 0 },
    'FI': { name: 'Finland', flag: 'fi', users: countryUserData['FI'] || 0, percentage: 0 },
    'NZ': { name: 'New Zealand', flag: 'nz', users: countryUserData['NZ'] || 0, percentage: 0 },
    'PL': { name: 'Poland', flag: 'pl', users: countryUserData['PL'] || 0, percentage: 0 },
    'CZ': { name: 'Czech Republic', flag: 'cz', users: countryUserData['CZ'] || 0, percentage: 0 },
    'HU': { name: 'Hungary', flag: 'hu', users: countryUserData['HU'] || 0, percentage: 0 },
    'RO': { name: 'Romania', flag: 'ro', users: countryUserData['RO'] || 0, percentage: 0 },
    'BG': { name: 'Bulgaria', flag: 'bg', users: countryUserData['BG'] || 0, percentage: 0 },
    'GR': { name: 'Greece', flag: 'gr', users: countryUserData['GR'] || 0, percentage: 0 },
    'PT': { name: 'Portugal', flag: 'pt', users: countryUserData['PT'] || 0, percentage: 0 },
    'IE': { name: 'Ireland', flag: 'ie', users: countryUserData['IE'] || 0, percentage: 0 },
    'LU': { name: 'Luxembourg', flag: 'lu', users: countryUserData['LU'] || 0, percentage: 0 },
    'MT': { name: 'Malta', flag: 'mt', users: countryUserData['MT'] || 0, percentage: 0 },
    'CY': { name: 'Cyprus', flag: 'cy', users: countryUserData['CY'] || 0, percentage: 0 },
    'EE': { name: 'Estonia', flag: 'ee', users: countryUserData['EE'] || 0, percentage: 0 },
    'LV': { name: 'Latvia', flag: 'lv', users: countryUserData['LV'] || 0, percentage: 0 },
    'LT': { name: 'Lithuania', flag: 'lt', users: countryUserData['LT'] || 0, percentage: 0 },
    'SI': { name: 'Slovenia', flag: 'si', users: countryUserData['SI'] || 0, percentage: 0 },
    'SK': { name: 'Slovakia', flag: 'sk', users: countryUserData['SK'] || 0, percentage: 0 },
    'HR': { name: 'Croatia', flag: 'hr', users: countryUserData['HR'] || 0, percentage: 0 },
    'MX': { name: 'Mexico', flag: 'mx', users: countryUserData['MX'] || 0, percentage: 0 },
    'AR': { name: 'Argentina', flag: 'ar', users: countryUserData['AR'] || 0, percentage: 0 },
    'CL': { name: 'Chile', flag: 'cl', users: countryUserData['CL'] || 0, percentage: 0 },
    'CO': { name: 'Colombia', flag: 'co', users: countryUserData['CO'] || 0, percentage: 0 },
    'PE': { name: 'Peru', flag: 'pe', users: countryUserData['PE'] || 0, percentage: 0 },
    'VE': { name: 'Venezuela', flag: 've', users: countryUserData['VE'] || 0, percentage: 0 },
    'UY': { name: 'Uruguay', flag: 'uy', users: countryUserData['UY'] || 0, percentage: 0 },
    'PY': { name: 'Paraguay', flag: 'py', users: countryUserData['PY'] || 0, percentage: 0 },
    'BO': { name: 'Bolivia', flag: 'bo', users: countryUserData['BO'] || 0, percentage: 0 },
    'EC': { name: 'Ecuador', flag: 'ec', users: countryUserData['EC'] || 0, percentage: 0 },
    'GY': { name: 'Guyana', flag: 'gy', users: countryUserData['GY'] || 0, percentage: 0 },
    'SR': { name: 'Suriname', flag: 'sr', users: countryUserData['SR'] || 0, percentage: 0 },
    'ZA': { name: 'South Africa', flag: 'za', users: countryUserData['ZA'] || 0, percentage: 0 },
    'NG': { name: 'Nigeria', flag: 'ng', users: countryUserData['NG'] || 0, percentage: 0 },
    'EG': { name: 'Egypt', flag: 'eg', users: countryUserData['EG'] || 0, percentage: 0 },
    'KE': { name: 'Kenya', flag: 'ke', users: countryUserData['KE'] || 0, percentage: 0 },
    'GH': { name: 'Ghana', flag: 'gh', users: countryUserData['GH'] || 0, percentage: 0 },
    'MA': { name: 'Morocco', flag: 'ma', users: countryUserData['MA'] || 0, percentage: 0 },
    'TN': { name: 'Tunisia', flag: 'tn', users: countryUserData['TN'] || 0, percentage: 0 },
    'DZ': { name: 'Algeria', flag: 'dz', users: countryUserData['DZ'] || 0, percentage: 0 },
    'LY': { name: 'Libya', flag: 'ly', users: countryUserData['LY'] || 0, percentage: 0 },
    'SD': { name: 'Sudan', flag: 'sd', users: countryUserData['SD'] || 0, percentage: 0 },
    'ET': { name: 'Ethiopia', flag: 'et', users: countryUserData['ET'] || 0, percentage: 0 },
    'UG': { name: 'Uganda', flag: 'ug', users: countryUserData['UG'] || 0, percentage: 0 },
    'TZ': { name: 'Tanzania', flag: 'tz', users: countryUserData['TZ'] || 0, percentage: 0 },
    'ZW': { name: 'Zimbabwe', flag: 'zw', users: countryUserData['ZW'] || 0, percentage: 0 },
    'BW': { name: 'Botswana', flag: 'bw', users: countryUserData['BW'] || 0, percentage: 0 },
    'NA': { name: 'Namibia', flag: 'na', users: countryUserData['NA'] || 0, percentage: 0 },
    'ZM': { name: 'Zambia', flag: 'zm', users: countryUserData['ZM'] || 0, percentage: 0 },
    'MW': { name: 'Malawi', flag: 'mw', users: countryUserData['MW'] || 0, percentage: 0 },
    'MZ': { name: 'Mozambique', flag: 'mz', users: countryUserData['MZ'] || 0, percentage: 0 },
    'MG': { name: 'Madagascar', flag: 'mg', users: countryUserData['MG'] || 0, percentage: 0 },
    'MU': { name: 'Mauritius', flag: 'mu', users: countryUserData['MU'] || 0, percentage: 0 },
    'SC': { name: 'Seychelles', flag: 'sc', users: countryUserData['SC'] || 0, percentage: 0 },
    'KM': { name: 'Comoros', flag: 'km', users: countryUserData['KM'] || 0, percentage: 0 },
    'DJ': { name: 'Djibouti', flag: 'dj', users: countryUserData['DJ'] || 0, percentage: 0 },
    'SO': { name: 'Somalia', flag: 'so', users: countryUserData['SO'] || 0, percentage: 0 },
    'ER': { name: 'Eritrea', flag: 'er', users: countryUserData['ER'] || 0, percentage: 0 },
    'SS': { name: 'South Sudan', flag: 'ss', users: countryUserData['SS'] || 0, percentage: 0 },
    'CF': { name: 'Central African Republic', flag: 'cf', users: countryUserData['CF'] || 0, percentage: 0 },
    'TD': { name: 'Chad', flag: 'td', users: countryUserData['TD'] || 0, percentage: 0 },
    'NE': { name: 'Niger', flag: 'ne', users: countryUserData['NE'] || 0, percentage: 0 },
    'ML': { name: 'Mali', flag: 'ml', users: countryUserData['ML'] || 0, percentage: 0 },
    'BF': { name: 'Burkina Faso', flag: 'bf', users: countryUserData['BF'] || 0, percentage: 0 },
    'CI': { name: 'Ivory Coast', flag: 'ci', users: countryUserData['CI'] || 0, percentage: 0 },
    'LR': { name: 'Liberia', flag: 'lr', users: countryUserData['LR'] || 0, percentage: 0 },
    'SL': { name: 'Sierra Leone', flag: 'sl', users: countryUserData['SL'] || 0, percentage: 0 },
    'GN': { name: 'Guinea', flag: 'gn', users: countryUserData['GN'] || 0, percentage: 0 },
    'GW': { name: 'Guinea-Bissau', flag: 'gw', users: countryUserData['GW'] || 0, percentage: 0 },
    'GM': { name: 'Gambia', flag: 'gm', users: countryUserData['GM'] || 0, percentage: 0 },
    'SN': { name: 'Senegal', flag: 'sn', users: countryUserData['SN'] || 0, percentage: 0 },
    'MR': { name: 'Mauritania', flag: 'mr', users: countryUserData['MR'] || 0, percentage: 0 },
    'CV': { name: 'Cape Verde', flag: 'cv', users: countryUserData['CV'] || 0, percentage: 0 },
    'ST': { name: 'São Tomé and Príncipe', flag: 'st', users: countryUserData['ST'] || 0, percentage: 0 },
    'GQ': { name: 'Equatorial Guinea', flag: 'gq', users: countryUserData['GQ'] || 0, percentage: 0 },
    'GA': { name: 'Gabon', flag: 'ga', users: countryUserData['GA'] || 0, percentage: 0 },
    'CG': { name: 'Republic of the Congo', flag: 'cg', users: countryUserData['CG'] || 0, percentage: 0 },
    'CD': { name: 'Democratic Republic of the Congo', flag: 'cd', users: countryUserData['CD'] || 0, percentage: 0 },
    'AO': { name: 'Angola', flag: 'ao', users: countryUserData['AO'] || 0, percentage: 0 },
    'CM': { name: 'Cameroon', flag: 'cm', users: countryUserData['CM'] || 0, percentage: 0 },
    'UA': { name: 'Ukraine', flag: 'ua', users: countryUserData['UA'] || 0, percentage: 0 },
    'TR': { name: 'Turkey', flag: 'tr', users: countryUserData['TR'] || 0, percentage: 0 },
    'KR': { name: 'South Korea', flag: 'kr', users: countryUserData['KR'] || 0, percentage: 0 },
    'TH': { name: 'Thailand', flag: 'th', users: countryUserData['TH'] || 0, percentage: 0 },
    'VN': { name: 'Vietnam', flag: 'vn', users: countryUserData['VN'] || 0, percentage: 0 },
    'MY': { name: 'Malaysia', flag: 'my', users: countryUserData['MY'] || 0, percentage: 0 },
    'SG': { name: 'Singapore', flag: 'sg', users: countryUserData['SG'] || 0, percentage: 0 },
    'ID': { name: 'Indonesia', flag: 'id', users: countryUserData['ID'] || 0, percentage: 0 },
    'PH': { name: 'Philippines', flag: 'ph', users: countryUserData['PH'] || 0, percentage: 0 },
    'BD': { name: 'Bangladesh', flag: 'bd', users: countryUserData['BD'] || 0, percentage: 0 },
    'PK': { name: 'Pakistan', flag: 'pk', users: countryUserData['PK'] || 0, percentage: 0 },
    'LK': { name: 'Sri Lanka', flag: 'lk', users: countryUserData['LK'] || 0, percentage: 0 },
    'NP': { name: 'Nepal', flag: 'np', users: countryUserData['NP'] || 0, percentage: 0 },
    'BT': { name: 'Bhutan', flag: 'bt', users: countryUserData['BT'] || 0, percentage: 0 },
    'MV': { name: 'Maldives', flag: 'mv', users: countryUserData['MV'] || 0, percentage: 0 },
    'AF': { name: 'Afghanistan', flag: 'af', users: countryUserData['AF'] || 0, percentage: 0 },
    'IR': { name: 'Iran', flag: 'ir', users: countryUserData['IR'] || 0, percentage: 0 },
    'IQ': { name: 'Iraq', flag: 'iq', users: countryUserData['IQ'] || 0, percentage: 0 },
    'SY': { name: 'Syria', flag: 'sy', users: countryUserData['SY'] || 0, percentage: 0 },
    'LB': { name: 'Lebanon', flag: 'lb', users: countryUserData['LB'] || 0, percentage: 0 },
    'JO': { name: 'Jordan', flag: 'jo', users: countryUserData['JO'] || 0, percentage: 0 },
    'IL': { name: 'Israel', flag: 'il', users: countryUserData['IL'] || 0, percentage: 0 },
    'PS': { name: 'Palestine', flag: 'ps', users: countryUserData['PS'] || 0, percentage: 0 },
    'SA': { name: 'Saudi Arabia', flag: 'sa', users: countryUserData['SA'] || 0, percentage: 0 },
    'AE': { name: 'United Arab Emirates', flag: 'ae', users: countryUserData['AE'] || 0, percentage: 0 },
    'QA': { name: 'Qatar', flag: 'qa', users: countryUserData['QA'] || 0, percentage: 0 },
    'BH': { name: 'Bahrain', flag: 'bh', users: countryUserData['BH'] || 0, percentage: 0 },
    'KW': { name: 'Kuwait', flag: 'kw', users: countryUserData['KW'] || 0, percentage: 0 },
    'OM': { name: 'Oman', flag: 'om', users: countryUserData['OM'] || 0, percentage: 0 },
    'YE': { name: 'Yemen', flag: 'ye', users: countryUserData['YE'] || 0, percentage: 0 },
    'KZ': { name: 'Kazakhstan', flag: 'kz', users: countryUserData['KZ'] || 0, percentage: 0 },
    'UZ': { name: 'Uzbekistan', flag: 'uz', users: countryUserData['UZ'] || 0, percentage: 0 },
    'TM': { name: 'Turkmenistan', flag: 'tm', users: countryUserData['TM'] || 0, percentage: 0 },
    'TJ': { name: 'Tajikistan', flag: 'tj', users: countryUserData['TJ'] || 0, percentage: 0 },
    'KG': { name: 'Kyrgyzstan', flag: 'kg', users: countryUserData['KG'] || 0, percentage: 0 },
    'MN': { name: 'Mongolia', flag: 'mn', users: countryUserData['MN'] || 0, percentage: 0 },
    'KP': { name: 'North Korea', flag: 'kp', users: countryUserData['KP'] || 0, percentage: 0 },
    'TW': { name: 'Taiwan', flag: 'tw', users: countryUserData['TW'] || 0, percentage: 0 },
    'HK': { name: 'Hong Kong', flag: 'hk', users: countryUserData['HK'] || 0, percentage: 0 },
    'MO': { name: 'Macau', flag: 'mo', users: countryUserData['MO'] || 0, percentage: 0 },
    'LA': { name: 'Laos', flag: 'la', users: countryUserData['LA'] || 0, percentage: 0 },
    'KH': { name: 'Cambodia', flag: 'kh', users: countryUserData['KH'] || 0, percentage: 0 },
    'MM': { name: 'Myanmar', flag: 'mm', users: countryUserData['MM'] || 0, percentage: 0 },
    'BN': { name: 'Brunei', flag: 'bn', users: countryUserData['BN'] || 0, percentage: 0 },
    'TL': { name: 'East Timor', flag: 'tl', users: countryUserData['TL'] || 0, percentage: 0 },
    'FJ': { name: 'Fiji', flag: 'fj', users: countryUserData['FJ'] || 0, percentage: 0 },
    'PG': { name: 'Papua New Guinea', flag: 'pg', users: countryUserData['PG'] || 0, percentage: 0 },
    'SB': { name: 'Solomon Islands', flag: 'sb', users: countryUserData['SB'] || 0, percentage: 0 },
    'VU': { name: 'Vanuatu', flag: 'vu', users: countryUserData['VU'] || 0, percentage: 0 },
    'NC': { name: 'New Caledonia', flag: 'nc', users: countryUserData['NC'] || 0, percentage: 0 },
    'PF': { name: 'French Polynesia', flag: 'pf', users: countryUserData['PF'] || 0, percentage: 0 },
    'WS': { name: 'Samoa', flag: 'ws', users: countryUserData['WS'] || 0, percentage: 0 },
    'TO': { name: 'Tonga', flag: 'to', users: countryUserData['TO'] || 0, percentage: 0 },
    'KI': { name: 'Kiribati', flag: 'ki', users: countryUserData['KI'] || 0, percentage: 0 },
    'TV': { name: 'Tuvalu', flag: 'tv', users: countryUserData['TV'] || 0, percentage: 0 },
    'NR': { name: 'Nauru', flag: 'nr', users: countryUserData['NR'] || 0, percentage: 0 },
    'PW': { name: 'Palau', flag: 'pw', users: countryUserData['PW'] || 0, percentage: 0 },
    'FM': { name: 'Micronesia', flag: 'fm', users: countryUserData['FM'] || 0, percentage: 0 },
    'MH': { name: 'Marshall Islands', flag: 'mh', users: countryUserData['MH'] || 0, percentage: 0 },
    'IS': { name: 'Iceland', flag: 'is', users: countryUserData['IS'] || 0, percentage: 0 },
    'LI': { name: 'Liechtenstein', flag: 'li', users: countryUserData['LI'] || 0, percentage: 0 },
    'MC': { name: 'Monaco', flag: 'mc', users: countryUserData['MC'] || 0, percentage: 0 },
    'SM': { name: 'San Marino', flag: 'sm', users: countryUserData['SM'] || 0, percentage: 0 },
    'VA': { name: 'Vatican City', flag: 'va', users: countryUserData['VA'] || 0, percentage: 0 },
    'AD': { name: 'Andorra', flag: 'ad', users: countryUserData['AD'] || 0, percentage: 0 },
    'BY': { name: 'Belarus', flag: 'by', users: countryUserData['BY'] || 0, percentage: 0 },
    'MD': { name: 'Moldova', flag: 'md', users: countryUserData['MD'] || 0, percentage: 0 },
    'AL': { name: 'Albania', flag: 'al', users: countryUserData['AL'] || 0, percentage: 0 },
    'BA': { name: 'Bosnia and Herzegovina', flag: 'ba', users: countryUserData['BA'] || 0, percentage: 0 },
    'ME': { name: 'Montenegro', flag: 'me', users: countryUserData['ME'] || 0, percentage: 0 },
    'MK': { name: 'North Macedonia', flag: 'mk', users: countryUserData['MK'] || 0, percentage: 0 },
    'RS': { name: 'Serbia', flag: 'rs', users: countryUserData['RS'] || 0, percentage: 0 },
    'XK': { name: 'Kosovo', flag: 'xk', users: countryUserData['XK'] || 0, percentage: 0 },
    'GE': { name: 'Georgia', flag: 'ge', users: countryUserData['GE'] || 0, percentage: 0 },
    'AM': { name: 'Armenia', flag: 'am', users: countryUserData['AM'] || 0, percentage: 0 },
    'AZ': { name: 'Azerbaijan', flag: 'az', users: countryUserData['AZ'] || 0, percentage: 0 },
    'GL': { name: 'Greenland', flag: 'gl', users: countryUserData['GL'] || 0, percentage: 0 },
    'CU': { name: 'Cuba', flag: 'cu', users: countryUserData['CU'] || 0, percentage: 0 },
    'JM': { name: 'Jamaica', flag: 'jm', users: countryUserData['JM'] || 0, percentage: 0 },
    'HT': { name: 'Haiti', flag: 'ht', users: countryUserData['HT'] || 0, percentage: 0 },
    'DO': { name: 'Dominican Republic', flag: 'do', users: countryUserData['DO'] || 0, percentage: 0 },
    'BS': { name: 'Bahamas', flag: 'bs', users: countryUserData['BS'] || 0, percentage: 0 },
    'BB': { name: 'Barbados', flag: 'bb', users: countryUserData['BB'] || 0, percentage: 0 },
    'AG': { name: 'Antigua and Barbuda', flag: 'ag', users: countryUserData['AG'] || 0, percentage: 0 },
    'DM': { name: 'Dominica', flag: 'dm', users: countryUserData['DM'] || 0, percentage: 0 },
    'GD': { name: 'Grenada', flag: 'gd', users: countryUserData['GD'] || 0, percentage: 0 },
    'KN': { name: 'Saint Kitts and Nevis', flag: 'kn', users: countryUserData['KN'] || 0, percentage: 0 },
    'LC': { name: 'Saint Lucia', flag: 'lc', users: countryUserData['LC'] || 0, percentage: 0 },
    'VC': { name: 'Saint Vincent and the Grenadines', flag: 'vc', users: countryUserData['VC'] || 0, percentage: 0 },
    'TT': { name: 'Trinidad and Tobago', flag: 'tt', users: countryUserData['TT'] || 0, percentage: 0 },
    'BZ': { name: 'Belize', flag: 'bz', users: countryUserData['BZ'] || 0, percentage: 0 },
    'GT': { name: 'Guatemala', flag: 'gt', users: countryUserData['GT'] || 0, percentage: 0 },
    'HN': { name: 'Honduras', flag: 'hn', users: countryUserData['HN'] || 0, percentage: 0 },
    'NI': { name: 'Nicaragua', flag: 'ni', users: countryUserData['NI'] || 0, percentage: 0 },
    'CR': { name: 'Costa Rica', flag: 'cr', users: countryUserData['CR'] || 0, percentage: 0 },
    'PA': { name: 'Panama', flag: 'pa', users: countryUserData['PA'] || 0, percentage: 0 },
    'GF': { name: 'French Guiana', flag: 'gf', users: countryUserData['GF'] || 0, percentage: 0 },
    'FK': { name: 'Falkland Islands', flag: 'fk', users: countryUserData['FK'] || 0, percentage: 0 },
    'GS': { name: 'South Georgia and the South Sandwich Islands', flag: 'gs', users: countryUserData['GS'] || 0, percentage: 0 },
    'BV': { name: 'Bouvet Island', flag: 'bv', users: countryUserData['BV'] || 0, percentage: 0 },
    'SH': { name: 'Saint Helena', flag: 'sh', users: countryUserData['SH'] || 0, percentage: 0 },
    'AC': { name: 'Ascension Island', flag: 'ac', users: countryUserData['AC'] || 0, percentage: 0 },
    'TA': { name: 'Tristan da Cunha', flag: 'ta', users: countryUserData['TA'] || 0, percentage: 0 },
    'AI': { name: 'Anguilla', flag: 'ai', users: countryUserData['AI'] || 0, percentage: 0 },
    'AW': { name: 'Aruba', flag: 'aw', users: countryUserData['AW'] || 0, percentage: 0 },
    'BM': { name: 'Bermuda', flag: 'bm', users: countryUserData['BM'] || 0, percentage: 0 },
    'BQ': { name: 'Caribbean Netherlands', flag: 'bq', users: countryUserData['BQ'] || 0, percentage: 0 },
    'VG': { name: 'British Virgin Islands', flag: 'vg', users: countryUserData['VG'] || 0, percentage: 0 },
    'KY': { name: 'Cayman Islands', flag: 'ky', users: countryUserData['KY'] || 0, percentage: 0 },
    'CW': { name: 'Curaçao', flag: 'cw', users: countryUserData['CW'] || 0, percentage: 0 },
    'SX': { name: 'Sint Maarten', flag: 'sx', users: countryUserData['SX'] || 0, percentage: 0 },
    'TC': { name: 'Turks and Caicos Islands', flag: 'tc', users: countryUserData['TC'] || 0, percentage: 0 },
    'VI': { name: 'United States Virgin Islands', flag: 'vi', users: countryUserData['VI'] || 0, percentage: 0 },
    'PR': { name: 'Puerto Rico', flag: 'pr', users: countryUserData['PR'] || 0, percentage: 0 },
    'GP': { name: 'Guadeloupe', flag: 'gp', users: countryUserData['GP'] || 0, percentage: 0 },
    'MQ': { name: 'Martinique', flag: 'mq', users: countryUserData['MQ'] || 0, percentage: 0 },
    'BL': { name: 'Saint Barthélemy', flag: 'bl', users: countryUserData['BL'] || 0, percentage: 0 },
    'MF': { name: 'Saint Martin', flag: 'mf', users: countryUserData['MF'] || 0, percentage: 0 },
    'SJ': { name: 'Svalbard and Jan Mayen', flag: 'sj', users: countryUserData['SJ'] || 0, percentage: 0 },
    'FO': { name: 'Faroe Islands', flag: 'fo', users: countryUserData['FO'] || 0, percentage: 0 },
    'AX': { name: 'Åland Islands', flag: 'ax', users: countryUserData['AX'] || 0, percentage: 0 },
    'GI': { name: 'Gibraltar', flag: 'gi', users: countryUserData['GI'] || 0, percentage: 0 },
    'JE': { name: 'Jersey', flag: 'je', users: countryUserData['JE'] || 0, percentage: 0 },
    'GG': { name: 'Guernsey', flag: 'gg', users: countryUserData['GG'] || 0, percentage: 0 },
    'IM': { name: 'Isle of Man', flag: 'im', users: countryUserData['IM'] || 0, percentage: 0 },
    'AQ': { name: 'Antarctica', flag: 'aq', users: countryUserData['AQ'] || 0, percentage: 0 },
    'TF': { name: 'French Southern Territories', flag: 'tf', users: countryUserData['TF'] || 0, percentage: 0 },
    'HM': { name: 'Heard Island and McDonald Islands', flag: 'hm', users: countryUserData['HM'] || 0, percentage: 0 },
    'CC': { name: 'Cocos Islands', flag: 'cc', users: countryUserData['CC'] || 0, percentage: 0 },
    'CX': { name: 'Christmas Island', flag: 'cx', users: countryUserData['CX'] || 0, percentage: 0 },
    'NF': { name: 'Norfolk Island', flag: 'nf', users: countryUserData['NF'] || 0, percentage: 0 },
    'PN': { name: 'Pitcairn Islands', flag: 'pn', users: countryUserData['PN'] || 0, percentage: 0 },
    'TK': { name: 'Tokelau', flag: 'tk', users: countryUserData['TK'] || 0, percentage: 0 },
    'WF': { name: 'Wallis and Futuna', flag: 'wf', users: countryUserData['WF'] || 0, percentage: 0 },
    'AS': { name: 'American Samoa', flag: 'as', users: countryUserData['AS'] || 0, percentage: 0 },
    'GU': { name: 'Guam', flag: 'gu', users: countryUserData['GU'] || 0, percentage: 0 },
    'MP': { name: 'Northern Mariana Islands', flag: 'mp', users: countryUserData['MP'] || 0, percentage: 0 },
    'UM': { name: 'United States Minor Outlying Islands', flag: 'um', users: countryUserData['UM'] || 0, percentage: 0 },
    'EH': { name: 'Western Sahara', flag: 'eh', users: countryUserData['EH'] || 0, percentage: 0 },
    'IO': { name: 'British Indian Ocean Territory', flag: 'io', users: countryUserData['IO'] || 0, percentage: 0 },
  };

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
        // Show tooltip for all countries
        const specificData = countryData[code as keyof typeof countryData];
        const data = specificData || {
          name: code.toUpperCase(), // Use country code for unknown countries
          flag: code.toLowerCase(),
          users: 0,
          percentage: 0
        };
        
        tip.html(`<div style="padding: 8px; background: #465FFF; color: white; border-radius: 4px; font-family: Outfit, sans-serif; display: flex; align-items: center; gap: 8px;">
          <span class="fi fi-${data.flag.toLowerCase()}" style="font-size: 16px;"></span>
          <div>
            <strong>${data.name}</strong><br/>
            ${data.users > 0 ? data.users : '0'}
          </div>
        </div>`);
      }}
      onRegionOver={(event: any, code: string) => {
        // Highlight countries with users on hover
        const data = countryData[code as keyof typeof countryData];
        if (data && data.users > 0) {
          event.target.style.fill = "#10B981";
          event.target.style.fillOpacity = "1";
        }
      }}
      onRegionOut={(event: any, code: string) => {
        // Reset color when mouse leaves
        const data = countryData[code as keyof typeof countryData];
        if (data && data.users > 0) {
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
