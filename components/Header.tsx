
import React from 'react';
import { Briefcase, FileText, Zap } from './icons';

type View = 'jobs' | 'cv';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const navButtonClasses = "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300";
  const activeClasses = "bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.4)]";
  const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-white";

  return (
    <header className="sticky top-0 z-10 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Zap className="w-6 h-6 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            AI Job Portal
          </span>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveView('jobs')}
            className={`${navButtonClasses} ${activeView === 'jobs' ? activeClasses : inactiveClasses}`}
          >
            <Briefcase className="w-5 h-5" />
            Jobs
          </button>
          <button
            onClick={() => setActiveView('cv')}
            className={`${navButtonClasses} ${activeView === 'cv' ? activeClasses : inactiveClasses}`}
          >
            <FileText className="w-5 h-5" />
            CV Builder
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
