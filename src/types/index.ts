export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  category: string;
  description: string;
  features: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPrimary?: boolean;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  sublabel: string;
  url: string;
  icon: string;
}
