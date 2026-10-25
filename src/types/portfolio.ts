export type ProjectStatus = 'Live' | 'In Development' | 'Completed'

export type ProjectType = 'Client' | 'Personal'

export type KnowledgeLevel = 'Hands-on' | 'Working knowledge' | 'Foundational'

export interface Project {
  title: string
  industry: string
  challenge: string
  solution: string
  technologies: string[]
  features: string[]
  status: ProjectStatus
  placeholder?: boolean
  type: ProjectType
  code?: string
  link?: string
}

export interface TechnicalSkill {
  name: string
  level?: KnowledgeLevel
  evidence?: string
}

export interface SkillCategory {
  id: string
  label: string
  description: string
  color: string
  icon: string
  skills: TechnicalSkill[]
}

export interface EngineeringCapability {
  title: string
  description: string
  icon: string
  relatedProject?: string
}

export interface PersonalItem {
  title: string
  description: string
  icon: string
}

export interface Skills {
  categories: SkillCategory[]
  capabilities: EngineeringCapability[]
  strengths: PersonalItem[]
  interests: PersonalItem[]
}

export interface Experience {
  company: string
  role: string
  duration: string
  description?: string
  highlights?: string[]
  location?: string
  employmentType?: string
  current?: boolean
}

export interface Education {
  degree: string
  course: string
  mode?: string
  status: 'Completed' | 'Ongoing' | string
  time: string
  institution: string
  score?: string
  highlights?: string[]
}

export interface Contact {
  email: string
  linkedin: string
  github: string
  mobile: string
  resume?: string
  portfolio?: string
}

export interface Metric {
  label: string
  value: string
}

export type TimelineCategory =
  | 'Education'
  | 'Experience'
  | 'Certification'
  | 'Training'
  | 'Projects'

export type TimelineStatus = 'Completed' | 'Ongoing' | 'Certified' | 'Active'

export interface TimelineItem {
  period: string
  title: string
  organization: string
  category: TimelineCategory
  status: TimelineStatus
  description: string
  tags: string[]
  metrics: Metric[]
}

export interface Landing {
  title: string
  subtitle: string
  roles: string[]
  description: string
  highlights: string[]
  cta: {
    contact: string
    projects: string
  }
}

export interface Portfolio {
  name: string
  title: string
  summary: string
  subsummary: string
  landing: Landing
  projects: Project[]
  skills: Skills
  experience: Experience[]
  education: Education[]
  achievements: string[]
  contact: Contact
  timeline: TimelineItem[]
}
