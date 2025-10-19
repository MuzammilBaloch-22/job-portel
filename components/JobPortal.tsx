
import React, { useState, useMemo, useEffect } from 'react';
import { jobListings } from '../constants';
import type { Job } from '../types';
import JobCard from './JobCard';
import { Search, MapPin, Calendar, RefreshCw, X } from './icons';

const JobPortal: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(jobListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const uniqueLocations = useMemo(() => {
    const locations = new Set(jobListings.map(job => job.location));
    return Array.from(locations);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = location ? job.location === location : true;
      
      if (!dateFilter) return matchesSearch && matchesLocation;

      const jobDate = new Date(job.dateTime);
      const now = new Date();
      let hoursAgo = 24;
      if (dateFilter === 'week') hoursAgo = 24 * 7;
      if (dateFilter === 'month') hoursAgo = 24 * 30;
      
      const filterDate = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

      return matchesSearch && matchesLocation && jobDate >= filterDate;
    });
  }, [jobs, searchTerm, location, dateFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate fetching new data by shuffling
      setJobs(prevJobs => [...prevJobs].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 1000);
  };
  
  const clearFilters = () => {
      setSearchTerm('');
      setLocation('');
      setDateFilter('');
  };

  const hasActiveFilters = searchTerm || location || dateFilter;

  return (
    <div className="space-y-8">
      <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium text-slate-400 mb-1">Job Title</label>
            <Search className="absolute left-3 top-9 h-5 w-5 text-slate-500" />
            <input
              id="search"
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
          {/* Location Filter */}
          <div className="relative">
            <label htmlFor="location" className="block text-sm font-medium text-slate-400 mb-1">Location</label>
            <MapPin className="absolute left-3 top-9 h-5 w-5 text-slate-500" />
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all appearance-none"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          {/* Date Filter */}
          <div className="relative">
            <label htmlFor="date" className="block text-sm font-medium text-slate-400 mb-1">Date Posted</label>
            <Calendar className="absolute left-3 top-9 h-5 w-5 text-slate-500" />
            <select
              id="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all appearance-none"
            >
              <option value="">Any Time</option>
              <option value="day">Past 24 hours</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
            </select>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2">
            {hasActiveFilters && (
                 <button onClick={clearFilters} className="flex-1 flex items-center justify-center gap-2 bg-slate-600/50 hover:bg-slate-500/50 text-slate-300 font-semibold py-2 px-4 rounded-md transition-all duration-300">
                    <X className="w-4 h-4" /> Clear
                </button>
            )}
            <button onClick={handleRefresh} disabled={isRefreshing} className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/80 hover:bg-cyan-400 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl font-bold text-slate-300">No Jobs Found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPortal;
