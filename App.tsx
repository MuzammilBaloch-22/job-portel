
import React, { useState } from 'react';
import Header from './components/Header';
import JobPortal from './components/JobPortal';
import CvBuilder from './components/CvBuilder';

type View = 'jobs' | 'cv';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('jobs');

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-slate-100">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto px-4 py-8">
        {activeView === 'jobs' ? <JobPortal /> : <CvBuilder />}
      </main>
    </div>
  );
};

export default App;
