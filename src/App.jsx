import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './templates/login.jsx';
import RegisterForm from './templates/register.jsx';
import Main from './templates/main.jsx';

import { useCheckSessionQuery, useFetchProfileQuery } from './reducers/user'; // Используем хуки из RTK Query

function App() {
  const { data: session, isLoading: sessionLoading } = useCheckSessionQuery(); // Хук для проверки сессии
  const { data: profile, isLoading: profileLoading } = useFetchProfileQuery(); // Хук для получения профиля

  // Проверка, если сессия или профиль еще не загружены
  useEffect(() => {
    if (!sessionLoading && !profileLoading && !session) {
      // Если сессия не активна, перенаправляем на страницу входа
      window.location.href = '/signin';
    }
  }, [sessionLoading, profileLoading, session]);

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;