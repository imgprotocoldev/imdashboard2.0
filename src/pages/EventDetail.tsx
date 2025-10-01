import React from "react";
import { Link, useParams, useNavigate } from "react-router";
import { getEventBySlug, getRelatedEvents } from "../data/eventsData";

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const event = slug ? getEventBySlug(slug) : undefined;
  const relatedEvents = slug ? getRelatedEvents(slug, 3) : [];

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Event Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">The event you're looking for doesn't exist.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out: ${event.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar with Breadcrumbs & Back Button */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex items-center gap-2">
            <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 p-1 bg-gray-50 dark:bg-gray-900/50">
              <Link
                to="/events"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Events
              </Link>
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm">
                {event.title}
              </span>
            </div>
          </nav>
          <button
            onClick={() => navigate('/events')}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03] transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>

      {/* Main Article */}
      <article className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Header Section - Two Column Layout */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Header Info */}
            <div className="flex flex-col h-full min-h-[20rem]">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400">
                  {event.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {event.title}
              </h1>

              {/* Excerpt/Subtext */}
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {event.excerpt}
              </p>

              {/* Author Info - Always at bottom */}
              <div className="flex items-center gap-3 mt-auto pt-4">
                <img
                  src={event.author.avatar}
                  alt={event.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {event.author.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 dark:border-gray-800 my-8"></div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-h1:text-gray-900 dark:prose-h1:text-white prose-h2:text-gray-900 dark:prose-h2:text-white prose-h3:text-gray-900 dark:prose-h3:text-white prose-h4:text-gray-900 dark:prose-h4:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-brand-500 dark:prose-a:text-brand-400 prose-strong:text-gray-900 dark:prose-strong:text-white">
            {event.content.split('\n\n').map((paragraph, index) => {
              // Handle markdown headers
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              // Handle bold text
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-gray-800 dark:text-white mt-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              // Handle list items
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mt-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              // Regular paragraph
              return (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Share Buttons */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Share this event</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleShare('twitter')}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
              <button
                onClick={() => handleShare('telegram')}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </button>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-500/10 dark:to-purple-500/10 p-6 border border-brand-200 dark:border-brand-500/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Join the IMG Protocol Community
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Stay updated with the latest events, updates, and announcements. Connect with validators and contributors.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://t.me/imgprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
              >
                Join Telegram
              </a>
              <a
                href="https://twitter.com/imgprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                Follow on Twitter
              </a>
              <Link
                to="/terminal"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                View Terminal
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedEvents.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Events</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedEvents.map((related) => (
              <Link
                key={related.id}
                to={`/events/${related.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <div className="overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400 mb-2">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {related.excerpt}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(related.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default EventDetail;

