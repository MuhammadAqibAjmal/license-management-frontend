import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSignUp = () => {
    // Implement API call for user registration
    const user = { username: formData.username };
    dispatch({ type: 'LOGIN', payload: user });
    navigate('/user-dashboard');
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
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
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
