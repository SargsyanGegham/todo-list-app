import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
// import { Task } from '../types';
import TaskItem from './TaskItem';
import { List, Button, Dialog, Box, Tabs, Tab, ListItem, } from '@mui/material';
import TaskForm from './TaskForm';
import { addTask, checkOverdueTasks, editTask } from '../store/slices/tasksSlice';
import CustomTabPanel from './CustomTabPanel';
import { a11yProps } from '../utils';

const initaialSelectedState = {title: '', description: '', deadline: ''}

interface Task {
  id?: string;
  title: string;
  description?: string;
  deadline?: string; // ISO string format
  status?: 'pending' | 'completed' | 'overdue' | 'removed';
}

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const {tasks, trash} = useSelector((state: RootState) => state.tasks);
  const [open, setOpen] = useState(false);
  const [activTab, setActivTab] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<Task>(initaialSelectedState);

  const handleAddClick = () => {
    setSelectedTask({ title: '', description: '', deadline: '' });
    setOpen(true);
  };

  const handleSetActivTab = (_: React.SyntheticEvent, tab: number) => {
    console.log(tab)
    setActivTab(tab);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(initaialSelectedState);
  };

  const handleSubmit = (values: any) => {
    if (selectedTask) {
      if ('id' in selectedTask) {
        dispatch(editTask({ ...selectedTask, ...values }));
      } else {
        dispatch(addTask(values));
      }
      dispatch(checkOverdueTasks());
    }
    handleClose();
  };
  
  useEffect(() => {
    dispatch(checkOverdueTasks());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Todo List</h1>
        <Button sx={{ height: '40px'}} variant="contained" color="primary" onClick={handleAddClick}>
          Add Task
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {selectedTask && (
          <TaskForm
            initialValues={selectedTask}
            onSubmit={handleSubmit}
            isEdit={!!selectedTask.title}
          />
        )}
      </Dialog>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
        <Tabs value={activTab} onChange={handleSetActivTab} aria-label="basic tabs example">
          <Tab label="List" {...a11yProps(0)} />
          <Tab label="Trash" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={activTab} index={0}>
        <List>
          {tasks.map(task => (
            <ListItem
              sx={{ boxShadow: 3}}
              key={activTab}
              disablePadding
            >
              <TaskItem key={task.id} task={task} onEdit={handleEdit} />
            </ListItem>
          ))}
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={activTab} index={1}>
        <List >
          {trash.map((task) => (
            <ListItem
             sx={{ boxShadow: 3}}
              key={activTab}
              disablePadding
            >
              <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          </ListItem>
          ))}
        </List>
      </CustomTabPanel>
    </div>
  );
};

export default TaskList;
