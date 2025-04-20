import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSigninAccountMutation, useFetchProfileQuery } from '../reducers/user';
import Logo from "../assets/logo/FASTFOODLOGO.svg";
import Loader from "../assets/img/loadingCircle.svg";

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';

const LoginPageContainer = styled(Box)({
  fontFamily: "'Roboto', sans-serif",
  margin: 0,
  background: "#f0f4f8",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#333",
});

const LoginContainer = styled(Container)({
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  width: "450px",
  padding: "50px",
  textAlign: "left",
  transition: "all 0.3s ease",
});

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

const SigninButton = styled(Button)({
  background: "#d45c4a",
  color: "#fff",
  padding: "5px 30px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1.1rem",
  fontWeight: 600,
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  width: "100%",
  "&:hover": {
    background: "#df6451",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
});

const RegisterLink = styled(Typography)({
  display: "block",
  marginTop: "0px",
  color: "black",
  textDecoration: "none",
  fontWeight: 500,
  textAlign: "center",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "black",
    textDecoration: "underline",
    cursor: 'pointer',
  },
});

const ErrorMessage = styled(Typography)({
  color: "#e74c3c",
  fontSize: "0.9rem",
  marginTop: "8px",
  textAlign: "left",
});

const Alert = styled(MuiAlert)({
    marginTop: '10px',
    marginBottom: '10px',
});

const LogoImage = styled('img')({
  height: '40px',
  cursor: 'pointer',
  marginBottom: '20px',
});

const LoadingImage = styled('img')({
    height: '40px',
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isAuthenticated, error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Используем хук для мутации входа
  const [signinAccount, { isLoading: isSigninLoading, error: signinError }] = useSigninAccountMutation();

  const { refetch: fetchProfile } = useFetchProfileQuery({}, { skip: true });

  const onSubmit = async (data) => {
    try {
      await signinAccount({ email: data.email, password: data.password }).unwrap();
    } catch (err) {
      console.error("Ошибка при входе:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile(); // Загружаем профиль после успешной аутентификации
      navigate('/');
    }
  }, [isAuthenticated, navigate, fetchProfile]);

  const toRegister = () => {
    navigate("/signup");
  };

  return (
    <LoginPageContainer component="main">
      <LoginContainer maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
            <RouterLink to="/">
                <LogoImage src={Logo} alt="Logo" />
            </RouterLink>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            fullWidth
            label="Email"
            margin="normal"
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
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
                message: "Пароль должен содержать не менее 6 символов",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />

          <SigninButton type="submit" variant="contained" fullWidth>
            Войти
          </SigninButton>

          {isSigninLoading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <LoadingImage src={Loader} alt="Загрузка..." />
            </Box>
          ) : (
            signinError && (
              <Alert severity="error">
                {signinError?.data?.message || 'Ошибка при входе'}
              </Alert>
            )
          )}
        </form>

        <Box display="flex" justifyContent="center" mt={3}>
          <RegisterLink onClick={toRegister} style={{ cursor: 'pointer' }}>
            Зарегистрироваться
          </RegisterLink>
        </Box>
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default LoginForm;