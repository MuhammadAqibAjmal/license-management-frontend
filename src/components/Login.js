import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = () => {
    // Implement API call for user registration
    const user = { username: formData.username };
    dispatch({ type: 'LOGIN', payload: user });
    navigate('/user-dashboard');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
