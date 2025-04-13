import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';

function Lab2({ text }) {
  const [counter, setCount] = useState(0);

  const incrementCount = () => {
    setCount(counter + 1);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom color="primary">
        Лабораторная работа 2
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Счётчик: {counter}
      </Typography>

      <Button variant="contained" onClick={incrementCount}>
        {text}
      </Button>
    </Paper>
  );
}

export default Lab2;