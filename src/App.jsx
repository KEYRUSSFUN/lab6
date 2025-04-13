import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './templates/login.jsx';
import RegisterForm from './templates/register.jsx';
import Main from './templates/main.jsx';
import FeedbackForm from './templates/feedback.jsx';
import { checkSessionAsync,fetchProfile } from './reducers/user.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSessionAsync());
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
      </Routes>
      <FeedbackForm />
    </div>
  );
}

export default App;