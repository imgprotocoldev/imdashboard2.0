import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useState, useEffect, useCallback } from "react";

export default function UserMetaCard() {
  const { user, supabase } = useSupabaseAuth();
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    bio: "",
    avatar: "user1",
    country: "",
    xHandle: ""
  });
  const [loading, setLoading] = useState(true);

  // Avatar options
  const avatarOptions = [
    { id: "user1", name: "User 1", image: "/images/user/user1.webp" },
    { id: "user2", name: "User 2", image: "/images/user/user2.webp" },
    { id: "user3", name: "User 3", image: "/images/user/user3.webp" },
    { id: "user4", name: "User 4", image: "/images/user/user4.webp" }
  ];

  // Country options
  const countries = [
    { code: "us", name: "United States" },
    { code: "ca", name: "Canada" },
    { code: "mx", name: "Mexico" },
    { code: "gb", name: "United Kingdom" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
    { code: "it", name: "Italy" },
    { code: "es", name: "Spain" },
    { code: "nl", name: "Netherlands" },
    { code: "be", name: "Belgium" },
    { code: "ch", name: "Switzerland" },
    { code: "at", name: "Austria" },
    { code: "dk", name: "Denmark" },
    { code: "no", name: "Norway" },
    { code: "fi", name: "Finland" },
    { code: "se", name: "Sweden" },
    { code: "pl", name: "Poland" },
    { code: "cz", name: "Czech Republic" },
    { code: "hu", name: "Hungary" },
    { code: "ro", name: "Romania" },
    { code: "bg", name: "Bulgaria" },
    { code: "gr", name: "Greece" },
    { code: "pt", name: "Portugal" },
    { code: "ie", name: "Ireland" },
    { code: "lu", name: "Luxembourg" },
    { code: "mt", name: "Malta" },
    { code: "cy", name: "Cyprus" },
    { code: "ee", name: "Estonia" },
    { code: "lv", name: "Latvia" },
    { code: "lt", name: "Lithuania" },
    { code: "si", name: "Slovenia" },
    { code: "sk", name: "Slovakia" },
    { code: "hr", name: "Croatia" },
    { code: "br", name: "Brazil" },
    { code: "ar", name: "Argentina" },
    { code: "cl", name: "Chile" },
    { code: "co", name: "Colombia" },
    { code: "pe", name: "Peru" },
    { code: "ve", name: "Venezuela" },
    { code: "uy", name: "Uruguay" },
    { code: "py", name: "Paraguay" },
    { code: "bo", name: "Bolivia" },
    { code: "ec", name: "Ecuador" },
    { code: "za", name: "South Africa" },
    { code: "ng", name: "Nigeria" },
    { code: "eg", name: "Egypt" },
    { code: "ke", name: "Kenya" },
    { code: "gh", name: "Ghana" },
    { code: "ma", name: "Morocco" },
    { code: "tn", name: "Tunisia" },
    { code: "dz", name: "Algeria" },
    { code: "ly", name: "Libya" },
    { code: "sd", name: "Sudan" },
    { code: "et", name: "Ethiopia" },
    { code: "ug", name: "Uganda" },
    { code: "tz", name: "Tanzania" },
    { code: "zw", name: "Zimbabwe" },
    { code: "bw", name: "Botswana" },
    { code: "na", name: "Namibia" },
    { code: "zm", name: "Zambia" },
    { code: "mw", name: "Malawi" },
    { code: "mz", name: "Mozambique" },
    { code: "mg", name: "Madagascar" },
    { code: "mu", name: "Mauritius" },
    { code: "sc", name: "Seychelles" },
    { code: "km", name: "Comoros" },
    { code: "dj", name: "Djibouti" },
    { code: "so", name: "Somalia" },
    { code: "er", name: "Eritrea" },
    { code: "ss", name: "South Sudan" },
    { code: "cf", name: "Central African Republic" },
    { code: "td", name: "Chad" },
    { code: "ne", name: "Niger" },
    { code: "ml", name: "Mali" },
    { code: "bf", name: "Burkina Faso" },
    { code: "ci", name: "Ivory Coast" },
    { code: "lr", name: "Liberia" },
    { code: "sl", name: "Sierra Leone" },
    { code: "gn", name: "Guinea" },
    { code: "gw", name: "Guinea-Bissau" },
    { code: "gm", name: "Gambia" },
    { code: "sn", name: "Senegal" },
    { code: "mr", name: "Mauritania" },
    { code: "cv", name: "Cape Verde" },
    { code: "st", name: "São Tomé and Príncipe" },
    { code: "gq", name: "Equatorial Guinea" },
    { code: "ga", name: "Gabon" },
    { code: "cg", name: "Republic of the Congo" },
    { code: "cd", name: "Democratic Republic of the Congo" },
    { code: "ao", name: "Angola" },
    { code: "cm", name: "Cameroon" },
    { code: "cn", name: "China" },
    { code: "jp", name: "Japan" },
    { code: "kr", name: "South Korea" },
    { code: "th", name: "Thailand" },
    { code: "vn", name: "Vietnam" },
    { code: "my", name: "Malaysia" },
    { code: "sg", name: "Singapore" },
    { code: "id", name: "Indonesia" },
    { code: "ph", name: "Philippines" },
    { code: "bd", name: "Bangladesh" },
    { code: "pk", name: "Pakistan" },
    { code: "lk", name: "Sri Lanka" },
    { code: "np", name: "Nepal" },
    { code: "bt", name: "Bhutan" },
    { code: "mv", name: "Maldives" },
    { code: "af", name: "Afghanistan" },
    { code: "ir", name: "Iran" },
    { code: "iq", name: "Iraq" },
    { code: "sy", name: "Syria" },
    { code: "lb", name: "Lebanon" },
    { code: "jo", name: "Jordan" },
    { code: "il", name: "Israel" },
    { code: "ps", name: "Palestine" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "ae", name: "United Arab Emirates" },
    { code: "qa", name: "Qatar" },
    { code: "bh", name: "Bahrain" },
    { code: "kw", name: "Kuwait" },
    { code: "om", name: "Oman" },
    { code: "ye", name: "Yemen" },
    { code: "kz", name: "Kazakhstan" },
    { code: "uz", name: "Uzbekistan" },
    { code: "tm", name: "Turkmenistan" },
    { code: "tj", name: "Tajikistan" },
    { code: "kg", name: "Kyrgyzstan" },
    { code: "mn", name: "Mongolia" },
    { code: "kp", name: "North Korea" },
    { code: "tw", name: "Taiwan" },
    { code: "hk", name: "Hong Kong" },
    { code: "mo", name: "Macau" },
    { code: "la", name: "Laos" },
    { code: "kh", name: "Cambodia" },
    { code: "mm", name: "Myanmar" },
    { code: "bn", name: "Brunei" },
    { code: "tl", name: "East Timor" },
    { code: "au", name: "Australia" },
    { code: "nz", name: "New Zealand" },
    { code: "fj", name: "Fiji" },
    { code: "pg", name: "Papua New Guinea" },
    { code: "sb", name: "Solomon Islands" },
    { code: "vu", name: "Vanuatu" },
    { code: "nc", name: "New Caledonia" },
    { code: "pf", name: "French Polynesia" },
    { code: "ws", name: "Samoa" },
    { code: "to", name: "Tonga" },
    { code: "ki", name: "Kiribati" },
    { code: "tv", name: "Tuvalu" },
    { code: "nr", name: "Nauru" },
    { code: "pw", name: "Palau" },
    { code: "fm", name: "Micronesia" },
    { code: "mh", name: "Marshall Islands" },
    { code: "ru", name: "Russia" },
    { code: "ua", name: "Ukraine" },
    { code: "tr", name: "Turkey" },
    { code: "is", name: "Iceland" },
    { code: "li", name: "Liechtenstein" },
    { code: "mc", name: "Monaco" },
    { code: "sm", name: "San Marino" },
    { code: "va", name: "Vatican City" },
    { code: "ad", name: "Andorra" },
    { code: "by", name: "Belarus" },
    { code: "md", name: "Moldova" },
    { code: "al", name: "Albania" },
    { code: "ba", name: "Bosnia and Herzegovina" },
    { code: "me", name: "Montenegro" },
    { code: "mk", name: "North Macedonia" },
    { code: "rs", name: "Serbia" },
    { code: "xk", name: "Kosovo" },
    { code: "ge", name: "Georgia" },
    { code: "am", name: "Armenia" },
    { code: "az", name: "Azerbaijan" },
    { code: "gl", name: "Greenland" },
    { code: "cu", name: "Cuba" },
    { code: "jm", name: "Jamaica" },
    { code: "ht", name: "Haiti" },
    { code: "do", name: "Dominican Republic" },
    { code: "bs", name: "Bahamas" },
    { code: "bb", name: "Barbados" },
    { code: "ag", name: "Antigua and Barbuda" },
    { code: "dm", name: "Dominica" },
    { code: "gd", name: "Grenada" },
    { code: "kn", name: "Saint Kitts and Nevis" },
    { code: "lc", name: "Saint Lucia" },
    { code: "vc", name: "Saint Vincent and the Grenadines" },
    { code: "tt", name: "Trinidad and Tobago" },
    { code: "bz", name: "Belize" },
    { code: "gt", name: "Guatemala" },
    { code: "hn", name: "Honduras" },
    { code: "ni", name: "Nicaragua" },
    { code: "cr", name: "Costa Rica" },
    { code: "pa", name: "Panama" },
    { code: "gf", name: "French Guiana" },
    { code: "fk", name: "Falkland Islands" },
  ];

  // Load user's profile data
  const loadUserProfile = useCallback(async () => {
    if (user) {
      try {
        setLoading(true);
        
        // Try to load profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data && !error) {
          setUserProfile({
            username: data.username || user.user_metadata?.full_name || user.email?.split('@')[0] || "",
            email: user.email || "",
            bio: data.bio || "IMG User",
            avatar: data.avatar_name || "user1",
            country: data.country || "",
            xHandle: data.x_handle || ""
          });
        } else {
          // Use default values if no profile exists
          setUserProfile({
            username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
            email: user.email || "",
            bio: "IMG User",
            avatar: "user1",
            country: "",
            xHandle: ""
          });
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Use default values on error
        setUserProfile({
          username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
          email: user.email || "",
          bio: "IMG User",
          avatar: "user1",
          country: "",
          xHandle: ""
        });
      } finally {
        setLoading(false);
      }
    }
  }, [user, supabase]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // Add a refresh mechanism that can be triggered
  useEffect(() => {
    const handleProfileUpdate = () => {
      loadUserProfile();
    };

    // Listen for custom events
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [user, supabase, loadUserProfile]);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img 
                src={loading ? "/images/user/user1.webp" : avatarOptions.find(a => a.id === userProfile.avatar)?.image || "/images/user/user1.webp"} 
                alt="user" 
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {loading ? "Loading..." : userProfile.username || "IMG User"}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {loading ? "Loading..." : userProfile.bio || "IMG User"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {loading ? "Loading..." : (userProfile.country ? countries.find(c => c.code === userProfile.country)?.name || userProfile.country : "Not set")}
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {userProfile.xHandle && (
                <a
                  href={`https://x.com/${userProfile.xHandle}`}
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1708 1.875H17.9274L11.9049 8.75833L18.9899 18.125H13.4424L9.09742 12.4442L4.12578 18.125H1.36745L7.80912 10.7625L1.01245 1.875H6.70078L10.6283 7.0675L15.1708 1.875ZM14.2033 16.475H15.7308L5.87078 3.43833H4.23162L14.2033 16.475Z"
                    fill=""
                  />
                </svg>
              </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
