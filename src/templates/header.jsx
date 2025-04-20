import React, { useState, useCallback } from 'react';
import Logo from "../assets/logo/FASTFOODLOGO.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Loader from "../assets/img/loadingCircle.svg";
import { useSigninAccountMutation, useLogoutMutation, useFetchProfileQuery } from '../reducers/user';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

const GlobalStyle = styled('div')({
    '*': {
        padding: 0,
        margin: 0,
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
});

const HeaderBackground = styled(AppBar)({
    width: '100%',
    height: '55px',
    boxShadow: '0px 1px 0px 0px rgba(214, 213, 213, 0.5)',
    backgroundColor: 'white',
    color: 'black', 
});

const HeaderContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1550px',
    height: '100%',
});

const HeaderLogoSide = styled(Box)(({ center }) => ({
    display: 'flex',
    alignItems: 'center',
    ...(center && { 
        justifyContent: 'center',
        alignItems: 'center',
    }),
}));

const HeaderLogo = styled('img')({
    height: '40px',
    cursor: 'pointer',
});

const AuthSide = styled(Box)({
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const LoginButton = styled(Button)({
    color: '#000000de',
    fontSize: '14px',
    padding: '5px 20px',
    cursor: 'pointer',
    borderRight: '1px solid #0000003b',
    textDecoration: 'none',
    '&:active': {
        color: '#000000de', 
    },
});

const SignupButton = styled(Button)({
    color: '#000000de',
    padding: '5px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '1px solid #d45c4a',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: '#d45c4a',
        color: 'white',
    },
    '&:active': {
        color: '#000000de',
    },
});


const ProfileAvatar = styled(Avatar)({
    backgroundColor: '#2929293b',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
});

const HeaderMenu = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

const MenuList = styled('ul')({
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
});

const MenuItemStyle = styled('li')({
    marginRight: '20px',
    '&:last-child': {
        marginRight: 0,
    },
});

const Header = () => {
    const [logout] = useLogoutMutation(); // Using RTK Query mutation for logout
    const { data: profile, isLoading, isError } = useFetchProfileQuery(); // Using RTK Query query for profile
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const onLogout = useCallback(async () => {
        try {
            await logout().unwrap(); // Calling the RTK Query mutation
            navigate('/signin');
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    }, [logout, navigate]);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };

    const navigateToLab = (labId) => {
      setDrawerOpen(false);
      navigate(`/labs/${labId}`);
    };

    return (
        <GlobalStyle>
            <HeaderBackground position="static">
                <HeaderContainer maxWidth="xl">
                    <HeaderLogoSide
                        sx={{
                          flex: 1,
                          justifyContent: isMobile ? 'center' : 'flex-start',
                          alignItems: 'center',
                          display: 'flex',
                          position: 'relative',
                        }}
                      >
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleDrawerToggle}
                        sx={{
                          position: 'absolute',
                          left: isMobile ? 10 : 0,
                        }}
                      >
                        <MenuIcon />
                      </IconButton>
                      <RouterLink to="/" style={{ textAlign: 'center' }}>
                        <HeaderLogo sx={{
                          ml: 5,
                        }} src={Logo} alt="Logo" />
                      </RouterLink>
                    </HeaderLogoSide>

                    {!isMobile && (
                    <HeaderMenu sx={{
                      flex: 1,
                    }}>
                      <MenuList>
                        <MenuItemStyle>
                          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography>Главная</Typography>
                          </RouterLink>
                        </MenuItemStyle>
                        <MenuItemStyle>
                          <RouterLink to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography>О себе</Typography>
                          </RouterLink>
                        </MenuItemStyle>
                      </MenuList>
                    </HeaderMenu>
                  )}

                  {!isMobile ? (
                    profile ? (
                      <AuthSide>
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {profile.username}
                        </Typography>
                        <IconButton onClick={handleProfileClick}>
                          <ProfileAvatar />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleProfileClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                          <MenuItem onClick={() => { navigate("/profile"); }}>Профиль</MenuItem>
                          {profile.role === 'admin' && <MenuItem onClick={() => { navigate("/admin_panel"); }}>Панель администрирования</MenuItem>}
                          <MenuItem onClick={() => { handleProfileClose(); onLogout(); }}>Выйти</MenuItem>
                        </Menu>
                      </AuthSide>
                    ) : (
                      <AuthSide>
                        <RouterLink to="/signin" style={{ textDecoration: 'none' }}>
                          <LoginButton variant="text">Вход</LoginButton>
                        </RouterLink>
                        <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                          <SignupButton variant="outlined">Регистрация</SignupButton>
                        </RouterLink>
                      </AuthSide>
                    )
                  ) : null}
                </HeaderContainer>
               
                <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
                  {isMobile && (
                  <Typography variant="h6" sx={{ p: 2 }}>
                    Меню
                  </Typography>
                  )}
                  {isMobile && (
                    <Divider />
                  )}
                  <List>
                  {isMobile && (
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/">
                      <ListItemText primary="Главная" />
                    </ListItemButton>
                  </ListItem>
                  )}
                  {isMobile && (
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/about">
                      <ListItemText primary="О себе" />
                    </ListItemButton>
                  </ListItem>
                  )}
                  {isMobile && profile && (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/profile")}>
                          <ListItemText primary="Профиль" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={onLogout}>
                          <ListItemText primary="Выйти" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                  {isMobile && !profile && (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton component={RouterLink} to="/signin">
                          <ListItemText primary="Вход" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component={RouterLink} to="/signup">
                          <ListItemText primary="Регистрация" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                  {isMobile && (
                  <Divider />
                  )}

                  <Typography variant="h6" sx={{ p: 2 }}>
                    Лабораторные
                  </Typography>
                  {[1, 2, 3, 4].map((labId) => (
                    <ListItem key={labId} disablePadding>
                      <ListItemButton onClick={() => navigateToLab(labId)}>
                        <ListItemText primary={`Лабораторная ${labId}`} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  </List>
                </Box>
                </Drawer>
               
            </HeaderBackground>
        </GlobalStyle>
    );
};

export default Header;