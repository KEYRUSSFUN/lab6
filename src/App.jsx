import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginForm from './templates/login.jsx';
import RegisterForm from './templates/register.jsx';
import Main from './templates/main.jsx';
import { checkSessionAsync } from './reducers/user.js';
import { useFetchProfileQuery } from './reducers/user.js';

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {data: profileData} = useFetchProfileQuery();

  useEffect(() => {
    dispatch(checkSessionAsync());
  }, [dispatch, navigate]);

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