import React, { useEffect } from 'react';
import "../Login.css";
import Logo from "../assets/logo/FASTFOODLOGO.svg";
import { useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinAccountAsync, fetchProfile } from '../reducers/user';
import Loader from "../assets/img/loadingCircle.svg";
const LoginForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { isAuthenticated, error, loading} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => { 
    try {
      await dispatch(signinAccountAsync({email : data.email, password: data.password})).unwrap();
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const toRegister = (() => {
    navigate("/signup");
  })

  return (
    <div className="login__page-container">
      <div class="login-container">
        <div className="go__back-button">
        </div>
        <div className="header__logo-side center">
          <img src={Logo} alt="" className="header-logo" />      
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="" {...register('email', { 
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email'
              }
             })} />
            <label for="email">Email</label>
            <div class="error-message">{errors?.email && <span style={{color: 'red'}}>{errors.email.message}</span>}</div>
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
          <div className="form-group">
          {loading ? (<img className='spinner' src={Loader} alt="Загрузка..." />) : (error && <div className="error__notification" >{error}</div>)}
          </div>
          <button type="submit" class="signin-button">Войти</button>
        </form>
        <a onClick={toRegister} href="#" class="register-link">Зарегистрироваться</a>
        
      </div>
    </div>
    
  );
};

export default LoginForm;