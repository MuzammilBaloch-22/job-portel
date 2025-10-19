
import React from 'react';
import type { Job } from '../types';
import { MapPin, Calendar, ExternalLink } from './icons';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-5 flex flex-col h-full group transition-all duration-300 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{job.title}</h3>
        <p className="text-slate-400 mt-2 text-sm">{job.description}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{timeAgo(job.dateTime)}</span>
          </div>
        </div>
      </div>
      {job.applyLink && (
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-cyan-500/80 text-cyan-300 hover:text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
        >
          Apply Now <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

export default JobCard;
