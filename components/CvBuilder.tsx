
import React, { useState, useCallback } from 'react';
import type { CVData, Experience, Education, Project } from '../types';
import CvPreview from './CvPreview';
import { Plus, Trash2, Download } from './icons';

// These props could be in their own components, but are defined here for simplicity
interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
    {type === 'textarea' ? (
      <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={4} className="form-input" />
    ) : (
      <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="form-input" />
    )}
  </div>
);

const initialCVData: CVData = {
  name: 'Your Name',
  email: 'your.email@example.com',
  phone: '+1 234 567 890',
  linkedin: 'linkedin.com/in/yourprofile',
  summary: 'A brief professional summary about yourself, highlighting your key skills and career goals.',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  experience: [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp', startDate: '2022-01', endDate: 'Present', description: 'Developed and maintained web applications using modern technologies.' }
  ],
  education: [
    { id: 1, degree: 'B.Sc. in Computer Science', university: 'State University', startDate: '2018-09', endDate: '2022-05' }
  ],
  projects: [
    { id: 1, name: 'AI Job Portal', description: 'A responsive job portal with CV generation capabilities.', link: 'github.com/your/repo' }
  ],
};

const CvBuilder: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDynamicChange = <T,>(section: keyof CVData, index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => {
      const newSection = [...(prev[section] as T[])];
      newSection[index] = { ...newSection[index], [name]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addDynamicItem = <T,>(section: keyof CVData, newItem: T) => {
    setCvData(prev => ({ ...prev, [section]: [...(prev[section] as T[]), newItem] }));
  };

  const removeDynamicItem = (section: keyof CVData, index: number) => {
    setCvData(prev => ({ ...prev, [section]: (prev[section] as any[]).filter((_, i) => i !== index) }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const skills = e.target.value.split(',').map(skill => skill.trim());
      setCvData(prev => ({...prev, skills }));
  };
  
  const handleDownload = () => {
    const cvElement = document.getElementById('cv-preview');
    if (cvElement && (window as any).html2canvas && (window as any).jspdf) {
      (window as any).html2canvas(cvElement, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new (window as any).jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('cv.pdf');
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-6 h-fit">
        <h2 className="text-2xl font-bold text-white">CV Builder</h2>
        {/* Personal Details */}
        <div className="form-section">
          <h3 className="form-section-title">Personal Details</h3>
          <FormInput label="Full Name" name="name" value={cvData.name} onChange={handleChange} />
          <FormInput label="Email" name="email" value={cvData.email} onChange={handleChange} type="email" />
          <FormInput label="Phone" name="phone" value={cvData.phone} onChange={handleChange} />
          <FormInput label="LinkedIn" name="linkedin" value={cvData.linkedin} onChange={handleChange} />
        </div>

        {/* Summary */}
        <div className="form-section">
            <h3 className="form-section-title">Professional Summary</h3>
            <FormInput label="Summary" name="summary" value={cvData.summary} onChange={handleChange} type="textarea" />
        </div>
        
        {/* Skills */}
        <div className="form-section">
            <h3 className="form-section-title">Skills</h3>
            <FormInput label="Skills (comma separated)" name="skills" value={cvData.skills.join(', ')} onChange={handleSkillsChange} />
        </div>

        {/* Experience */}
        <div className="form-section">
          <h3 className="form-section-title">Experience</h3>
          {cvData.experience.map((exp, index) => (
            <div key={exp.id} className="dynamic-item">
              <input type="text" name="title" value={exp.title} onChange={(e) => handleDynamicChange<Experience>('experience', index, e)} placeholder="Job Title" className="form-input" />
              <input type="text" name="company" value={exp.company} onChange={(e) => handleDynamicChange<Experience>('experience', index, e)} placeholder="Company" className="form-input mt-2" />
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <input type="month" name="startDate" value={exp.startDate} onChange={(e) => handleDynamicChange<Experience>('experience', index, e)} placeholder="Start Date" className="form-input" />
                 <input type="month" name="endDate" value={exp.endDate} onChange={(e) => handleDynamicChange<Experience>('experience', index, e)} placeholder="End Date" className="form-input" />
              </div>
              <textarea name="description" value={exp.description} onChange={(e) => handleDynamicChange<Experience>('experience', index, e)} placeholder="Description" rows={3} className="form-input mt-2" />
              <button onClick={() => removeDynamicItem('experience', index)} className="remove-button"><Trash2 className="w-4 h-4" /> Remove</button>
            </div>
          ))}
          <button onClick={() => addDynamicItem<Experience>('experience', { id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '' })} className="add-button"><Plus className="w-4 h-4" /> Add Experience</button>
        </div>
        
        {/* Education */}
        <div className="form-section">
            <h3 className="form-section-title">Education</h3>
            {cvData.education.map((edu, index) => (
                <div key={edu.id} className="dynamic-item">
                    <input type="text" name="degree" value={edu.degree} onChange={(e) => handleDynamicChange<Education>('education', index, e)} placeholder="Degree" className="form-input"/>
                    <input type="text" name="university" value={edu.university} onChange={(e) => handleDynamicChange<Education>('education', index, e)} placeholder="University" className="form-input mt-2"/>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <input type="month" name="startDate" value={edu.startDate} onChange={(e) => handleDynamicChange<Education>('education', index, e)} placeholder="Start Date" className="form-input" />
                        <input type="month" name="endDate" value={edu.endDate} onChange={(e) => handleDynamicChange<Education>('education', index, e)} placeholder="End Date" className="form-input" />
                    </div>
                     <button onClick={() => removeDynamicItem('education', index)} className="remove-button"><Trash2 className="w-4 h-4"/> Remove</button>
                </div>
            ))}
            <button onClick={() => addDynamicItem<Education>('education', {id: Date.now(), degree: '', university: '', startDate: '', endDate: ''})} className="add-button"><Plus className="w-4 h-4"/> Add Education</button>
        </div>

        {/* Projects */}
        <div className="form-section">
            <h3 className="form-section-title">Projects</h3>
            {cvData.projects.map((proj, index) => (
                 <div key={proj.id} className="dynamic-item">
                     <input type="text" name="name" value={proj.name} onChange={(e) => handleDynamicChange<Project>('projects', index, e)} placeholder="Project Name" className="form-input"/>
                     <input type="text" name="description" value={proj.description} onChange={(e) => handleDynamicChange<Project>('projects', index, e)} placeholder="Description" className="form-input mt-2"/>
                     <input type="text" name="link" value={proj.link} onChange={(e) => handleDynamicChange<Project>('projects', index, e)} placeholder="Project Link" className="form-input mt-2"/>
                     <button onClick={() => removeDynamicItem('projects', index)} className="remove-button"><Trash2 className="w-4 h-4"/> Remove</button>
                 </div>
            ))}
             <button onClick={() => addDynamicItem<Project>('projects', {id: Date.now(), name: '', description: '', link: ''})} className="add-button"><Plus className="w-4 h-4"/> Add Project</button>
        </div>
        
      </div>
      
      {/* Preview Section */}
      <div className="lg:sticky lg:top-24 h-fit">
        <CvPreview cvData={cvData} />
        <button onClick={handleDownload} className="mt-4 w-full flex items-center justify-center gap-2 bg-cyan-500/80 hover:bg-cyan-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30">
          <Download className="w-5 h-5" /> Download CV as PDF
        </button>
      </div>
       <style jsx global>{`
          .form-input {
            width: 100%;
            background-color: rgb(51 65 85 / 0.5);
            border: 1px solid rgb(71 85 105);
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            color: white;
            transition: all 0.2s;
          }
          .form-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px #06b6d4;
            border-color: #06b6d4;
          }
          .form-section {
            border-bottom: 1px solid rgb(71 85 105);
            padding-bottom: 1.5rem;
            space-y-4;
          }
          .form-section-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #67e8f9;
            margin-bottom: 1rem;
          }
          .dynamic-item {
            background-color: rgb(30 41 59 / 0.7);
            border: 1px solid rgb(51 65 85);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          .add-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            justify-content: center;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            background-color: rgb(30 64 175 / 0.5);
            color: #93c5fd;
            font-weight: 500;
            transition: all 0.2s;
          }
          .add-button:hover {
            background-color: rgb(30 64 175 / 0.8);
            color: white;
          }
          .remove-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.75rem;
            padding: 0.25rem 0.75rem;
            border-radius: 0.375rem;
            background-color: rgb(153 27 27 / 0.5);
            color: #fca5a5;
            font-size: 0.875rem;
            transition: all 0.2s;
          }
          .remove-button:hover {
            background-color: rgb(153 27 27 / 0.8);
            color: white;
          }
        `}</style>
    </div>
  );
};

export default CvBuilder;
