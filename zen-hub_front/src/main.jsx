import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login/Login';
import SignUp from './Signup/SignUp';
import HomePage from './HomePage/HomePage';
import Ranking from './Ranking/Ranking';
import EvidenceUser from './EvidenceUser/EvidenceUser';
import EvidenceAdmin from './EvidenceAdmin/EvidenceAdmin';
import MarketPlace from './Marketplace/Marketplace';
import Paths from './Paths/Paths'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserInfoProvider } from './UserInfoContext';
import Game from './Game/Game';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserInfoProvider>
      <Router>
        <Routes>
          const [newUser, setNewUser] = useState(false);
          <Route path = '/' element = {<Login />} />
          <Route path = '/signup' element = {<SignUp />} />
          <Route path = '/homepage' element = {<HomePage />} />
          <Route path = '/ranking' element = {<Ranking />} />
          <Route path = '/evidence' element = {<EvidenceUser />} />
          <Route path = '/validation' element = {<EvidenceAdmin />} />
          <Route path = '/marketplace' element = {<MarketPlace />} />
          <Route path = '/paths' element = {<Paths />} />
          <Route path = '/game' element = {<Game />} />

          <Route path = '*' element = {<Navigate to = '/' />}/>
        </Routes>
      </Router>
    </UserInfoProvider>
  </React.StrictMode>
);

