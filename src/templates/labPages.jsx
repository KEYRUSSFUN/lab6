import { useParams } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import Lab2 from './labs/Lab2';
import Lab3 from './labs/Lab3';
import Lab4 from './labs/Lab4';

const Lab1 = () => <Typography>Контент лабораторной 1</Typography>;

const labComponents = {
  1: Lab1,
  2: Lab2,
  3: Lab3,
  4: Lab4,
};

const LabPage = () => {
  const { id } = useParams();
  const LabComponent = labComponents[id];

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1550px', mx: 'auto', mt: 4 }}>
      {LabComponent ? (
        <LabComponent />
      ) : (
        <Typography variant="body1" color="error">
          Лабораторная работа не найдена
        </Typography>
      )}
    </Container>
  );
};

export default LabPage;