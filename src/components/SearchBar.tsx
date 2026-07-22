import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
  filters?: { label: string; value: string }[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search hackathons...',
  showFilters = false,
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg border transition-all duration-300 ${
            isFocused
              ? 'ring-2 ring-blue-500 border-transparent shadow-xl'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        >
          <Search className="absolute left-5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full py-4 pl-14 pr-32 bg-transparent rounded-2xl focus:outline-none text-slate-900 dark:text-white placeholder-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-28 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-premium"
          >
            Search
          </button>
        </div>
      </form>

      {showFilters && filters && onFilterChange && (
        <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
