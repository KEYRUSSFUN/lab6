import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  Box, Table, TableContainer, TableHead, TableRow, TableCell,
  Paper, Button, Typography
} from '@mui/material';
import axios from 'axios';
import {
  useTable, useSortBy, useColumnOrder
} from 'react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeedbackAdminList from './adminFeedbackList';
import { FixedSizeList as List } from 'react-window';

const DraggableColumnHeader = ({ column, index, moveColumn, headerRefs }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'column',
    hover: (item) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <TableCell
      {...column.getHeaderProps(column.getSortByToggleProps())}
      ref={(el) => {
        ref.current = el;
        headerRefs.current[index] = el;
      }}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        userSelect: 'none',
        whiteSpace: 'nowrap'
      }}
    >
      {column.render('Header')}
      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
    </TableCell>
  );
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [colWidths, setColWidths] = useState([]);
  const headerRefs = useRef([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Ошибка при получении пользователей', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (headerRefs.current.length) {
      const newWidths = headerRefs.current.map(ref => ref?.offsetWidth || 0);
      setColWidths(newWidths);
    }
  }, [users]);

  const deleteUser = async (action, userId) => {
    try {
      await axios.delete(`/api/admin/${action}/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error(`Ошибка при выполнении действия ${action}`, err);
    }
  };

  const blockUser = async (action, userId) => {
    try {
      await axios.put(`/api/admin/${action}/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error(`Ошибка при выполнении действия ${action}`, err);
    }
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Имя пользователя', accessor: 'username' },
    { Header: 'Роль', accessor: 'role' },
    {
      Header: 'Активен',
      accessor: 'is_active',
      Cell: ({ value }) => (value ? 'Да' : 'Нет')
    },
    {
      Header: 'Действия',
      accessor: 'actions',
      Cell: ({ row }) => {
        const user = row.original;
        return (
          <>
            <Button
              color="error"
              size="small"
              onClick={() => deleteUser('delete', user.id)}
              disabled={user.is_self}
              sx={{ mr: 1 }}
            >
              Удалить
            </Button>
            {user.is_active ? (
              <Button
                color="warning"
                size="small"
                onClick={() => blockUser('block', user.id)}
                disabled={user.is_self}
                sx={{ mr: 1 }}
              >
                Заблокировать
              </Button>
            ) : (
              <Button
                color="success"
                size="small"
                onClick={() => blockUser('unblock', user.id)}
              >
                Разблокировать
              </Button>
            )}
          </>
        );
      }
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable(
    { columns, data: users },
    useSortBy,
    useColumnOrder
  );

  const moveColumn = (dragIndex, hoverIndex) => {
    const newOrder = [...columns.map(col => col.accessor || col.id)];
    const [moved] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, moved);
    setColumnOrder(newOrder);
  };

  return (
    <Box
      sx={{
        maxWidth: '1550px',
        margin: '0 auto',
        padding: 2,
      }}
    >
      <Typography textAlign="center" mt={5} fontSize={24}>
        Панель администрирования
      </Typography>
      <Typography mt={5} mb={1} fontWeight="bold" fontSize={20}>
        Список пользователей
      </Typography>
      <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
        <Box component="table" {...getTableProps()} sx={{ width: '100%', tableLayout: 'fixed' }}>
          <Box component="thead">
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, colIdx) => (
                  <DraggableColumnHeader
                    key={column.id}
                    column={column}
                    index={colIdx}
                    moveColumn={moveColumn}
                    headerRefs={headerRefs}
                  />
                ))}
              </TableRow>
            ))}
          </Box>
        </Box>

        {colWidths.length > 0 && (
          <Box sx={{ height: 500 }}>
            <List
              height={500}
              itemCount={rows.length}
              itemSize={60}
              width="100%"
            >
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
      </DndProvider>

      <FeedbackAdminList />
    </Box>
  );
};

export default AdminPanel;