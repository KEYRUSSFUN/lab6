import React, { useCallback} from 'react';
import Logo from "../assets/logo/FASTFOODLOGO.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Loader from "../assets/img/loadingCircle.svg";
import { Logout } from '../reducers/user';

const Header = () => {
    const dispatch = useDispatch();
    
    const { isAuthenticated, profile} = useSelector((state) => state.user);

    const navigate = useNavigate();

    const onLogout = async () => { 
        try {
          await dispatch(Logout()).unwrap();
        } catch (error) {
          console.error("Ошибка при выходе:", error);
        }
    };

  return (
    <div className="header">
        <div className="header__background">
            <div className="header__container">
                <Link to="/" className="header__logo-side">
                    <img src={Logo} alt="" className="header-logo" />      
                </ Link>
                <div className="header__menu">
                    <ul className="header__menu-list">
                        <Link className="menu-item" to="">Главная</Link>
                        <Link className="menu-item" to="">О себе</Link>
                    </ul>
                    {isAuthenticated ? (
                    <Link className="header__aunth-side login" to="/profile" >
                        {profile ? <span className='username'>{profile.username}</span>  : <img className='spinner' src={Loader} alt="" />}
                        <div className="header__profile">
                            <div className="header__logout" onClick={onLogout}>
                                Выход
                            </div>
                        </div>
                    </ Link>
                    ) : (
                    <div className="header__aunth-side">
                        <a className="login-button" href="/signin" >
                            Вход
                        </a>
                        <a className="signup-button" href='/signup'>
                            Регистрация
                        </a>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Header;