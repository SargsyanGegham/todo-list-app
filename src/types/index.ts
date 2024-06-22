export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: string; // ISO string format
    status: 'pending' | 'completed' | 'overdue' | 'removed';
  }
  