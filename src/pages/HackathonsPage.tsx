import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import HackathonCard from '../components/HackathonCard';
import { Grid, List, SlidersHorizontal, Trophy } from 'lucide-react';

const HackathonsPage: React.FC = () => {
  const { allHackathons } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'deadline' | 'prize' | 'name'>('deadline');

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  const filteredHackathons = useMemo(() => {
    let result = [...allHackathons];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        h =>
          h.name.toLowerCase().includes(query) ||
          h.theme.toLowerCase().includes(query) ||
          h.skills.some((s: string) => s.toLowerCase().includes(query)) ||
          h.tags.some((t: string) => t.toLowerCase().includes(query))
      );
    }

    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'online':
          result = result.filter(h => h.isOnline);
          break;
        case 'offline':
          result = result.filter(h => !h.isOnline);
          break;
        case 'beginner':
          result = result.filter(h => h.difficulty === 'Beginner');
          break;
        case 'intermediate':
          result = result.filter(h => h.difficulty === 'Intermediate');
          break;
        case 'advanced':
          result = result.filter(h => h.difficulty === 'Advanced');
          break;
      }
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
        case 'prize':
          const prizeA = parseInt(a.prizePool.replace(/[^0-9]/g, '')) || 0;
          const prizeB = parseInt(b.prizePool.replace(/[^0-9]/g, '')) || 0;
          return prizeB - prizeA;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [allHackathons, searchQuery, activeFilter, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-mesh pt-20">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">Explore</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Hackathons
          </h1>
          <p className="text-blue-100 max-w-2xl mb-6">
            Find the perfect hackathon for your skills and interests. Filter by mode, difficulty, and more.
          </p>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by name, theme, or skills..."
            showFilters
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredHackathons.length}</span>{' '}
            hackathons
            {searchQuery && (
              <span>
                {' '}
                for "<span className="text-blue-600 dark:text-blue-400 font-medium">{searchQuery}</span>"
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="deadline">By Deadline</option>
                <option value="prize">By Prize</option>
                <option value="name">By Name</option>
              </select>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hackathon Grid */}
        {filteredHackathons.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredHackathons.map((hackathon, index) => (
              <div
                key={hackathon.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <HackathonCard hackathon={hackathon} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <SlidersHorizontal className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No hackathons found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Try adjusting your search or filters to find hackathons.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setSearchParams({});
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonsPage;
