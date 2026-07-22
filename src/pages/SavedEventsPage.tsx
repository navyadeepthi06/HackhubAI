import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CountdownTimer from '../components/CountdownTimer';
import {
  Bookmark,
  Calendar,
  DollarSign,
  MapPin,
  Globe,
  ExternalLink,
  Trash2,
  Bell,
  Trophy,
} from 'lucide-react';

const SavedEventsPage: React.FC = () => {
  const { savedHackathons, isLoggedIn, unsaveHackathon } = useApp();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 animate-float">
              <Bookmark className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Save Your Favorite Hackathons
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Sign in to bookmark hackathons and keep track of events you're interested in.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-premium"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh pt-20 pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-orange-200 mb-4">
            <Bookmark className="w-5 h-5" />
            <span className="text-sm font-medium">Your Collection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Saved Events
          </h1>
          <p className="text-orange-100 max-w-2xl">
            Keep track of hackathons you're interested in. Never miss a deadline with our countdown timers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedHackathons.length > 0 ? (
          <div className="space-y-4">
            {savedHackathons.map((hackathon, index) => (
              <div
                key={hackathon.id}
                className="card overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              hackathon.isOnline
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}
                          >
                            {hackathon.isOnline ? (
                              <span className="flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Online
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {hackathon.location}
                              </span>
                            )}
                          </span>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              hackathon.difficulty === 'Beginner'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : hackathon.difficulty === 'Intermediate'
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-slate-700 dark:text-red-300'
                            }`}
                          >
                            {hackathon.difficulty}
                          </span>
                        </div>
                        <Link to={`/hackathon/${hackathon.id}`}>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {hackathon.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{hackathon.theme}</p>
                      </div>
                      <button
                        onClick={() => unsaveHackathon(hackathon.id)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Event: {formatDate(hackathon.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{hackathon.prizePool}</span>
                      </div>
                      {hackathon.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-72 p-6 bg-slate-50 dark:bg-slate-700/50 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <Bell className="w-4 h-4" />
                        <span>Registration Deadline</span>
                      </div>
                      <CountdownTimer targetDate={hackathon.registrationDeadline} showIcon={false} />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link
                        to={`/hackathon/${hackathon.id}`}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-center rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                      >
                        View Details
                      </Link>
                      <a
                        href={hackathon.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 card">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No saved events yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Start exploring hackathons and save the ones you're interested in. They'll appear here for easy access.
            </p>
            <Link
              to="/hackathons"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-premium"
            >
              <Trophy className="w-5 h-5" />
              Explore Hackathons
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedEventsPage;
