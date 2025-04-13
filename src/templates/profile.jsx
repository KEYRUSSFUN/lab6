import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, updateProfileAsync } from '../reducers/user';
import { useNavigate } from 'react-router-dom';
import Loader from "../assets/img/loadingCircle.svg";

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';


const ProfileContainer = styled(Container)(({ theme }) => ({
    maxWidth: '600px',
    margin: '30px auto',
    padding: theme.spacing(4),
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    [theme.breakpoints.down('sm')]: {
        
        padding: theme.spacing(2),
    },
}));

const ProfileTitle = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    color: '#d45c4a',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
        fontSize: '22px',
    },
}));

const ProfileForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
});

const ProfileLabel = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    color: '#333',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    '& .MuiInputBase-input': {
        padding: '12px 16px',
        border: '2px solid #eee',
        borderRadius: '8px',
        fontSize: '16px',
        color: '#444',
        transition: 'border-color 0.3s ease',
        '&:focus': {
            outline: 'none',
            borderColor: '#FADB79',
            boxShadow: '0 2px 6px rgba(250, 219, 121, 0.3)',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '& .MuiInputBase-input': {
            fontSize: '14px',
            padding: '10px 14px',
        },
    },
}));

const ProfileButton = styled(Button)(({ theme }) => ({
    padding: '14px 24px',
    backgroundColor: '#d45c4a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '17px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: 500,
    '&:hover': {
        backgroundColor: '#c45242',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        padding: '12px 20px',
    },
}));

const ProfileEmailContainer = styled(Box)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
});

const LoadingImage = styled('img')({
    height: '20px',
});

const Alert = styled(MuiAlert)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '14px',
}));

const Profile = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { isAuthenticated, profile, loading, error, updated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setValue('username', profile.username || '');
            setValue('email', profile.email || '');
        }
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [profile, isAuthenticated, navigate, setValue]);

    const onSubmit = (data) => {
        if (profile) {
            dispatch(updateProfileAsync({ id: profile.id, profileData: data }));
        } else {
            console.warn("Профиль ещё не загружен");
        }
    };

    return (
        <ProfileContainer>
            <ProfileTitle variant="h5">Редактировать профиль</ProfileTitle>
            <ProfileForm onSubmit={handleSubmit(onSubmit)}>
                <ProfileLabel htmlFor="username">Имя пользователя:</ProfileLabel>
                <StyledTextField
                    id="username"
                    label=""
                    variant="outlined"
                    fullWidth
                    {...register('username', {
                        minLength: { value: 5, message: 'Логин должен содержать минимум 5 символов' }
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />

                <ProfileEmailContainer>
                    <ProfileLabel htmlFor="email">Email:</ProfileLabel>
                    <StyledTextField
                        id="email"
                        label=""
                        type="email"
                        variant="outlined"
                        fullWidth
                        {...register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Неверный формат email'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </ProfileEmailContainer>

                <ProfileButton type="submit" variant="contained">
                    {loading ? <LoadingImage src={Loader} alt="Загрузка..." /> : "Сохранить изменения"}
                </ProfileButton>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={2}>
                    <LoadingImage src={Loader} alt="Загрузка..." />
                    </Box>
                ) : (
                    error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                    )
                )}
                 {updated && (
                    <Alert severity="success">
                        Данные обновлены
                    </Alert>
                )}
            </ProfileForm>
        </ProfileContainer>
    );
};

export default Profile;