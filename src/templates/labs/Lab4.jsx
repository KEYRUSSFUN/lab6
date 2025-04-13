import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../reducers/counterSlice';

import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
} from '@mui/material';

const Lab4 = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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
        Лабораторная работа 4
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(decrement())}
        >
          −
        </Button>

        <Typography variant="h6" sx={{ minWidth: 40 }}>
          {count}
        </Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Stack>
    </Paper>
  );
};

export default Lab4;

