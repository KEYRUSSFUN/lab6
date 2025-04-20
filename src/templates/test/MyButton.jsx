import React from 'react';
import { Button } from '@mui/material';

function MyButton({ onClick, children, disabled }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default MyButton;