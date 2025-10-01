import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { eventsData } from "../data/eventsData";

type SortBy = "newest" | "oldest" | "popular";
type TopicTab = "all" | "updates" | "featured";

const EventsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [activeTab, setActiveTab] = useState<TopicTab>("all");

  // Featured card is always the most popular event and doesn't respond to tabs/filters
  const featuredEvent = useMemo(() => {
    return [...eventsData].sort((a, b) => b.popularity - a.popularity)[0];
  }, []);

  // Other events sorted and filtered
  const events = useMemo(() => {
    const items = eventsData.filter(e => e.id !== featuredEvent.id); // Exclude featured
    if (sortBy === "newest") items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sortBy === "oldest") items.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sortBy === "popular") items.sort((a, b) => b.popularity - a.popularity);
    return items;
  }, [sortBy, featuredEvent.id]);

  const filteredEvents = activeTab === "all"
    ? events
    : events.filter((e) => (activeTab === "updates" ? e.category === "updates" : e.category === "featured"));

  return (
    <div className="space-y-6">
      {/* Featured card - Static banner, doesn't respond to tabs/filters */}
      {featuredEvent && (
        <Link to={`/events/${featuredEvent.slug}`}>
          <article className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img src={featuredEvent.image} alt={featuredEvent.title} className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-col h-full min-h-[18rem]">
                {/* Topic badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400">
                    {featuredEvent.category}
                  </span>
                </div>
                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-9 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                  {featuredEvent.title}
                </h1>
                {/* Information text with flex-grow to push date to bottom */}
                <p className="mt-4 flex-grow text-gray-700 dark:text-gray-300 leading-7">
                  {featuredEvent.excerpt}
                </p>
                {/* Date always at bottom */}
                <div className="mt-5 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(featuredEvent.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
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
        {filteredEvents.map((evt) => (
          <Link key={evt.id} to={`/events/${evt.slug}`}>
            <article className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 cursor-pointer">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                <div className="sm:col-span-2 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img src={evt.image} alt={evt.title} className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="sm:col-span-3 flex flex-col h-full min-h-[12rem]">
                  {/* Topic badge */}
                  <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400">
                      {evt.category}
                    </span>
                  </div>
                  {/* Header */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-7 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                    {evt.title}
                  </h3>
                  {/* Information text with flex-grow to push date to bottom */}
                  <p className="mt-3 flex-grow text-sm text-gray-700 dark:text-gray-300 leading-6">
                    {evt.excerpt}
                  </p>
                  {/* Date always at bottom */}
                  <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{new Date(evt.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;


