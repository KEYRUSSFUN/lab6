import React from 'react';
import { useForm } from 'react-hook-form';
import FeedbackList from './feedbackList';
import { useCreateFeedbackMutation } from '../reducers/feedback';
import { useFetchProfileQuery } from '../reducers/user';
import { useFetchFeedbackQuery } from '../reducers/feedback';
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


  const { data: profile, error: profileError, isLoading: isProfileLoading } = useFetchProfileQuery();
  const {refetch: refetchFeedbacks } = useFetchFeedbackQuery();
  const [createFeedback] = useCreateFeedbackMutation(); 


  if (isProfileLoading) {
    return <Typography>Загрузка профиля...</Typography>;
  }

  if (profileError) {
    return <Typography>Ошибка загрузки профиля: {profileError.message}</Typography>;
  }

  if (!profile) {
    return <Typography>Профиль не найден. Пожалуйста, войдите в систему.</Typography>;
  }

  
  const onSubmit = async (data) => {
    try {

      await createFeedback({
        email: data.email,
        message: data.message,
        date: new Date().toLocaleDateString(),
        user_id: profile.id,
      }).unwrap(); 
      reset();
      refetchFeedbacks();
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
        <FeedbackList refetch={refetchFeedbacks} />
      </Box>
    </Container>
  );
};

export default FeedbackForm;