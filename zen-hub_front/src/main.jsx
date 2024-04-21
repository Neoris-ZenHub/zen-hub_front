import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage/HomePage';
import Ranking from './Ranking/Ranking';
import EvidenceUser from './EvidenceUser/EvidenceUser';
import EvidenceAdmin from './EvidenceAdmin/EvidenceAdmin';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = '/' element = {<Login />} />
        <Route path = '/signup' element = {<SignUp />} />
        <Route path = '/homepage' element = {<HomePage />} />
        <Route path = '/ranking' element = {<Ranking />} />
        <Route path = '/evidence' element = {<EvidenceUser />} />
        <Route path = '/validation' element = {<EvidenceAdmin />} />
        <Route path = '*' element = {<Navigate to = '/' />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

