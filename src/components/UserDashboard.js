// src/components/UserDashboard.js
import React from 'react';
import { useAuth } from '../auth/AuthContext';

const UserDashboard = () => {
  const { state } = useAuth();

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <p>Welcome, {state.user && state.user.username}!</p>
      {/* Display user's activated licenses and other information */}
    </div>
  );
};

export default UserDashboard;
