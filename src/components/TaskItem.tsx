import React from 'react';
import { Task } from '../types';
import { useDispatch } from 'react-redux';
import { markTaskComplete, removeTask } from '../store/slices/tasksSlice';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(markTaskComplete(task.id));
  };

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <ListItem>
      <ListItemText
        primary={task.title}
        secondary={<span>{`Deadline: ${task.deadline || 'No deadline'}`}<br />{`Status: ${task.status}`}<br /><span className='ellipsis'>{`Description: ${task.description}`}</span></span>}
      />
      <ListItemSecondaryAction>
        {task.status === 'pending' && (
          <IconButton edge="end" aria-label="complete" onClick={handleComplete}>
            <CheckIcon />
          </IconButton>
        )}
        {task.status !== 'removed' &&
            <IconButton edge="end" aria-label="delete" onClick={() => onEdit(task)}>
                <EditIcon />
            </IconButton>
        }
        {task.status !== 'removed' &&
            <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
            <DeleteIcon />
            </IconButton>
        }
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
