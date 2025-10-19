
export interface Job {
  id: string;
  dateTime: string;
  title: string;
  description: string;
  location: string;
  applyLink?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  university: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
}

export interface CVData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}
