import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1 className="instagram-logo">Instagram</h1>
            <p className="forgot-success-text">
              Check your email. We've sent you a link to reset your password.
            </p>
          </div>

          <div className="auth-footer">
            <Link to="/login" className="auth-button-link">
              Back to Log in
            </Link>
          </div>
        </div>

        <div className="app-footer">
          <p>Instagram от Facebook</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <Link to="/login" className="back-link">← Back</Link>
          <h1 className="instagram-logo">Instagram</h1>
          <p className="forgot-subtitle">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <button
            type="submit"
            className={`auth-button ${email ? 'active' : ''}`}
            disabled={!email}
          >
            Send Login Link
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Remember your password? <Link to="/login" className="auth-link">Log in.</Link>
          </p>
        </div>
      </div>

      <div className="app-footer">
        <p>Instagram от Facebook</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
