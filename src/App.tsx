import { BrowserRouter as Router, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600 dark:border-gray-700 dark:border-t-purple-500"></div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

// Auth Pages - Keep these eager loaded for faster initial access
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// Core Dashboard Pages - Lazy loaded for better initial bundle size
const Terminal = lazy(() => import("./pages/Dashboard/Terminal"));
const Home = lazy(() => import("./pages/Dashboard/Home"));
const Hub = lazy(() => import("./pages/Hub"));
const RaidGames = lazy(() => import("./pages/RaidGames"));
const Raid = lazy(() => import("./pages/Raid"));

// Data Pages - Lazy loaded
const Harvesting = lazy(() => import("./pages/Harvesting"));
const Distribution = lazy(() => import("./pages/Distribution"));
const Earnings = lazy(() => import("./pages/Earnings"));

// Community Pages - Lazy loaded
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Voting = lazy(() => import("./pages/Voting"));
const Notifications = lazy(() => import("./pages/Notifications"));

// User Pages - Lazy loaded
const UserProfiles = lazy(() => import("./pages/UserProfiles"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const Support = lazy(() => import("./pages/Support"));

// Utility Pages - Lazy loaded (rarely accessed)
const Calendar = lazy(() => import("./pages/Calendar"));
const Blank = lazy(() => import("./pages/Blank"));
const NotFound = lazy(() => import("./pages/OtherPage/NotFound"));

// Forms - Lazy loaded
const FormElements = lazy(() => import("./pages/Forms/FormElements"));

// Tables - Lazy loaded
const BasicTables = lazy(() => import("./pages/Tables/BasicTables"));

// UI Elements - Lazy loaded (rarely accessed)
const Videos = lazy(() => import("./pages/UiElements/Videos"));
const Images = lazy(() => import("./pages/UiElements/Images"));
const Alerts = lazy(() => import("./pages/UiElements/Alerts"));
const Badges = lazy(() => import("./pages/UiElements/Badges"));
const Avatars = lazy(() => import("./pages/UiElements/Avatars"));
const Buttons = lazy(() => import("./pages/UiElements/Buttons"));

// Charts - Lazy loaded
const LineChart = lazy(() => import("./pages/Charts/LineChart"));
const BarChart = lazy(() => import("./pages/Charts/BarChart"));

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Auth Layout - Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Dashboard Layout - Protected Routes */}
              <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Terminal />} />
                <Route path="terminal" element={<Terminal />} />
                <Route path="mainscreen" element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:slug" element={<EventDetail />} />
                <Route path="harvesting" element={<Harvesting />} />
                <Route path="distribution" element={<Distribution />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="voting" element={<Voting />} />
                <Route path="hub" element={<Hub />} />
                <Route path="raidgames" element={<RaidGames />} />
                <Route path="raid" element={<Raid />} />
                <Route path="notifications" element={<Notifications />} />

                {/* Others Page */}
                <Route path="profile" element={<UserProfiles />} />
                <Route path="accountsettings" element={<AccountSettings />} />
                <Route path="support" element={<Support />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="blank" element={<Blank />} />

                {/* Forms */}
                <Route path="form-elements" element={<FormElements />} />

                {/* Tables */}
                <Route path="basic-tables" element={<BasicTables />} />

                {/* Ui Elements */}
                <Route path="alerts" element={<Alerts />} />
                <Route path="avatars" element={<Avatars />} />
                <Route path="badge" element={<Badges />} />
                <Route path="buttons" element={<Buttons />} />
                <Route path="images" element={<Images />} />
                <Route path="videos" element={<Videos />} />

                {/* Charts */}
                <Route path="line-chart" element={<LineChart />} />
                <Route path="bar-chart" element={<BarChart />} />
              </Route>

              {/* Error Routes */}
              <Route path="error-404" element={<NotFound />} />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}
