import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateAccountMutation } from '../reducers/user';
import Logo from "../assets/logo/FASTFOODLOGO.svg";
import Loader from "../assets/img/loadingCircle.svg";

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const RegisterPageContainer = styled(Box)({
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    background: "#f0f4f8",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
});

const RegisterContainer = styled(Container)(({ theme }) => ({
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(4),
    textAlign: "left",
    transition: "all 0.3s ease",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '450px',
    },
}));

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "30px",
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    background: "#ecf0f1",
  },
  "& .MuiInputBase-input": {
    padding: "20px",
    border: "none",
    color: "#333",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    "&:focus": {
      outline: "none",
      background: "#fff",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
      borderColor: '#FADB79',
    },
  },
  "& .MuiFormLabel-root": {
    backgroundColor: "transparent",
    marginLeft: "5px",
    top: "-8px",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#999",
    pointerEvents: "none",
    transition: "all 0.3s ease",
    transformOrigin: 'top left',
  },
});

const RegisterButton = styled(Button)({
    background: "#d45c4a",
    color: "#fff",
    padding: "5px 30px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: 600,
    transition: "all 0.3s ease",
    width: "100%",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    "&:hover": {
        background: "#e46552",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
});

const LoginLink = styled(Link)({
    display: "block",
    marginTop: "30px",
    color: "black",
    textDecoration: "none",
    fontWeight: 500,
    textAlign: "center",
    transition: "color 0.3s ease",
    "&:hover": {
        color: "black",
        textDecoration: "underline",
    },
});

const ErrorMessage = styled(Typography)({
    color: "#e74c3c",
    fontSize: "0.9rem",
    marginTop: "8px",
    textAlign: "left",
});

const LogoImage = styled('img')({
    height: '40px',
    cursor: 'pointer',
});

const LoadingImage = styled('img')({
    height: '40px',
});

const Alert = styled(MuiAlert)({
    marginTop: '10px',
    marginBottom: '10px',
})

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [createAccount, { isLoading, error, isSuccess }] = useCreateAccountMutation();
    const navigate = useNavigate();
    
    const password = watch('password');

    const onSubmit = useCallback((data) => {
        createAccount({
            name: data.username,
            email: data.email,
            password: data.password,
        });
    }, [createAccount]);

    const toLogin = () => {
        navigate("/signin");
    };

    return (
        <ThemeProvider theme={theme}>
            <RegisterPageContainer component="main">
                <RegisterContainer maxWidth="sm">
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <LogoImage src={Logo} alt="Logo" />
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StyledTextField
                            fullWidth
                            label="Имя пользователя"
                            margin="normal"
                            {...register("username", {
                                required: 'Имя обязательно для заполнения',
                                minLength: {
                                    value: 2,
                                    message: "Имя не может быть короче 2х символов"
                                }
                            })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />

                        <StyledTextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            {...register('email', {
                                required: 'Email обязателен',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Неверный формат email'
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <StyledTextField
                            fullWidth
                            label="Пароль"
                            type="password"
                            margin="normal"
                            {...register("password", {
                                required: "Пароль обязателен для заполнения",
                                minLength: {
                                    value: 6,
                                    message: "Пароль должен содержать не менее 6 символов"
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <StyledTextField
                            fullWidth
                            label="Подтвердите пароль"
                            type="password"
                            margin="normal"
                            {...register("confirmPassword", {
                                required: "Подтверждение пароля обязательно",
                                validate: (value) =>
                                    value === password || "Пароли не совпадают"
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />

                        <RegisterButton type="submit" variant="contained" fullWidth>
                            {isLoading ? <LoadingImage src={Loader} alt="Загрузка..." /> : "Зарегистрироваться"}
                        </RegisterButton>

                        {error && (
                            <Alert severity="error">
                                {error.message || "Ошибка при регистрации"}
                            </Alert>
                        )}

                        {isSuccess && (
                            <Alert severity="success">
                                Успешная регистрация
                            </Alert>
                        )}
                    </form>

                    <Box mt={3} textAlign="center">
                        <Link component="button" variant="body2" onClick={toLogin} style={{ cursor: 'pointer' }}>
                            Уже есть аккаунт? Войти
                        </Link>
                    </Box>
                </RegisterContainer>
            </RegisterPageContainer>
        </ThemeProvider>
    );
};

export default RegisterForm;