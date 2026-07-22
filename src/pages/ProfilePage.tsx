import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { skillsList, interestsList } from '../data/mockData';
import {
  User,
  Mail,
  Code,
  Heart,
  TrendingUp,
  Edit2,
  Save,
  X,
  Award,
  Trophy,
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, isLoggedIn, updateUser, savedHackathons } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    skills: user?.skills || [],
    interests: user?.interests || [],
    experienceLevel: user?.experienceLevel || 'Intermediate',
  });

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-800 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-slate-500/30 animate-float">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Access Your Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Sign in to view and edit your profile, skills, and preferences.
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

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      skills: user.skills,
      interests: user.interests,
      experienceLevel: user.experienceLevel,
    });
    setIsEditing(false);
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="min-h-screen bg-mesh pt-20 pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=fff&color=2563eb&size=120`}
                alt={user.name}
                className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl object-cover"
              />
              {isEditing && (
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center border-4 border-white">
                  <Edit2 className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-slate-300 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur text-white rounded-lg text-sm">
                  {user.experienceLevel} Developer
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur text-white rounded-lg text-sm">
                  {savedHackathons.length} Saved Events
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Edit Controls */}
        <div className="flex justify-end mb-6">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-600"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Basic Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-slate-800 dark:text-white font-medium">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Experience Level
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.experienceLevel}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          experienceLevel: e.target.value as typeof user.experienceLevel,
                        })
                      }
                      className="input-field"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold ${
                        user.experienceLevel === 'Beginner'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : user.experienceLevel === 'Intermediate'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {user.experienceLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Skills', value: user.skills.length, color: 'blue' },
                  { label: 'Interests', value: user.interests.length, color: 'violet' },
                  { label: 'Saved', value: savedHackathons.length, color: 'emerald' },
                  { label: 'Participated', value: 5, color: 'purple' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-center`}
                    style={{ backgroundColor: stat.color === 'blue' ? '#eff6ff' : stat.color === 'violet' ? '#f5f3ff' : stat.color === 'emerald' ? '#ecfdf5' : '#faf5ff' }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: stat.color === 'blue' ? '#2563eb' : stat.color === 'violet' ? '#7c3aed' : stat.color === 'emerald' ? '#059669' : '#9333ea' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Achievements</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">First Hackathon</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Participated in your first event</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl opacity-60">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-500 dark:text-slate-400">Top 10 Finish</div>
                    <div className="text-sm text-slate-400 dark:text-slate-500">Achieve a top 10 placement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Skills</h2>
              </div>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {skillsList.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                        formData.skills.includes(skill)
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interests */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Interests</h2>
              </div>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {interestsList.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-xl text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
