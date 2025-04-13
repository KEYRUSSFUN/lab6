import React from 'react';
import { useForm } from 'react-hook-form';
import FeedbackList from './feedbackList';
import { useDispatch } from 'react-redux';
import { createFeedbackAsync } from '../reducers/feedback';

import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  styled,
} from '@mui/material';

const FormInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const FormTextArea = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const FormButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#28a745',
  color: 'white',
  padding: theme.spacing(1.25, 2),
  borderRadius: '4px',
  width: '100%',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#218838',
  },
}));

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(
        createFeedbackAsync({
          email: data.email,
          message: data.message,
          date: new Date().toLocaleDateString() + '',
        })
      ).unwrap();
      reset();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1000px', mx: 'auto', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Форма обратной связи
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
        <FormInput
          type="email"
          label="Email"
          variant="outlined"
          size="small"
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email',
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <FormTextArea
          label="Ваш отзыв"
          variant="outlined"
          size="small"
          multiline
          rows={4}
          {...register('message', {
            required: 'Отзыв обязателен',
            minLength: {
              value: 3,
              message: 'Отзыв должен содержать не менее 3 символов',
            },
          })}
          error={Boolean(errors.message)}
          helperText={errors.message?.message}
        />

        <FormButton type="submit" variant="contained">
          Отправить
        </FormButton>
      </Box>

      <Box mt={4}>
        <FeedbackList />
      </Box>
    </Container>
  );
};

export default FeedbackForm;