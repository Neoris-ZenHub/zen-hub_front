import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = '/' element = {<Login />} />
        <Route path = '/signup' element = {<SignUp />} />
        <Route path = '*' element = {<Navigate to = '/' />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

