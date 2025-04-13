import React, { useCallback } from 'react';
import { useForm} from 'react-hook-form';
import "../Register.css";
import Logo from "../assets/logo/FASTFOODLOGO.svg";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountAsync } from '../reducers/user';
import Loader from "../assets/img/loadingCircle.svg";

const RegisterForm = () => {

  const { register, handleSubmit,watch, formState: { errors } } = useForm();

  const {loading, error, registred} = useSelector((state) => state.user);

  const navigate = useNavigate();

  const password = watch("password");

  const dispatch = useDispatch();

  const onSubmit = useCallback((data) => {
    dispatch(createAccountAsync({ name: data.username, email: data.email, password: data.password }));
  }, [dispatch]);

  const toLogin = (() => {
    navigate("/signin");
  })

  return (
    <div className="register__page-container">
      <div class="register-container">
        <div className="header__logo-side center">
            <img src={Logo} alt="" className="header-logo" />      
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group">
            <input type="text" id="username" name="username" placeholder="" {...register("username", { required: 'Имя обязательно для заполнения',
              minLength:{
              value: 2,
              message: "Имя не может быть короче 2х символов"
              } })}/>
            <label for="username">Имя пользователя</label>
            <div class="error-message">{errors.username && <span>{errors.username.message}</span>}</div>
          </div>
          <div class="form-group">
            <input type="email" id="email" name="email" placeholder="" {...register('email', { 
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email'
              }
             })} />
            <label for="email">Email</label>
            <div class="error-message">{errors.email && <span>{errors.email.message}</span>}</div>
          </div>
          <div class="form-group">
            <input type="password" id="password" name="password" placeholder="" {...register("password", {
              required: "Пароль обязателен для заполнения",
              minLength:{
              value: 6,
              message: "Пароль должен содержать не менее 6 символов"
              }
              })} />
            <label for="password">Пароль</label>
            <div class="error-message">{errors?.password && <span style={{color: 'red'}}>{errors.password.message}</span>}</div>
          </div>
          <div class="form-group">
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="" {...register("confirmPassword", {
              required: "Подтверждение пароля обязательно",
              validate: (value) =>
                value === password || "Пароли не совпадают"
            })} />
            <label for="confirmPassword">Подтвердите пароль</label>
            <div class="error-message">{errors?.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword.message}</span>}</div>
          </div>
          <button type="submit" class="register-button">{loading? <img className='spinner' src={Loader} alt="" /> : "Зарегестрироваться"}</button>
          <div className="form-group">
          {loading ? (<img className='spinner' src={Loader} alt="Загрузка..." />) : (error && <div className="error__notification" >{error}</div>)}
          {registred && <div className="success__notification" >Успешная регистрация</div> }
          </div>
        </form>
        <a onClick={toLogin} href="#" class="login-link">Уже есть аккаунт? Войти</a>
      </div>
    </div>
    
  );
};

export default RegisterForm;