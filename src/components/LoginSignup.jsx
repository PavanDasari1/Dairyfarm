import React, { useState } from 'react';
import { mockLogin, mockRegister } from '../utils/auth';
import { Mail, Lock, User, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function LoginSignup({ onAuthSuccess, onClose }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError('Please fill in all fields.');
    }

    const result = mockLogin(formData.email, formData.password);
    if (!result.success) {
      return setError(result.message);
    }

    localStorage.setItem('td_token', result.token);
    onAuthSuccess(result.user, result.token);
    if (onClose) onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError('Please fill in all fields.');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    const result = mockRegister(formData.username, formData.email, formData.password);
    if (!result.success) {
      return setError(result.message);
    }

    setSuccessMsg('Account registered successfully! Logging in...');
    setError('');
    
    setTimeout(() => {
      const loginResult = mockLogin(formData.email, formData.password);
      if (loginResult.success) {
        localStorage.setItem('td_token', loginResult.token);
        onAuthSuccess(loginResult.user, loginResult.token);
      }
      setSuccessMsg('');
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Modal Button */}
        <button 
          type="button" 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div className="auth-logo-area">
          <div className="auth-brand-icon">🐄</div>
          <h2>Geethika's</h2>
          <p>Organic Dairy Farm Portal</p>
        </div>

        {/* Tab Selection */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab ${isLoginTab ? 'active' : ''}`}
            onClick={() => { setIsLoginTab(true); setError(''); }}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`auth-tab ${!isLoginTab ? 'active' : ''}`}
            onClick={() => { setIsLoginTab(false); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="auth-form-container">
          {error && <div className="auth-error-alert">⚠️ {error}</div>}
          {successMsg && (
            <div className="auth-success-alert">
              <CheckCircle2 size={16} /> {successMsg}
            </div>
          )}

          {isLoginTab ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="form-control auth-input"
                    placeholder="email@farm.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    className="form-control auth-input"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                <ShieldCheck size={18} /> Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="username">Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    id="username" 
                    name="username"
                    className="form-control auth-input"
                    placeholder="Farmer Joe"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="form-control auth-input"
                    placeholder="joe@farm.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    className="form-control auth-input"
                    placeholder="Min 6 characters"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    className="form-control auth-input"
                    placeholder="Confirm password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
