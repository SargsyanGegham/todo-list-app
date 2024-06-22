// src/features/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface TasksState {
  tasks: Task[];
  trash: Task[];
}

const initialState: TasksState = {
  tasks: [],
  trash: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'status'>>) => {
      const newTask: Task = {
        id: uuidv4(),
        ...action.payload,
        status: 'pending',
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task);
 
    },
    removeTask: (state, action: PayloadAction<string>) => {
        const removedItem = state.tasks.find((i: Task) => i.id === action.payload)
        state.tasks = state.tasks.filter((i: Task) => i.id !== action.payload);
        if (removedItem)
            state.trash = [...state.trash, { ...removedItem, status: 'removed'}]
    },
    markTaskComplete: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status === 'pending') {
        state.tasks[index].status = 'completed';
      }
    },
    checkOverdueTasks: (state) => {
      const currentDate = new Date().toISOString().split('T')[0];;
      state.tasks = state.tasks.map(task => {
        if (task.deadline && new Date(task.deadline).toISOString() < currentDate && task.status === 'pending') {
            console.log(task.deadline, currentDate)
          task.status = 'overdue';
        }
        return task;
      });
    },
  },
});

export const { addTask, editTask, removeTask, markTaskComplete, checkOverdueTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
