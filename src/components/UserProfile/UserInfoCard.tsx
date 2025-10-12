import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useState, useEffect, useRef } from "react";
import { XHandleManager } from "../../utils/xHandleManager";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user, supabase } = useSupabaseAuth();
  const contentRef = useRef<HTMLDivElement>(null);
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
  const [isDeleteArmed, setIsDeleteArmed] = useState(false);

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
          
          // Process X login and store handle if needed
          await XHandleManager.processXLogin(user);
          
          // Try to load profile data
          const { data, error } = await supabase
            .from('profiles')
            .select('username, avatar_name, country, x_handle')
            .eq('id', user.id)
            .single();
          
          console.log('Profile query result:', { data, error });
          
          if (data && !error) {
            // Profile exists, load the data
            setUserProfile({
              username: data.username || user.user_metadata?.full_name || user.email?.split('@')[0] || "",
              email: user.email || "",
              avatar: data.avatar_name || "user1",
              xHandle: data.x_handle || "",
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
                country: "",
                x_handle: null
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
                xHandle: insertData.x_handle || "",
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

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Handle X connection after OAuth redirect
  useEffect(() => {
    const handleXConnection = async () => {
      if (!user) return;
      
      // Check if this is a fresh X login (not already processed)
      const isXLogin = user.app_metadata?.provider === 'twitter' || user.user_metadata?.provider === 'twitter';
      
      if (isXLogin && userProfile.xHandle === "") {
        // User just connected X, update their existing profile
        const success = await XHandleManager.connectXToExistingProfile(user);
        
        if (success) {
          // Reload profile to get updated X handle
          const { data, error } = await supabase
            .from('profiles')
            .select('x_handle')
            .eq('id', user.id)
            .single();
            
          if (!error && data) {
            setUserProfile(prev => ({ ...prev, xHandle: data.x_handle || "" }));
            setNotification({
              type: 'success',
              message: 'X account connected successfully!'
            });
            setTimeout(() => {
              setNotification({ type: null, message: '' });
            }, 3000);
          }
        } else {
          setNotification({
            type: 'error',
            message: 'Failed to connect X account. Please try again.'
          });
        }
      }
    };
    
    handleXConnection();
  }, [user, userProfile.xHandle, supabase]);

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
      
      // Persist to Supabase (create row if missing), then refetch once
      try {
        const { data: upserted, error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            username: userProfile.username,
            avatar_name: userProfile.avatar,
            country: selectedCountry,
            x_handle: userProfile.xHandle || null
          }, { onConflict: 'id' })
          .select();

        if (error) {
          console.warn('Supabase upsert failed:', error);
          setNotification({ type: 'error', message: `Failed to save profile: ${error.message || 'Unknown error'}` });
        } else if (upserted && upserted[0]) {
          console.log('Profile saved:', upserted[0]);
          setUserProfile(prev => ({
            ...prev,
            username: upserted[0].username ?? prev.username,
            avatar: upserted[0].avatar_name ?? prev.avatar,
          }));
          setUserCountry(upserted[0].country || '');
          setSelectedCountry(upserted[0].country || '');
          
          // Trigger profile update event for other components AFTER successful save
          window.dispatchEvent(new CustomEvent('profileUpdated'));
        }
      } catch (supabaseError) {
        console.warn('Supabase sync error:', supabaseError);
        setNotification({ type: 'error', message: 'Unexpected error saving profile.' });
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


  const handleDisconnectX = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ x_handle: null })
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      setUserProfile(prev => ({ ...prev, xHandle: "" }));
      setNotification({
        type: 'success',
        message: 'X account disconnected successfully!'
      });
      
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error disconnecting X:', error);
      setNotification({
        type: 'error',
        message: 'Failed to disconnect X account. Please try again.'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <div className="p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
        <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Username
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {loading ? "Loading..." : userProfile.username || "Not set"}
              </p>
            </div>
                </div>
            </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
            <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Email Address
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {loading ? "Loading..." : userProfile.email || "Not set"}
              </p>
            </div>
                </div>
            </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
            <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Country
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {userCountry ? countries.find(c => c.code === userCountry)?.name || userCountry : "Not set"}
              </p>
            </div>
          </div>
        </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Login Method
                    </label>
                    <div className="mt-1">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {loading ? "Loading..." : (() => {
                          if (user?.app_metadata?.provider === 'google') return 'Google';
                          if (user?.app_metadata?.provider === 'twitter') return 'X (Twitter)';
                          if (user?.app_metadata?.provider === 'email') return 'Email';
                          return 'Email'; // Default fallback
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 lg:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      X Account
                    </label>
                    <div className="mt-1">
                      {userProfile.xHandle ? (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">@{userProfile.xHandle}</span>
                          </div>
                          <button
                            onClick={handleDisconnectX}
                            className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            Disconnect
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={openModal}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          Connect X Account
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Display */}
            {notification.type && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${
                notification.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                  : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
              }`}>
                {notification.message}
            </div>
            )}
        </div>

          <div className="flex justify-end lg:ml-6">
        <button
          onClick={openModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg
                className="w-4 h-4"
            fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
              Edit Profile
        </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="w-full h-full sm:relative sm:max-w-[800px] sm:h-auto sm:m-4 sm:rounded-2xl" showCloseButton={false}>
        <div ref={contentRef} className="relative w-full h-full sm:max-w-[800px] sm:max-h-[90vh] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto sm:rounded-2xl">
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sm:rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Profile
            </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update your personal information and preferences
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-4 sm:px-6 py-6">
          <form className="flex flex-col">
            <div className="space-y-8 pb-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h5 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      value={userProfile.username}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, username: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Email Address</Label>
                    <Input
                      type="text"
                      value={userProfile.email}
                      disabled
                      className="mt-2 bg-gray-100 dark:bg-gray-700"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Avatar</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-2">
                      {avatarOptions.map((avatar) => (
                        <div
                          key={avatar.id}
                          className={`cursor-pointer border-2 rounded-xl p-2 sm:p-3 transition-all hover:scale-105 ${
                            userProfile.avatar === avatar.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                          onClick={() => setUserProfile(prev => ({ ...prev, avatar: avatar.id }))}
                        >
                          <img
                            src={avatar.image}
                            alt={avatar.name}
                            className="w-full h-12 sm:h-14 md:h-16 object-cover rounded-lg"
                          />
                          <p className="text-xs text-center mt-1.5 sm:mt-2 text-gray-600 dark:text-gray-400 font-medium">
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
                      className="mt-2 w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <Label>X Handle</Label>
                    <Input
                      id="xHandle"
                      type="text"
                      placeholder="Enter your X handle (without @)"
                      value={userProfile.xHandle}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, xHandle: e.target.value }))}
                      className="mt-2"
                    />
                  </div>
                </div>
                  </div>

              {/* Delete Profile Section */}
              <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-12">
                <button
                  type="button"
                  onClick={async () => {
                    if (!isDeleteArmed) {
                      setIsDeleteArmed(true);
                      return;
                    }
                    try {
                      // Delete profile data and sign out - simple and effective
                      const { error } = await supabase
                        .from('profiles')
                        .delete()
                        .eq('id', user?.id || '');
                      
                      if (error) {
                        console.error('Error deleting profile:', error);
                        setNotification({ type: 'error', message: 'Failed to delete profile. Please try again.' });
                        setIsDeleteArmed(false);
                        return;
                      }

                      // Success - sign out and redirect
                      setNotification({ type: 'success', message: 'Profile deleted successfully.' });
                      setTimeout(async () => {
                        await supabase.auth.signOut();
                        window.location.replace('/signin');
                      }, 1500);

                    } catch (err) {
                      console.error('Error deleting profile:', err);
                      setNotification({ type: 'error', message: 'Failed to delete profile. Please try again.' });
                      setIsDeleteArmed(false);
                    }
                  }}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors border ${isDeleteArmed ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' : 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 border-red-300 dark:border-red-700'}`}
                >
                  {isDeleteArmed ? 'Delete now' : 'Delete Profile'}
                </button>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  This will permanently delete your profile and all associated information. This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 -mx-6 -mb-6 rounded-b-2xl">
              <div className="flex items-center justify-end gap-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={closeModal}
                  className="px-6 py-2.5"
                >
                  Cancel
              </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white"
                >
                Save Changes
              </Button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
