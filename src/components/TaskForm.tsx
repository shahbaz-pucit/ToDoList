import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../store/TaskSlice';
import { TextField, Button, Box, Typography } from '@mui/material';

interface TaskFormProps {
  taskToEdit?: { id: number; title: string; description: string };
  onSave?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onSave }) => {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (taskToEdit) {
      dispatch(editTask({ id: taskToEdit.id, title, description, completed: false }));
    } else {
      dispatch(addTask({ id: Date.now(), title, description, completed: false }));
    }
    setTitle('');
    setDescription('');
    if (onSave) onSave();
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: '400px',
        maxWidth: '600px', // Adjust the max-width of the form container
        margin: '0 auto', // Center the form horizontally
        padding: 3, // Add padding inside the form
        backgroundColor: 'white', // Ensure it has a white background
        boxShadow: 3, // Add shadow for depth
        borderRadius: 2, // Rounded corners
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {taskToEdit ? 'Edit Task' : 'Add New Task'}
      </Typography>

      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        sx={{
          width: '100%', // Take full width inside the container
        }}
      />
      <TextField
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={4}
        fullWidth
        sx={{
          width: '100%',
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 0', // More padding for a larger button
          fontSize: '16px',
          width: '100%', // Full-width button
        }}
      >
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;
