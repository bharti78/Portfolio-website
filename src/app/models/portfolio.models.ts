export interface Bio {
  name: string;
  roles: string[];
  description: string;
  github: string;
  resume: string;
  linkedin: string;
  twitter: string;
  insta: string;
  facebook: string;
}

export interface Skill {
  name: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  img: string;
  role: string;
  company: string;
  date: string;
  desc: string;
  skills: string[];
  doc?: string;
}

export interface Education {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  webapp: string;
  category?: string;
}

export interface ContactForm {
  from_email: string;
  from_name: string;
  subject: string;
  message: string;
}
