import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CountdownTimer from '../components/CountdownTimer';
import {
  Calendar,
  DollarSign,
  MapPin,
  Globe,
  Users,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Clock,
  Tag,
  Zap,
  Lightbulb,
  CalendarPlus,
  Share2,
  ArrowLeft,
  Trophy,
} from 'lucide-react';

const HackathonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { allHackathons, isSaved, saveHackathon, unsaveHackathon, isLoggedIn } = useApp();

  const hackathon = allHackathons.find(h => h.id === id);

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Hackathon Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            The hackathon you're looking for doesn't exist.
          </p>
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathons
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(hackathon.id);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSaveToggle = () => {
    if (saved) {
      unsaveHackathon(hackathon.id);
    } else {
      saveHackathon(hackathon.id);
    }
  };

  const addToCalendar = () => {
    const eventDate = new Date(hackathon.eventDate);
    const registrationDeadline = new Date(hackathon.registrationDeadline);

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(hackathon.name)}&dates=${registrationDeadline.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Theme: ${hackathon.theme}\n\n${hackathon.description}`)}&location=${encodeURIComponent(hackathon.isOnline ? 'Online' : hackathon.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const aiProjectIdeas = [
    {
      title: 'AI-Powered Code Assistant',
      description: `Build an intelligent code assistant that helps developers write better code for ${hackathon.theme.toLowerCase()} applications.`,
      difficulty: 'Intermediate',
    },
    {
      title: 'Real-time Analytics Dashboard',
      description: `Create a live dashboard that visualizes ${hackathon.theme.toLowerCase()} metrics and insights.`,
      difficulty: 'Beginner',
    },
    {
      title: 'Smart Recommendation Engine',
      description: `Develop a recommendation system that leverages AI to suggest solutions in the ${hackathon.theme.toLowerCase()} domain.`,
      difficulty: 'Advanced',
    },
  ];

  const aiSummary = `This ${hackathon.difficulty.toLowerCase()}-level hackathon focuses on "${hackathon.theme}". With a prize pool of ${hackathon.prizePool}, it's organized by ${hackathon.organizer} and ${
    hackathon.isOnline
      ? 'takes place virtually, allowing global participation'
      : `will be held in ${hackathon.location}`
  }. Key skills required include ${hackathon.skills.slice(0, 3).join(', ')}. Registration closes on ${formatDate(hackathon.registrationDeadline)}.`;

  return (
    <div className="min-h-screen bg-mesh pt-20 pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-1 text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathons
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    hackathon.isOnline
                      ? 'bg-emerald-400/20 text-white'
                      : 'bg-blue-400/20 text-white'
                  }`}
                >
                  {hackathon.isOnline ? (
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" /> Online
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {hackathon.location}
                    </span>
                  )}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    hackathon.difficulty === 'Beginner'
                      ? 'bg-emerald-400/20 text-white'
                      : hackathon.difficulty === 'Intermediate'
                      ? 'bg-amber-400/20 text-white'
                      : 'bg-red-400/20 text-white'
                  }`}
                >
                  {hackathon.difficulty}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {hackathon.name}
              </h1>
              <p className="text-blue-100 text-lg max-w-3xl">
                {hackathon.theme}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSaveToggle}
                disabled={!isLoggedIn}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  saved
                    ? 'bg-amber-400 text-amber-900 hover:bg-amber-300'
                    : isLoggedIn
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {saved ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
                {saved ? 'Saved' : 'Save Event'}
              </button>
              <button
                onClick={addToCalendar}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                <CalendarPlus className="w-5 h-5" />
                Add to Calendar
              </button>
              <button className="p-3 bg-white/20 backdrop-blur text-white border border-white/30 rounded-xl hover:bg-white/30 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: DollarSign, label: 'Prize Pool', value: hackathon.prizePool, iconColor: 'emerald' },
                { icon: Clock, label: 'Deadline', value: formatDate(hackathon.registrationDeadline).slice(0, 15), iconColor: 'red' },
                { icon: Calendar, label: 'Event Date', value: formatDate(hackathon.eventDate).slice(0, 15), iconColor: 'green' },
                { icon: Users, label: 'Organizer', value: hackathon.organizer, iconColor: 'purple' },
              ].map((stat, index) => (
                <div key={index} className="card p-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center`}
                      style={{ backgroundColor: stat.iconColor === 'emerald' ? '#dcfce7' : stat.iconColor === 'red' ? '#fee2e2' : stat.iconColor === 'green' ? '#dcfce7' : '#f3e8ff' }}
                    >
                      <stat.icon className={`w-6 h-6`}
                        style={{ color: stat.iconColor === 'emerald' ? '#059669' : stat.iconColor === 'red' ? '#dc2626' : stat.iconColor === 'green' ? '#059669' : '#9333ea' }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                      <div className="font-semibold text-slate-800 dark:text-white text-sm truncate">{stat.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div className="card p-6 bg-gradient-to-r from-blue-50 via-violet-50 to-purple-50 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-semibold text-slate-900 dark:text-white">AI-Generated Summary</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{aiSummary}</p>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                About This Hackathon
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{hackathon.description}</p>
            </div>

            {/* Project Ideas */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="font-semibold text-slate-900 dark:text-white">AI-Suggested Project Ideas</h2>
              </div>
              <div className="space-y-4">
                {aiProjectIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-medium text-slate-900 dark:text-white">{idea.title}</h3>
                      <span
                        className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${
                          idea.difficulty === 'Beginner'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : idea.difficulty === 'Intermediate'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {idea.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{idea.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Required */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="font-semibold text-slate-900 dark:text-white">Skills & Technologies</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hackathon.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {hackathon.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Countdown */}
              <div className="card p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Registration Ends In
                </h3>
                <CountdownTimer targetDate={hackathon.registrationDeadline} showIcon={false} />
              </div>

              {/* Register CTA */}
              <div className="card p-6 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 border-0">
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Participate?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Register now and start preparing for this exciting hackathon.
                </p>
                <a
                  href={hackathon.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Register Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Event Details */}
              <div className="card p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {hackathon.isOnline ? 'Virtual Event' : hackathon.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {formatDate(hackathon.eventDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
