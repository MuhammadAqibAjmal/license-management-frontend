// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import './styles.css'; // Path to your stylesheet

import AdminDashboard from './components/dashboard/AdminDashboard';
import Signup from './components/auth/Signup';
import UserDashboard from './components/dashboard/UserDashboard';
import { react,useState } from 'react';
const App = () => {
  const [userId, setUserId]= useState(null);
  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={<Login setUserId={setUserId} />}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard userId={userId} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
};

export default App;
