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
    'US': { name: 'USA', flag: 'us', users: 1, percentage: 0.06 },
    'FR': { name: 'France', flag: 'fr', users: 0, percentage: 0 },
    'GB': { name: 'United Kingdom', flag: 'gb', users: 0, percentage: 0 },
    'IN': { name: 'India', flag: 'in', users: 0, percentage: 0 },
    'SE': { name: 'Sweden', flag: 'se', users: 0, percentage: 0 },
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
          name: code.toUpperCase(), // Use country code as name
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
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 4, // Custom radius for markers
        } as any, // Type assertion to bypass strict CSS property checks
      }}
      markersSelectable={true}
      markers={[
        {
          latLng: [37.2580397, -104.657039],
          name: "United States",
          style: {
            fill: "#465FFF",
            borderWidth: 1,
            borderColor: "white",
            stroke: "#383f47",
          },
        },
        {
          latLng: [20.7504374, 73.7276105],
          name: "India",
          style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
        },
        {
          latLng: [53.613, -11.6368],
          name: "United Kingdom",
          style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
        },
        {
          latLng: [-25.0304388, 115.2092761],
          name: "Sweden",
          style: {
            fill: "#465FFF",
            borderWidth: 1,
            borderColor: "white",
            strokeOpacity: 0,
          },
        },
      ]}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      onRegionTipShow={(event: any, tip: any, code: string) => {
        // Show tooltip for all countries
        const specificData = countryData[code as keyof typeof countryData];
        const data = specificData || {
          name: code.toUpperCase(),
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
