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

export interface Plan {
  id: string;
  goal: string;
  category: Category;
  createdAt: string;
  tasks: Task[];
}

