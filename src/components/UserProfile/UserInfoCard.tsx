import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useState, useEffect } from "react";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user, supabase } = useSupabaseAuth();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    avatar: "",
    xHandle: "",
    googleEmail: ""
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Avatar options
  const avatarOptions = [
    { id: "user1", name: "User 1", image: "/images/user/user1.webp" },
    { id: "user2", name: "User 2", image: "/images/user/user2.webp" },
    { id: "user3", name: "User 3", image: "/images/user/user3.webp" },
    { id: "user4", name: "User 4", image: "/images/user/user4.webp" }
  ];

  // Country options with ISO codes
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
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          setLoading(true);
          console.log('Loading profile for user:', user.id);
          
          // Try to load profile data
          const { data, error } = await supabase
            .from('profiles')
            .select('username, avatar_name, country')
            .eq('id', user.id)
            .single();
          
          console.log('Profile query result:', { data, error });
          
          if (data && !error) {
            // Profile exists, load the data
            setUserProfile({
              username: data.username || user.user_metadata?.full_name || user.email?.split('@')[0] || "",
              email: user.email || "",
              avatar: data.avatar_name || "user1",
              xHandle: "",
              googleEmail: ""
            });
            setUserCountry(data.country || "");
            setSelectedCountry(data.country || "");
            console.log('Profile loaded successfully:', data);
          } else if (error && error.code === 'PGRST116') {
            // No profile found, create one
            console.log('No profile found, creating new profile...');
            const { data: insertData, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
                avatar_name: "user1",
                country: ""
              })
              .select()
              .single();
            
            if (insertError) {
              console.error('Error creating profile:', insertError);
              // Use default values on error
              setUserProfile({
                username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
                email: user.email || "",
                avatar: "user1",
                xHandle: "",
                googleEmail: ""
              });
              setUserCountry("");
              setSelectedCountry("");
            } else {
              console.log('Profile created successfully:', insertData);
              setUserProfile({
                username: insertData.username || user.user_metadata?.full_name || user.email?.split('@')[0] || "",
                email: user.email || "",
                avatar: insertData.avatar_name || "user1",
                xHandle: "",
                googleEmail: ""
              });
              setUserCountry(insertData.country || "");
              setSelectedCountry(insertData.country || "");
            }
          } else {
            console.error('Error loading profile:', error);
            // Use default values on error
            setUserProfile({
              username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
              email: user.email || "",
              avatar: "user1",
              xHandle: "",
              googleEmail: ""
            });
            setUserCountry("");
            setSelectedCountry("");
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          // Use default values on error
          setUserProfile({
            username: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
            email: user.email || "",
            avatar: "user1",
            xHandle: "",
            googleEmail: ""
          });
          setUserCountry("");
          setSelectedCountry("");
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadUserProfile();
  }, [user, supabase]);

  const handleSave = async () => {
    if (!user) {
      alert('No user logged in');
      return;
    }

    try {
      console.log('Updating profile for user:', user.id);
      console.log('Selected country:', selectedCountry);
      console.log('Profile data:', userProfile);
      
      // Update local state immediately (optimistic update)
      setUserCountry(selectedCountry);
      setUserProfile(prev => ({
        ...prev,
        username: userProfile.username,
        avatar: userProfile.avatar
      }));
      
      // Trigger profile update event for other components
      window.dispatchEvent(new CustomEvent('profileUpdated'));
      
      // Close modal
    closeModal();
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Profile updated successfully!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 3000);
      
      // Try to update Supabase in the background (don't block UI)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({ 
            username: userProfile.username,
            avatar_name: userProfile.avatar,
            country: selectedCountry
          })
          .eq('id', user.id)
          .select();
        
        if (error) {
          console.warn('Supabase update failed, but local state updated:', error);
          // Don't show error to user since local state is already updated
        } else {
          console.log('Profile synced to Supabase successfully:', data[0]);
        }
      } catch (supabaseError) {
        console.warn('Supabase sync failed, but local state updated:', supabaseError);
        // Don't show error to user since local state is already updated
      }
      
    } catch (error) {
      console.error('JavaScript error:', error);
      setNotification({
        type: 'error',
        message: `Error updating profile: ${error instanceof Error ? error.message : String(error)}`
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 5000);
    }
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          {/* Notification Display */}
          {notification.type && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              notification.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
            }`}>
              {notification.message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Username
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {loading ? "Loading..." : userProfile.username || "Not set"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {loading ? "Loading..." : userProfile.email || "Not set"}
              </p>
            </div>


            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Country
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userCountry ? countries.find(c => c.code === userCountry)?.name || userCountry : "Not set"}
              </p>
            </div>


            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Login Method
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {loading ? "Loading..." : (() => {
                  if (user?.app_metadata?.provider === 'google') return 'Google';
                  if (user?.app_metadata?.provider === 'twitter') return 'X (Twitter)';
                  if (user?.app_metadata?.provider === 'email') return 'Email';
                  return 'Email'; // Default fallback
                })()}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      value="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" value="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      value="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input type="text" value="https://instagram.com/PimjoHQ" />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Username</Label>
                    <Input 
                      type="text" 
                      value={userProfile.username}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Email Address</Label>
                    <Input 
                      type="text" 
                      value={userProfile.email}
                      disabled
                      className="bg-gray-100 dark:bg-gray-700"
                    />
                  </div>


                  <div className="col-span-2">
                    <Label>Avatar</Label>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                      {avatarOptions.map((avatar) => (
                        <div
                          key={avatar.id}
                          className={`cursor-pointer border-2 rounded-lg p-2 transition-all ${
                            userProfile.avatar === avatar.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => setUserProfile(prev => ({ ...prev, avatar: avatar.id }))}
                        >
                          <img
                            src={avatar.image}
                            alt={avatar.name}
                            className="w-full h-16 object-cover rounded"
                          />
                          <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">
                            {avatar.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <Label>Country</Label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
