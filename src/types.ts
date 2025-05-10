export type Section = 'track' | 'tools' | 'team' | 'docs' | 'apis';

export interface User {
  name: string;
  role: string;
  department: string;
  progress: number;
  joinDate: string;
  avatar: string;
}

export interface UserContextType {
  user: User;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'mandatory' | 'technical' | 'soft-skills';
  status: 'completed' | 'in-progress' | 'not-started';
  progress: number;
  dueDate: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  downloadLink?: string;
  requiresLicense: boolean;
  licenseRequestStatus?: 'pending' | 'approved' | 'denied' | 'not-requested';
  category: 'development' | 'design' | 'communication' | 'project-management' | 'other';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  level: 'peer' | 'manager' | 'director' | 'executive';
  isDirectManager?: boolean;
}

export interface Api {
  id: string;
  name: string;
  description: string;
  documentation: string;
  category: 'internal' | 'external' | 'partner';
  status: 'active' | 'deprecated' | 'beta';
}

export interface Document {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'company' | 'technical' | 'process' | 'policy';
  isImportant: boolean;
}