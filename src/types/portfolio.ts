export type ProjectStatus = 'Live' | 'In Development' | 'Completed'

export type ProjectType = 'Client' | 'Personal'

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

export interface SkillGroup {
  label: string
  color: string
  icon: string
  span?: string
  skills: string[]
}

export interface Experience {
  company: string
  role: string
  duration: string
  description: string
}

export interface Education {
  degree: string
  course: string
  status: 'Completed' | 'Ongoing' | string
  time: string
  institution: string
}

export interface Contact {
  email: string
  linkedin: string
  github: string
  mobile: string
  portfolio: string
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
  skills: {
    groups: SkillGroup[]
    proficiencies: Record<string, number>
  }
  experience: Experience[]
  education: Education[]
  achievements: string[]
  interests: string[]
  contact: Contact
  timeline: TimelineItem[]
}