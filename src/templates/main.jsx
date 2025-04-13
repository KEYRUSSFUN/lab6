import React, { useCallback} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './header';
import Profile from './profile';

const Main = () => {
    
  return (
    <div className="content">
    <Header></Header>
    <Routes>
        <Route path="/profile" element={<Profile />} />
    </Routes>
    </div>
  );
};

export default Main;