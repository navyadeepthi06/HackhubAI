import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CountdownTimer from '../components/CountdownTimer';
import {
  Calendar,
  Clock,
  Trophy,
  Sparkles,
  Bookmark,
  TrendingUp,
  Bell,
  ArrowRight,
  AlertCircle,
  Rocket,
  Target,
  Zap,
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, isLoggedIn, savedHackathons, recommendations, allHackathons } = useApp();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30 animate-float">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center text-white animate-bounce">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Access Your Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Sign in to access your personalized dashboard with AI recommendations, saved events, and deadline reminders.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-premium"
          >
            <Rocket className="w-5 h-5" />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const upcomingDeadlines = savedHackathons
    .filter(h => new Date(h.registrationDeadline) > new Date())
    .sort((a, b) => new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime())
    .slice(0, 3);

  const topRecommendations = recommendations.slice(0, 3);
  const recentNotifications = [
    {
      id: '1',
      message: 'Global AI Hackathon 2024 registration closes in 5 days',
      time: '2 hours ago',
      type: 'deadline',
    },
    {
      id: '2',
      message: 'New recommendation: Web3 Builder Challenge matches your skills',
      time: '5 hours ago',
      type: 'recommendation',
    },
    {
      id: '3',
      message: 'GreenTech Innovation Summit starts next week',
      time: '1 day ago',
      type: 'reminder',
    },
  ];

  return (
    <div className="min-h-screen bg-mesh pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Overview</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's what's happening with your hackathon journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Saved Events', value: savedHackathons.length, icon: Bookmark, color: 'from-blue-500 to-cyan-500', change: '+2 this week' },
            { label: 'AI Matches', value: recommendations.length, icon: Sparkles, color: 'from-violet-500 to-purple-500', change: 'Active' },
            { label: 'Skills Listed', value: user.skills.length, icon: Target, color: 'from-emerald-500 to-teal-500', change: 'Complete' },
            { label: 'Upcoming', value: upcomingDeadlines.length, icon: Clock, color: 'from-amber-500 to-orange-500', change: 'Deadlines' },
          ].map((stat, index) => (
            <div
              key={index}
              className="card p-5 card-hover group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Deadlines */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">Upcoming Deadlines</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Don't miss registration dates</p>
                  </div>
                </div>
                <Link
                  to="/saved"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-5">
                {upcomingDeadlines.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingDeadlines.map((hackathon, index) => (
                      <div
                        key={hackathon.id}
                        className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <Link
                            to={`/hackathon/${hackathon.id}`}
                            className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block truncate"
                          >
                            {hackathon.name}
                          </Link>
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{hackathon.theme}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <CountdownTimer targetDate={hackathon.registrationDeadline} showIcon={false} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">No upcoming deadlines</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Save hackathons to track their deadlines
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">Top AI Recommendations</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Personalized for you</p>
                  </div>
                </div>
                <Link
                  to="/recommendations"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-5">
                {topRecommendations.length > 0 ? (
                  <div className="space-y-3">
                    {topRecommendations.map((rec, index) => {
                      const hackathon = allHackathons.find(h => h.id === rec.hackathonId);
                      if (!hackathon) return null;
                      return (
                        <div
                          key={hackathon.id}
                          className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 via-violet-50 to-purple-50 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-purple-900/20 rounded-xl hover:shadow-md transition-all group"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                              <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow">
                              {rec.matchPercentage}%
                            </span>
                          </div>
                          <div className="flex-grow min-w-0">
                            <Link
                              to={`/hackathon/${hackathon.id}`}
                              className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block truncate"
                            >
                              {hackathon.name}
                            </Link>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{rec.reason}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{hackathon.prizePool}</div>
                            <div className="text-xs text-slate-400">{hackathon.isOnline ? 'Online' : hackathon.location}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">No recommendations yet</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Complete your profile to get personalized recommendations
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Quick View */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">Your Saved Events</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Quick access to bookmarked hackathons</p>
                  </div>
                </div>
                <Link
                  to="/saved"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-5">
                {savedHackathons.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {savedHackathons.slice(0, 4).map(hackathon => (
                      <Link
                        key={hackathon.id}
                        to={`/hackathon/${hackathon.id}`}
                        className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                              hackathon.isOnline
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}
                          >
                            {hackathon.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 transition-colors text-sm">
                          {hackathon.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{hackathon.prizePool}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">No saved events</p>
                    <Link
                      to="/hackathons"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 mt-1 inline-block"
                    >
                      Browse hackathons
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Notifications */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">Notifications</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Recent updates</p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentNotifications.map(notification => (
                  <div key={notification.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === 'deadline'
                            ? 'bg-red-500'
                            : notification.type === 'recommendation'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{notification.message}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-5 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 border-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-semibold text-white">Quick Actions</h2>
              </div>
              <div className="space-y-2">
                <Link
                  to="/hackathons"
                  className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur rounded-xl text-white hover:bg-white/30 transition-colors"
                >
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-medium">Browse Hackathons</span>
                </Link>
                <Link
                  to="/recommendations"
                  className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur rounded-xl text-white hover:bg-white/30 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Get AI Recommendations</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur rounded-xl text-white hover:bg-white/30 transition-colors"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Update Profile</span>
                </Link>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">Your Profile</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Quick overview</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                    alt={user.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{user.experienceLevel} Developer</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {user.skills.slice(0, 4).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skills.length > 4 && (
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-xs">
                      +{user.skills.length - 4}
                    </span>
                  )}
                </div>
                <Link
                  to="/profile"
                  className="block w-full text-center py-2.5 bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
