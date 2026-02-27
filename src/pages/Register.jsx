import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/auth';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user, token } = await authApi.register(formData);
      login(user, token);
      navigate('/home');
    } catch (err) {
      const msg = err.errors?.email?.[0] || err.errors?.password?.[0] || err.message || 'Registration failed';
      setError(typeof msg === 'string' ? msg : msg[0] || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1 className="instagram-logo">Instagram</h1>
          <p className="register-subtitle">Sign up to see photos and videos from your friends.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button 
            type="submit" 
            className={`auth-button ${formData.email && formData.fullName && formData.username && formData.password ? 'active' : ''}`}
            disabled={!formData.email || !formData.fullName || !formData.username || !formData.password || loading}
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Have an account? <Link to="/login" className="auth-link">Log in.</Link>
          </p>
        </div>
      </div>

      <div className="app-footer">
        <p>Instagram от Facebook</p>
      </div>
    </div>
  );
}

export default Register;
