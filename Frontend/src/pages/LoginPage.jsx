import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';
import logo from '../assets/cilogo.png';

const LoginPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the page they tried to visit, or dashboard by default
  const from = location.state?.from?.pathname || '/citizen/dashboard';

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: '' }));
    setGlobalError('');
  };

  const validate = () => {
    const errs = {};
    if (mode === 'signup' && !form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (mode === 'signup' && form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    setLoading(true);
    setGlobalError('');
    try {
      if (mode === 'login') {
        await login(form.email.trim(), form.password);
      } else {
        await signup(form.name.trim(), form.email.trim(), form.password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setGlobalError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (m) => {
    setMode(m);
    setForm({ name: '', email: '', password: '' });
    setFieldErrors({});
    setGlobalError('');
  };

  return (
    <div className="login-page">
      {/* Decorative blobs */}
      <div className="login-blob-1" />
      <div className="login-blob-2" />

      <div className="login-card">
        {/* Logo */}
        <Link to="/" className="login-logo">
          <img src={logo} alt="CivicBridge" className="login-logo-img" />
          <span className="login-logo-text">CivicBridge</span>
        </Link>

        {/* Tab Switcher */}
        <div className="login-tabs" role="tablist">
          <button
            type="button"
            className={`login-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
            role="tab"
          >
            Sign In
          </button>
          <button
            type="button"
            className={`login-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => switchMode('signup')}
            role="tab"
          >
            Sign Up
          </button>
        </div>

        {/* Global error */}
        {globalError && (
          <div className="login-global-error" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={16} />
            {globalError}
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {/* Name field — sign up only */}
          {mode === 'signup' && (
            <div className="login-field">
              <label className="login-label" htmlFor="name">Full Name</label>
              <div className="login-input-wrap">
                <span className="login-input-icon"><User size={16} /></span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Rahul Sharma"
                  className={`login-input ${fieldErrors.name ? 'error' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.name && (
                <span className="login-error-msg"><AlertCircle size={13} />{fieldErrors.name}</span>
              )}
            </div>
          )}

          {/* Email */}
          <div className="login-field">
            <label className="login-label" htmlFor="email">Email Address</label>
            <div className="login-input-wrap">
              <span className="login-input-icon"><Mail size={16} /></span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`login-input ${fieldErrors.email ? 'error' : ''}`}
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {fieldErrors.email && (
              <span className="login-error-msg"><AlertCircle size={13} />{fieldErrors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label" htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <span className="login-input-icon"><Lock size={16} /></span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                className={`login-input ${fieldErrors.password ? 'error' : ''}`}
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="login-pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && (
              <span className="login-error-msg"><AlertCircle size={13} />{fieldErrors.password}</span>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? (
              <><div className="btn-spinner" /> {mode === 'login' ? 'Signing in…' : 'Creating account…'}</>
            ) : (
              <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        {/* Demo hint — only on login tab */}
        {mode === 'login' && (
          <>
            <div className="login-divider">or try the demo</div>
            <div className="login-demo-hint">
              <ShieldCheck size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              <strong>Demo account:</strong> demo@civicbridge.in &nbsp;/&nbsp; demo1234
            </div>
          </>
        )}

        {/* Back to home */}
        <div className="login-footer">
          <Link to="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
