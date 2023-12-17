// src/components/dashboard/DashboardLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation */}
      <nav className="bg-blue-500 p-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-white font-bold text-lg">
            Dashboard
          </Link>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
