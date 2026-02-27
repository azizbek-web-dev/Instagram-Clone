import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/auth';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
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
      const { user, token } = await authApi.login(formData);
      login(user, token);
      navigate('/home');
    } catch (err) {
      const msg = err.errors?.email?.[0] || err.message || 'Login failed';
      setError(typeof msg === 'string' ? msg : msg[0] || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1 className="instagram-logo">Instagram</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder="Phone number, username, or email"
              value={formData.email}
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

          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${formData.email && formData.password ? 'active' : ''}`}
            disabled={!formData.email || !formData.password || loading}
          >
            {loading ? 'Loading...' : 'Log in'}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </div>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account? <Link to="/register" className="auth-link">Sign up.</Link>
          </p>
        </div>
      </div>

      <div className="app-footer">
        <p>Instagram от Facebook</p>
      </div>
    </div>
  );
}

export default Login;
