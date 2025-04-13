import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels={!isSmallScreen}
        sx={{
          height: isSmallScreen ? 56 : 64,
        }}
      >
        <BottomNavigationAction
          label="Обратная связь"
          value="/feedback"
          icon={<FeedbackIcon />}
          component={Link}
          to="/feedback"
          sx={{
            minWidth: 0,
            color: '#888',
            '&.Mui-selected': {
              color: '#FC4D5D',
            },
          }}
        />
        <BottomNavigationAction
          label="Условия"
          value="/terms"
          icon={<InfoIcon />}
          component={Link}
          to="/terms"
          sx={{
            minWidth: 0,
            color: '#888',
            '&.Mui-selected': {
              color: '#FC4D5D',
            },
          }}
        />
        <BottomNavigationAction
          label="Настройки"
          value="/settings"
          icon={<SettingsIcon />}
          component={Link}
          to="/settings"
          sx={{
            minWidth: 0,
            color: '#888',
            '&.Mui-selected': {
              color: '#FC4D5D',
            },
          }}
        />
        <BottomNavigationAction
          label="Контакты"
          value="/contacts"
          icon={<ContactPhoneIcon />}
          component={Link}
          to="/contacts"
          sx={{
            minWidth: 0,
            color: '#888',
            '&.Mui-selected': {
              color: '#FC4D5D',
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;