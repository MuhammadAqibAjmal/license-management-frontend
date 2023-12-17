// src/components/dashboard/UserDashboard.js
import React from 'react';
import DashboardLayout from './DashboardLayout';

const UserDashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome to the user dashboard! Here you can view your activated licenses.</p>
        {/* User-specific dashboard content */}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
