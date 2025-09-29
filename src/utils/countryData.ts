import { supabase } from '../hooks/useSupabaseAuth';

export interface CountryUserData {
  country: string;
  userCount: number;
}

export interface RegionData {
  name: string;
  countries: string[];
  users: number;
}

// World regions mapping based on Our World in Data
export const worldRegions = {
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

// Fetch country user data from Supabase
export async function fetchCountryUserData(): Promise<CountryUserData[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('country')
      .not('country', 'is', null);

    if (error) {
      console.error('Error fetching country data:', error);
      return [];
    }

    // Count users per country
    const countryCounts = data.reduce((acc, profile) => {
      const country = profile.country?.toUpperCase();
      if (country) {
        acc[country] = (acc[country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Convert to array format
    return Object.entries(countryCounts).map(([country, userCount]) => ({
      country,
      userCount
    }));
  } catch (error) {
    console.error('Error fetching country data:', error);
    return [];
  }
}

// Calculate region totals from country data
export function calculateRegionTotals(countryData: CountryUserData[]): Record<string, RegionData> {
  const totals: Record<string, RegionData> = {};
  
  // Initialize totals with proper structure
  Object.entries(worldRegions).forEach(([regionName, regionData]) => {
    totals[regionName] = {
      name: regionName,
      countries: regionData.countries,
      users: 0
    };
  });

  // Count users per region
  countryData.forEach(({ country, userCount }) => {
    Object.entries(totals).forEach(([, regionData]) => {
      if (regionData.countries.includes(country)) {
        regionData.users += userCount;
      }
    });
  });

  return totals;
}

// Get countries with users for map highlighting
export function getCountriesWithUsers(countryData: CountryUserData[]): string[] {
  return countryData
    .filter(({ userCount }) => userCount > 0)
    .map(({ country }) => country);
}
