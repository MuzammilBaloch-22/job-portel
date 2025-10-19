
import React from 'react';
import type { CVData } from '../types';
import { Mail, Phone, Linkedin, Link as LinkIcon, Briefcase, GraduationCap, Code } from './icons';

interface CvPreviewProps {
  cvData: CVData;
}

const CvPreview: React.FC<CvPreviewProps> = ({ cvData }) => {
  return (
    <div id="cv-preview" className="bg-gradient-to-br from-slate-900 via-slate-900 to-gray-900 text-white font-sans shadow-2xl shadow-purple-500/10 rounded-lg overflow-hidden border border-slate-700">
      <div className="p-8">
        {/* Header */}
        <header className="text-center border-b-2 border-cyan-500/20 pb-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text tracking-tight">
            {cvData.name || 'Your Name'}
          </h1>
          <div className="mt-4 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <a href={`mailto:${cvData.email}`} className="flex items-center gap-2 hover:text-cyan-300 transition-colors"><Mail className="w-4 h-4" />{cvData.email}</a>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" />{cvData.phone}</span>
            <a href={`https://` + cvData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors"><Linkedin className="w-4 h-4" />{cvData.linkedin}</a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Left Column */}
          <aside className="md:col-span-1 space-y-6">
            <section>
              <h2 className="section-title"><GraduationCap className="w-5 h-5" /> Education</h2>
              {cvData.education.map(edu => (
                <div key={edu.id} className="mt-3">
                  <h3 className="font-semibold text-slate-100">{edu.degree}</h3>
                  <p className="text-sm text-slate-300">{edu.university}</p>
                  <p className="text-xs text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </section>
            <section>
              <h2 className="section-title"><Code className="w-5 h-5" /> Skills</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {cvData.skills.map((skill, index) => skill && (
                  <span key={index} className="bg-cyan-500/10 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full border border-cyan-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </aside>

          {/* Right Column */}
          <main className="md:col-span-2 space-y-6">
             <section>
                <h2 className="section-title"><Briefcase className="w-5 h-5"/> Summary</h2>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">{cvData.summary}</p>
            </section>
            <section>
              <h2 className="section-title"><Briefcase className="w-5 h-5" /> Experience</h2>
              {cvData.experience.map(exp => (
                <div key={exp.id} className="mt-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-100">{exp.title}</h3>
                    <p className="text-xs text-slate-400">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-sm text-cyan-300 font-medium">{exp.company}</p>
                  <p className="text-sm text-slate-300 mt-2 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </section>
            <section>
              <h2 className="section-title"><Code className="w-5 h-5" /> Projects</h2>
              {cvData.projects.map(proj => (
                <div key={proj.id} className="mt-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-100">{proj.name}</h3>
                    {proj.link && (
                        <a href={`https://`+proj.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            <LinkIcon className="w-4 h-4" />
                        </a>
                    )}
                   </div>
                  <p className="text-sm text-slate-300 mt-1">{proj.description}</p>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
       <style jsx global>{`
          .section-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.25rem;
            font-weight: 700;
            color: #a5f3fc;
            border-bottom: 1px solid rgb(56 189 248 / 0.2);
            padding-bottom: 0.5rem;
            text-shadow: 0 0 8px rgb(56 189 248 / 0.3);
          }
        `}</style>
    </div>
  );
};

export default CvPreview;
