import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { eventsData } from "../data/eventsData";

type SortBy = "newest" | "oldest" | "popular";
type TopicTab = "all" | "updates" | "featured";

const EventsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [activeTab, setActiveTab] = useState<TopicTab>("all");

  // Events sorted and filtered
  const filteredEvents = useMemo(() => {
    let items = [...eventsData];
    
    // Apply tab filter
    if (activeTab === "updates") {
      items = items.filter(e => e.category === "updates");
    } else if (activeTab === "featured") {
      items = items.filter(e => e.category === "featured");
    }
    
    // Apply sorting
    if (sortBy === "newest") items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sortBy === "oldest") items.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sortBy === "popular") items.sort((a, b) => b.popularity - a.popularity);
    
    return items;
  }, [sortBy, activeTab]);

  return (
    <div className="space-y-6">
      {/* Header Bar with Tabs + Sort */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 p-1 bg-gray-50 dark:bg-gray-900/50">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "updates"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("updates")}
            >
              Project Updates
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "featured"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("featured")}
            >
              Featured Events
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
            <select
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {filteredEvents.map((evt) => (
          <Link
            key={evt.id}
            to={`/events/${evt.slug}`}
            className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex flex-col min-h-[14rem]">
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400 mb-3 w-fit">
                {evt.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                {evt.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                {evt.excerpt}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                {new Date(evt.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;


