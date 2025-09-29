import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useState, useEffect } from "react";

export default function UserMetaCard() {
  const { user, supabase } = useSupabaseAuth();
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    bio: "",
    avatar: "user1",
    country: ""
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
  const loadUserProfile = async () => {
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
            country: data.country || ""
          });
        } else {
          // Use default values if no profile exists
          setUserProfile({
            username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
            email: user.email || "",
            bio: "IMG User",
            avatar: "user1",
            country: ""
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
          country: ""
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, [user, supabase]);

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
  }, [user, supabase]);

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
              <a
                href="https://www.facebook.com/PimjoHQ"
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
                    d="M11.6666 11.2503H13.7499L14.5833 7.91699H11.6666V6.25033C11.6666 5.39251 11.6666 4.58366 13.3333 4.58366H14.5833V1.78374C14.3118 1.7477 13.2858 1.66699 12.2023 1.66699C9.94025 1.66699 8.33325 3.04771 8.33325 5.58342V7.91699H5.83325V11.2503H8.33325V18.3337H11.6666V11.2503Z"
                    fill=""
                  />
                </svg>
              </a>

              <a
                href="https://x.com/PimjoHQ"
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

              <a
                href="https://www.linkedin.com/company/pimjo"
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
                    d="M5.78381 4.16645C5.78351 4.84504 5.37181 5.45569 4.74286 5.71045C4.11391 5.96521 3.39331 5.81321 2.92083 5.32613C2.44836 4.83904 2.31837 4.11413 2.59216 3.49323C2.86596 2.87233 3.48886 2.47942 4.16715 2.49978C5.06804 2.52682 5.78422 3.26515 5.78381 4.16645ZM5.83381 7.06645H2.50048V17.4998H5.83381V7.06645ZM11.1005 7.06645H7.78381V17.4998H11.0672V12.0248C11.0672 8.97475 15.0422 8.69142 15.0422 12.0248V17.4998H18.3338V10.8914C18.3338 5.74978 12.4505 5.94145 11.0672 8.46642L11.1005 7.06645Z"
                    fill=""
                  />
                </svg>
              </a>

              <a
                href="https://instagram.com/PimjoHQ"
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
                    d="M10.8567 1.66699C11.7946 1.66854 12.2698 1.67351 12.6805 1.68573L12.8422 1.69102C13.0291 1.69766 13.2134 1.70599 13.4357 1.71641C14.3224 1.75738 14.9273 1.89766 15.4586 2.10391C16.0078 2.31572 16.4717 2.60183 16.9349 3.06503C17.3974 3.52822 17.6836 3.99349 17.8961 4.54141C18.1016 5.07197 18.2419 5.67753 18.2836 6.56433C18.2935 6.78655 18.3015 6.97088 18.3081 7.15775L18.3133 7.31949C18.3255 7.73011 18.3311 8.20543 18.3328 9.1433L18.3335 9.76463C18.3336 9.84055 18.3336 9.91888 18.3336 9.99972L18.3335 10.2348L18.333 10.8562C18.3314 11.794 18.3265 12.2694 18.3142 12.68L18.3089 12.8417C18.3023 13.0286 18.294 13.213 18.2836 13.4351C18.2426 14.322 18.1016 14.9268 17.8961 15.458C17.6842 16.0074 17.3974 16.4713 16.9349 16.9345C16.4717 17.397 16.0057 17.6831 15.4586 17.8955C14.9273 18.1011 14.3224 18.2414 13.4357 18.2831C13.2134 18.293 13.0291 18.3011 12.8422 18.3076L12.6805 18.3128C12.2698 18.3251 11.7946 18.3306 10.8567 18.3324L10.2353 18.333C10.1594 18.333 10.0811 18.333 10.0002 18.333H9.76516L9.14375 18.3325C8.20591 18.331 7.7306 18.326 7.31997 18.3137L7.15824 18.3085C6.97136 18.3018 6.78703 18.2935 6.56481 18.2831C5.67801 18.2421 5.07384 18.1011 4.5419 17.8955C3.99328 17.6838 3.5287 17.397 3.06551 16.9345C2.60231 16.4713 2.3169 16.0053 2.1044 15.458C1.89815 14.9268 1.75856 14.322 1.7169 13.4351C1.707 13.213 1.69892 13.0286 1.69238 12.8417L1.68714 12.68C1.67495 12.2694 1.66939 11.794 1.66759 10.8562L1.66748 9.1433C1.66903 8.20543 1.67399 7.73011 1.68621 7.31949L1.69151 7.15775C1.69815 6.97088 1.70648 6.78655 1.7169 6.56433C1.75786 5.67683 1.89815 5.07266 2.1044 4.54141C2.3162 3.9928 2.60231 3.52822 3.06551 3.06503C3.5287 2.60183 3.99398 2.31641 4.5419 2.10391C5.07315 1.89766 5.67731 1.75808 6.56481 1.71641C6.78703 1.70652 6.97136 1.69844 7.15824 1.6919L7.31997 1.68666C7.7306 1.67446 8.20591 1.6689 9.14375 1.6671L10.8567 1.66699ZM10.0002 5.83308C7.69781 5.83308 5.83356 7.69935 5.83356 9.99972C5.83356 12.3021 7.69984 14.1664 10.0002 14.1664C12.3027 14.1664 14.1669 12.3001 14.1669 9.99972C14.1669 7.69732 12.3006 5.83308 10.0002 5.83308ZM10.0002 7.49974C11.381 7.49974 12.5002 8.61863 12.5002 9.99972C12.5002 11.3805 11.3813 12.4997 10.0002 12.4997C8.6195 12.4997 7.50023 11.3809 7.50023 9.99972C7.50023 8.61897 8.61908 7.49974 10.0002 7.49974ZM14.3752 4.58308C13.8008 4.58308 13.3336 5.04967 13.3336 5.62403C13.3336 6.19841 13.8002 6.66572 14.3752 6.66572C14.9496 6.66572 15.4169 6.19913 15.4169 5.62403C15.4169 5.04967 14.9488 4.58236 14.3752 4.58308Z"
                    fill=""
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
