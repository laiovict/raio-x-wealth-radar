
import { DataSourceType } from './raioXTypes';

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string; // ISO date string
  priority: 'high' | 'medium' | 'low';
  category: GoalCategory;
  monthlyContribution: number;
  progress: number; // 0-100
  achievable: boolean;
  requiredReturn: number;
  notes?: string;
  dataSource: DataSourceType;
}

export type GoalCategory = 
  | 'emergency'
  | 'housing'
  | 'education'
  | 'retirement'
  | 'travel'
  | 'vehicle'
  | 'business'
  | 'other';

export interface GoalsSummary {
  totalGoals: number;
  achievableGoals: number;
  totalRequired: number;
  totalSaved: number;
  highestPriority: FinancialGoal | null;
  nearestDeadline: FinancialGoal | null;
  dataSource: DataSourceType;
}

// Define the action interface for consistency
export interface Action {
  id: string;
  title: string;
  description: string;
  potentialImpact?: string;
  urgency?: string;
  iconType: string;
  iconColor: string;
  dataSource?: string;
}

// Define the action status for consistency
export interface ActionStatus {
  id: string;
  label: string;
  status: string;
}
