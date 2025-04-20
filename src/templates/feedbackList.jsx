import React, { useEffect, useMemo } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import {
  useFetchFeedbackQuery,
  useDeleteFeedbackMutation,
} from '../reducers/feedback';

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Divider,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchProfileQuery} from '../reducers/user';
import { FixedSizeList as List } from 'react-window';

const OuterElementType = React.forwardRef(({ style, ...props }, ref) => (
  <Box
    ref={ref}
    {...props}
    sx={{ ...style, display: 'block' }}
  />
));

function FeedbackList() {
  const { data: feedbacks = [], error, isLoading, refetch } = useFetchFeedbackQuery(); 
  const { data: profile } = useFetchProfileQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation(); 

  const canDelete = (feedback) =>
    profile && feedback.user_id === profile.id; 

  const onDelete = async (id) => {
    try {
      await deleteFeedback(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const Row = ({ index, style }) => {
    const feedback = feedbacks[index];

    return (
      <div style={style}>
        <Paper
          key={feedback.id}
          variant="outlined"
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: feedback.is_active ? '#f8f9fa' : '#e0e0e0',
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

          {feedback.is_active ? (
            <Typography variant="body1" mb={1}>
              {feedback.message}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              mb={1}
              color="text.secondary"
              fontStyle="italic"
            >
              Комментарий заблокирован
            </Typography>
          )}

          <Divider sx={{ mb: 1 }} />

          {canDelete(feedback) && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Удалить">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(feedback.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Paper>
      </div>
    );
  };

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Ошибка загрузки данных: {error.message}</Typography>;

  return (
    <Box mt={3} pb={10} sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Отзывы
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography variant="body2" align="center" color="text.secondary">
          Пока нет отзывов
        </Typography>
      ) : (
        <List
          height={600}
          itemCount={feedbacks.length}
          itemSize={150}
          width="100%"
          outerElementType={OuterElementType}
        >
          {Row}
        </List>
      )}
    </Box>
  );
}

export default FeedbackList;