import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Hackathon } from '../types';
import {
  DollarSign,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Globe,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface HackathonCardProps {
  hackathon: Hackathon;
  matchPercentage?: number;
  reason?: string;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  matchPercentage,
  reason,
}) => {
  const { isSaved, saveHackathon, unsaveHackathon, isLoggedIn } = useApp();
  const saved = isSaved(hackathon.id);

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysRemaining = getDaysRemaining(hackathon.registrationDeadline);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      unsaveHackathon(hackathon.id);
    } else {
      saveHackathon(hackathon.id);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
      {/* Match Percentage Bar */}
      {matchPercentage !== undefined && (
        <div className="relative h-12 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px] animate-shimmer" />
          <div className="relative px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">
                <span className="text-xl">{matchPercentage}%</span>
                <span className="ml-1 text-sm font-normal text-blue-100">Match</span>
              </span>
            </div>
            <div className="w-28 bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
              hackathon.isOnline
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            }`}
          >
            {hackathon.isOnline ? (
              <>
                <Globe className="w-3 h-3" />
                Online
              </>
            ) : (
              <>
                <MapPin className="w-3 h-3" />
                {hackathon.location}
              </>
            )}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
              hackathon.difficulty === 'Beginner'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : hackathon.difficulty === 'Intermediate'
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {hackathon.difficulty}
          </span>
        </div>

        {/* Title */}
        <Link to={`/hackathon/${hackathon.id}`}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
            {hackathon.name}
          </h3>
        </Link>

        {/* Theme */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {hackathon.theme}
        </p>

        {/* AI Reason */}
        {reason && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              {reason}
            </p>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Deadline</div>
              <div className={`font-semibold ${daysRemaining <= 7 ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {daysRemaining > 0 ? `${daysRemaining} days` : 'Passed'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Prize</div>
              <div className="font-semibold text-slate-700 dark:text-slate-300">{hackathon.prizePool}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {hackathon.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg"
            >
              {tag}
            </span>
          ))}
          {hackathon.tags.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-500 text-xs font-medium rounded-lg">
              +{hackathon.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/hackathon/${hackathon.id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 btn-premium"
          >
            View Details
          </Link>
          <button
            onClick={handleSaveToggle}
            disabled={!isLoggedIn}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 ${
              saved
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                : isLoggedIn
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
            }`}
            title={saved ? 'Remove from Saved' : 'Save Event'}
          >
            {saved ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
