import React, { useMemo, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  category: "upcoming" | "featured" | "updates";
  date: string; // ISO
  image: string;
  description: string;
  popularity: number; // for sorting by most popular
};

const seedEvents: EventItem[] = [
  {
    id: "e1",
    title: "IMG v2 Terminal Launch Webinar",
    category: "upcoming",
    date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event1.webp",
    description: "Walkthrough of the new terminal features and roadmap.",
    popularity: 85,
  },
  {
    id: "e2",
    title: "Partnership Announcement",
    category: "updates",
    date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event2.webp",
    description: "Integrations to improve reward distribution pipeline.",
    popularity: 60,
  },
  {
    id: "e3",
    title: "Community AMA",
    category: "featured",
    date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event3.webp",
    description: "Join the team to discuss IMG, SOL conversions, and plans.",
    popularity: 95,
  },
  {
    id: "e4",
    title: "Quarterly Update",
    category: "updates",
    date: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event4.webp",
    description: "Metrics, releases, and next milestones.",
    popularity: 72,
  },
  {
    id: "e5",
    title: "Validator Ops Workshop",
    category: "upcoming",
    date: new Date(Date.now() + 21 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event5.webp",
    description: "Hands-on session for infra contributors and power users.",
    popularity: 68,
  },
];

type SortBy = "newest" | "oldest" | "popular";
type TopicTab = "all" | "updates" | "featured";

const EventsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [activeTab, setActiveTab] = useState<TopicTab>("all");

  const events = useMemo(() => {
    const items = [...seedEvents];
    if (sortBy === "newest") items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sortBy === "oldest") items.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sortBy === "popular") items.sort((a, b) => b.popularity - a.popularity);
    return items;
  }, [sortBy]);

  const featured = events[0];
  const restAll = events.slice(1);
  const rest = activeTab === "all"
    ? restAll
    : restAll.filter((e) => (activeTab === "updates" ? e.category === "updates" : e.category === "featured"));

  return (
    <div className="space-y-6">
      {/* Featured card */}
      {featured && (
        <article className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-2 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <img src={featured.image} alt={featured.title} className="w-full h-56 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="md:col-span-3 flex flex-col h-full min-h-[18rem]">
              {/* Topic badge */}
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400">
                  {featured.category}
                </span>
              </div>
              {/* Header */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-9 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                {featured.title}
              </h1>
              {/* Information text with flex-grow to push date to bottom */}
              <p className="mt-4 flex-grow text-gray-700 dark:text-gray-300 leading-7">
                {featured.description}
              </p>
              {/* Date always at bottom */}
              <div className="mt-5 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(featured.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Tabs + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 p-1 bg-white dark:bg-white/[0.03]">
          <button
            className={`px-3 py-2 rounded-lg text-sm ${
              activeTab === "all"
                ? "bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm ${
              activeTab === "updates"
                ? "bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("updates")}
          >
            Project Updates
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm ${
              activeTab === "featured"
                ? "bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("featured")}
          >
            Featured Events
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">Sort:</label>
          <select
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Other events */}
      <div className="grid gap-6 sm:grid-cols-2">
        {rest.map((evt) => (
          <article key={evt.id} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-2 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img src={evt.image} alt={evt.title} className="w-full h-56 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="sm:col-span-3 flex flex-col h-full min-h-[20rem]">
                {/* Topic badge */}
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400">
                    {evt.category}
                  </span>
                </div>
                {/* Header */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-8 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                  {evt.title}
                </h3>
                {/* Information text with flex-grow to push date to bottom */}
                <p className="mt-3 flex-grow text-gray-700 dark:text-gray-300 leading-7">
                  {evt.description}
                </p>
                {/* Date always at bottom */}
                <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(evt.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;


