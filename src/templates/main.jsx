import React, { useCallback} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './header';
import Profile from './profile';
import About from './about';
import LabSelector from './labPages';
import LabPage from './labPages';
import Footer from './footer';
import FeedbackForm from '../templates/feedback.jsx';

const Main = () => {
    
  return (
    <div className="content">
    <Header />
    <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/labs/:id" element={<LabPage />} />
    </Routes>
    <Footer />
    </div>
  );
};

export default Main;