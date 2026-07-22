import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HackathonCard from '../components/HackathonCard';
import {
  Sparkles,
  Target,
  TrendingUp,
  RefreshCw,
  User,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

const RecommendationsPage: React.FC = () => {
  const { user, isLoggedIn, recommendations, allHackathons } = useApp();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-violet-500/30 animate-float">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white animate-bounce">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Get AI Recommendations
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Sign in to unlock personalized hackathon recommendations based on your skills and interests.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-premium"
          >
            <User className="w-5 h-5" />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const recommendedHackathons = recommendations.map(rec => {
    const hackathon = allHackathons.find(h => h.id === rec.hackathonId);
    return hackathon ? { hackathon, matchPercentage: rec.matchPercentage, reason: rec.reason } : null;
  }).filter(Boolean);

  const topSkills = user?.skills.slice(0, 4) || [];
  const topInterests = user?.interests.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-mesh pt-20 pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-purple-200 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Personalized Recommendations
          </h1>
          <p className="text-purple-100 max-w-2xl">
            Based on your profile, we've identified hackathons that match your skills and interests. The higher the match percentage, the better the fit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Summary */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="font-semibold text-slate-900 dark:text-white">Your Profile at a Glance</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Top Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {topSkills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {topInterests.map((interest: string) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/profile"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1 whitespace-nowrap"
            >
              Edit Profile <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Match Score Legend */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Understanding Your Match Scores</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { score: '90%+', label: 'Excellent Match', desc: 'Highly aligned with your skills and interests', color: 'emerald' },
              { score: '70%', label: 'Good Match', desc: 'Several skills and interests align', color: 'amber' },
              { score: '50%', label: 'Potential Match', desc: 'Some overlap with your profile', color: 'blue' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl flex items-center justify-center flex-shrink-0`}
                  style={{ backgroundColor: item.color === 'emerald' ? '#dcfce7' : item.color === 'amber' ? '#fef3c7' : '#dbeafe' }}
                >
                  <span className={`font-bold text-sm`}
                    style={{ color: item.color === 'emerald' ? '#059669' : item.color === 'amber' ? '#d97706' : '#2563eb' }}
                  >
                    {item.score}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">{item.label}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recommended for You
          </h2>
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {recommendedHackathons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedHackathons.map((item, index) => (
              item && (
                <div
                  key={item.hackathon.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <HackathonCard
                    hackathon={item.hackathon}
                    matchPercentage={item.matchPercentage}
                    reason={item.reason}
                  />
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-16 card">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No recommendations yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Complete your profile to get personalized hackathon recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
