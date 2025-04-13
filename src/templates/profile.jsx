import React, { useState, useEffect} from 'react';
import Loader from "../assets/img/loadingCircle.svg";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../reducers/user';
import { updateProfileAsync } from '../reducers/user';
import { useNavigate } from 'react-router-dom';
import "../Profile.css";

const Profile = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const {isAuthenticated, profile, loading} = useSelector((state) => state.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
        setUsername(profile.username || '');
        setEmail(profile.email || '');
        }
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [profile, isAuthenticated]);

    const onSubmit = (e) => {
        if (profile) { 
        dispatch(updateProfileAsync({ id: profile.id, profileData: { username, email } }));
        } else {
        console.warn("Профиль ещё не загружен");
        }
    };

  return (
    <div class="profile-container">
      <h1 class="profile-title">Редактировать профиль</h1>
      <form onSubmit={handleSubmit(onSubmit)} class="profile-form">
        <label for="username" class="profile-label">Имя пользователя:</label>
        <input {...register('name', { minLength: { value: 5, message: 'Логин должен содержать минимум 5 символов'}})} type="text" class="profile-input" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.name && <span class="profile-error">{errors.name.message}</span>}

        <div class="profile-email-container">
          <label for="email" class="profile-label">Email:</label>
          <input type="email"
            {...register('email', { 
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email'
                }
            })} class="profile-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {errors.email && <p class="profile-error">{errors.email.message}</p>}
        <button type="submit" class="profile-button">{loading ? <img className='spinner' src={Loader} alt="" /> : "Сохранить изменения"}</button>
      </form>
    </div>
  );
};

export default Profile;