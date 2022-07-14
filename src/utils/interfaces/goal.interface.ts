
export interface Goal {
  id: number;
  title: string;
  dateCreation: Date;
  icon?: string;
  color?: string;
  tasks: Task[]
}

export interface Task {
  id: number;
  text: string;
  status: TaskState;
}

export type TaskState = 'ACTIVED' | 'DELETED' | 'COMPLETED';
