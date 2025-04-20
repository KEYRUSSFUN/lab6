import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFetchFeedbackQuery,
  useDeleteFeedbackMutation,
  useBlockFeedbackMutation,
  useUnblockFeedbackMutation
} from '../reducers/feedback';
import { useTable } from 'react-table';
import {
  Box,
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useFetchProfileQuery } from '../reducers/user';
import { FixedSizeList as List } from 'react-window';

function FeedbackAdminList() {
  const { data: feedbacks, error: feedbackError, isLoading: feedbackLoading, refetch } = useFetchFeedbackQuery();
  const { data: profile, isLoading: profileLoading, error: profileError} = useFetchProfileQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [blockFeedback] = useBlockFeedbackMutation();
  const [unblockFeedback] = useUnblockFeedbackMutation();
  const headerRefs = useRef([]);
  const [colWidths, setColWidths] = useState([]);

  const canDelete = (feedback) =>
    profile && (feedback.user_id === profile.id || profile.role === 'admin');

  const canBlock = () =>
    profile && profile.role === 'admin';

  const onDelete = async (id) => {
    try {
      await deleteFeedback(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const onBlock = async (feedback) => {
    try {
      await blockFeedback(feedback.id).unwrap();
      refetch();
    } catch (error) {
      console.error('Ошибка при блокировке:', error);
    }
  };

  const onUnblock = async (feedback) => {
    try {
      await unblockFeedback(feedback.id).unwrap();
      refetch();
    } catch (error) {
      console.error('Ошибка при разблокировке:', error);
    }
  };

  const columns = useMemo(() => [
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Дата',
      accessor: 'date',
    },
    {
      Header: 'Комментарий',
      accessor: 'message',
      Cell: ({ row }) =>
        row.original.is_active ? (
          row.original.message
        ) : (
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Комментарий заблокирован
          </Typography>
        ),
    },
    {
      Header: 'Действия',
      accessor: 'actions',
      disableSortBy: true,
      Cell: ({ row }) => {
        const feedback = row.original;
        return (
          <>
            {canDelete(feedback) && (
              <Tooltip title="Удалить">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(feedback.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {canBlock() && (
              <Tooltip title={feedback.is_active ? "Заблокировать комментарий" : "Разблокировать комментарий"}>
                <IconButton
                  color={feedback.is_active ? "warning" : "success"}
                  size="small"
                  onClick={feedback.is_active ? () => onBlock(feedback) : () => onUnblock(feedback)}
                >
                  {feedback.is_active ? (
                    <BlockIcon fontSize="small" />
                  ) : (
                    <LockOpenIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      },
    },
  ], [profile]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: feedbacks || [],
  });

  useEffect(() => {
    if (headerRefs.current.length) {
      const widths = headerRefs.current.map(ref => ref?.offsetWidth || 0);
      setColWidths(widths);
    }
  }, [feedbacks]);

  if (profileLoading || feedbackLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;

  if (feedbackError || profileError) return <Typography>Ошибка загрузки данных</Typography>;

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Отзывы
      </Typography>

      {feedbacks && feedbacks.length === 0 ? (
        <Typography variant="body2" align="center" color="text.secondary">
          Пока нет отзывов
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Box component="table" {...getTableProps()} sx={{ width: '100%', tableLayout: 'fixed' }}>
            <Box component="thead">
              {headerGroups.map((headerGroup, idx) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} key={`head-${idx}`}>
                  {headerGroup.headers.map((column, i) => (
                    <TableCell
                      key={i}
                      ref={(el) => (headerRefs.current[i] = el)}
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Box>
          </Box>

          {colWidths.length > 0 && (
            <Box sx={{ height: 500 }}>
              <List height={500} itemCount={rows.length} itemSize={60} width="100%">
                {({ index, style }) => {
                  const row = rows[index];
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps({ style })}>
                      {row.cells.map((cell, colIdx) => (
                        <TableCell
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          sx={{
                            width: colWidths[colIdx],
                            maxWidth: colWidths[colIdx],
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                }}
              </List>
            </Box>
          )}
        </TableContainer>
      )}
    </Box>
  );
}

export default FeedbackAdminList;