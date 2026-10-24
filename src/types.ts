export type Category = 
  | 'Study'
  | 'Career'
  | 'Skill Building'
  | 'Personal Project'
  | 'Other';

export interface Task {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'created' | 'completed' | 'uncompleted' | 'edited' | 'goal_updated' | 'reflection_saved';
  message: string;
}

export interface Reflection {
  id: string;
  date: string;
  wentWell: string;
  hardestPart: string;
  blockers: string;
  changeNextTime: string;
  nextAction: string;
}

export interface Plan {
  id: string;
  goal: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  activities: ActivityLog[];
  reflections: Reflection[];
}

export interface GoalExample {
  id: string;
  title: string;
  category: Category;
  description: string;
  targetAudience: string;
  firstStep: string;
  imageKey: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export type ViewType = 
  | 'home'
  | 'overview'
  | 'plans'
  | 'today'
  | 'explore'
  | 'builder'
  | 'progress'
  | 'reflection'
  | 'inspiration'
  | 'achievements'
  | 'settings'
  | 'about';
