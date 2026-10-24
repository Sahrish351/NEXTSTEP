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
  type: 'created' | 'completed' | 'uncompleted' | 'edited' | 'goal_updated';
  message: string;
}

export interface Plan {
  id: string;
  goal: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  activities: ActivityLog[];
}

export type ViewType = 
  | 'landing'
  | 'overview'
  | 'plans'
  | 'today'
  | 'progress'
  | 'settings'
  | 'create';
