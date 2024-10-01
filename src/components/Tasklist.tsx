import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleCompleteTask, deleteTask } from '../store/TaskSlice';
import { List, ListItem, ListItemText, Checkbox, IconButton, Box, Typography, Dialog, Tabs, Tab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskForm from './TaskForm'; // Import TaskForm

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  
  const [taskToEdit, setTaskToEdit] = useState<{ id: number; title: string; description: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Filter state

  const handleToggleComplete = (id: number) => {
    dispatch(toggleCompleteTask(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: { id: number; title: string; description: string }) => {
    setTaskToEdit(task);
    setIsDialogOpen(true); // Open the popup dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the popup dialog
    setTaskToEdit(null); // Reset taskToEdit
  };

  // Filter tasks based on the current filter state
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all' filter shows all tasks
  });

  // Handle tab change for filter
  const handleFilterChange = (_: React.SyntheticEvent, newFilter: string) => {
    setFilter(newFilter);
  };
  

  return (
    <Box
      sx={{
        minWidth: '500px',
        maxWidth: '600px',
        margin: '2px auto',
        padding: 2,
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        height: '380px', // Increased height slightly for filters
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" align="center" color='black' gutterBottom>
        Task List
      </Typography>

      {/* Filter tabs */}
      <Tabs
        value={filter}
        onChange={handleFilterChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{
          marginBottom: 2,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Tab style={{outline:'none'}} label="All" value="all" />
        <Tab style={{outline:'none'}} label="Completed" value="completed" />
        <Tab style={{outline:'none'}} label="Pending" value="pending" />
      </Tabs>

      {filteredTasks.length === 0 ? (
        <Typography align="center" color="textSecondary">
          No tasks available
        </Typography>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <>
                  <IconButton style={{ marginRight: '5px' }} edge="end" onClick={() => handleEdit(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: (theme) => theme.palette.text.primary,
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Popup Modal for Editing Task */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <TaskForm taskToEdit={taskToEdit!} onSave={handleCloseDialog} />
      </Dialog>
    </Box>
  );
};

export default TaskList;
