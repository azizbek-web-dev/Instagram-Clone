import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
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

          <button 
            type="submit" 
            className={`auth-button ${formData.email && formData.fullName && formData.username && formData.password ? 'active' : ''}`}
            disabled={!formData.email || !formData.fullName || !formData.username || !formData.password}
          >
            Sign up
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
