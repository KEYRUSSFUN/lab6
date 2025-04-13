import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedback, deleteFeedbackAsync } from '../reducers/feedback';

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function FeedbackList() {
  const { feedbacks } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const onDelete = async (id) => {
    try {
      await dispatch(deleteFeedbackAsync(id)).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Отзывы
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography variant="body2" align="center" color="text.secondary">
          Пока нет отзывов
        </Typography>
      ) : (
        feedbacks.map((feedback) => (
          <Paper
            key={feedback.id}
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography fontWeight={600}>{feedback.email}</Typography>
              <Typography variant="body2" color="text.secondary">
                {feedback.date}
              </Typography>
            </Stack>

            <Typography variant="body1" mb={1}>
              {feedback.message}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="error"
                size="small"
                onClick={() => onDelete(feedback.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
}

export default FeedbackList;