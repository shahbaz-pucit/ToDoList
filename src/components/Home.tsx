import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './Tasklist'; // Ensure this import path is correct
import { Grid2, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        width: '100vw'
      }}
    >
      <Grid2
        container
        spacing={17} // Space between TaskForm and TaskList
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid2 > {/* Grid2 usage without item prop */}
          <TaskForm />
        </Grid2>
        <Grid2 > {/* Grid2 usage without item prop */}
          <TaskList />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;