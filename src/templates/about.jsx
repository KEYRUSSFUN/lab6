import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const About = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Информация обо мне
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Меня зовут <strong>Александр</strong>.
        </Typography>
        <Typography variant="body1">
          Мне 24 года, я студент <strong>3 курса</strong> АлтГУ.
        </Typography>
        <Typography variant="body1">
          Изучаю программирование и создаю современные веб-приложения.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;