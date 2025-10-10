import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  details: string;
  date: string;
  category: string;
  icon: string;
}

export default function Notifications() {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Welcome to IMG Dashboard!',
      description: 'Start earning rewards and points today',
      details: 'Welcome to the Infinite Money Glitch Dashboard! We\'re excited to have you here. Explore our features including Daily Spins, Raid Games, and Active Raids to start earning points and climbing the leaderboard. Connect your X account to unlock all features and maximize your rewards.',
      date: 'October 10, 2025',
      category: 'System',
      icon: './images/notification/imglogoround.png'
    },
    {
      id: '2',
      title: 'New Raid Games Available!',
      description: '6 exciting games now cost only 25 points each',
      details: 'We\'ve updated our Raid Games section with standardized pricing! All games now cost just 25 points to play, including Fortune Spin, Scratch Card, Pick a Card, Dice Roll, Slot Machine, and Coin Flip. Each game offers unique rewards and exciting gameplay. Purchase games with your earned points and try your luck for bigger rewards!',
      date: 'October 10, 2025',
      category: 'Games',
      icon: './images/notification/imglogoround.png'
    },
    {
      id: '3',
      title: 'Daily Spin Updated!',
      description: 'Now rewards Points instead of XP',
      details: 'The Daily Spin feature has been upgraded! You can now earn Points directly from your daily spins instead of XP. Points are more versatile and can be used to purchase games, participate in raids, and unlock exclusive features. Make sure to spin daily to maximize your point earnings!',
      date: 'October 10, 2025',
      category: 'Hub',
      icon: './images/notification/imglogoround.png'
    },
    {
      id: '4',
      title: 'Raid System Enhanced!',
      description: 'X account connection now required',
      details: 'To ensure authentic participation and prevent abuse, we now require users to connect their X (Twitter) account before joining raids. This helps us verify raid actions (likes, replies, retweets) and ensures fair XP distribution. Visit your profile page to connect your X account and start raiding!',
      date: 'October 9, 2025',
      category: 'Raids',
      icon: './images/notification/imglogoround.png'
    },
    {
      id: '5',
      title: 'Leaderboard Fixed!',
      description: 'Now shows all users with real usernames',
      details: 'We\'ve fixed the leaderboard to display all users correctly! Previously, only the logged-in user was visible. Now you can see the top players across the platform with their real usernames. The leaderboard updates in real-time as users earn points and XP. Compete with others and climb to the top!',
      date: 'October 9, 2025',
      category: 'System',
      icon: './images/notification/imglogoround.png'
    },
    {
      id: '6',
      title: 'Profile System Updated!',
      description: 'Usernames now auto-created on signup',
      details: 'We\'ve improved the user experience by automatically creating usernames for new signups. Whether you sign up with email, Google, or X (Twitter), your username will be automatically generated and displayed across the platform. You can always customize your username later in your profile settings.',
      date: 'October 8, 2025',
      category: 'Profile',
      icon: './images/notification/imglogoround.png'
    },
    {
      id: '7',
      title: 'Points Economy Live!',
      description: 'All games now use unified Points system',
      details: 'We\'ve transitioned to a unified Points economy! All games, purchases, and rewards now use the same Points currency. This makes it easier to track your progress and spend your earnings across different features. Earn points from raids, daily spins, and games, then use them to unlock more opportunities!',
      date: 'October 7, 2025',
      category: 'Economy',
      icon: './images/notification/imglogoround.png'
    }
  ];

  return (
    <>
      <PageMeta title="Notifications | IMG Dashboard" description="Stay updated with the latest news and updates from IMG Dashboard" />
      <PageBreadcrumb title="Notifications" pages={["Dashboard", "Notifications"]} />
      
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Notifications
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Stay updated with the latest news and updates
            </p>
          </div>
          <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {notifications.length} Updates
          </span>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <img
                    src={notification.icon}
                    alt="Notification"
                    className="w-12 h-12 rounded-full"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {notification.description}
                      </p>
                    </div>
                    <span className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                      {notification.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    {notification.details}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (optional for future) */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
              No notifications yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We'll notify you when something new arrives
            </p>
          </div>
        )}
      </div>
    </>
  );
}

