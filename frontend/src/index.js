import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Reg from './reg';
import Log from './log';
import AccountPage from './AccountPage';
import EditProfilePage from './EditProfilePage';
import ProfilePage from './ProfilePage';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/reg" element={<Reg/>} />
      <Route path="/log" element={<Log/>} />
      <Route path="/account" element={<AccountPage/>} />
      <Route path = "/editpf" element = {<EditProfilePage/>} />
      <Route path = "/profile" element = {<ProfilePage/>} />

    </Routes>
  </Router>,
  document.getElementById('root')
);
