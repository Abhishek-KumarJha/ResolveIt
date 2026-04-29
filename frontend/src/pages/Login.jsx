import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // OFFLINE MOCK BYPASS
    if (email === 'demo@admin.com' && password === 'admin123') {
      localStorage.setItem('token', 'mock_admin_token_123');
      localStorage.setItem('role', 'admin');
      window.location.href = '/dashboard'; 
      return;
    }
    
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      window.location.href = '/dashboard'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Note: If database is offline, use demo@admin.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ 
          maxWidth: '420px', width: '100%', padding: '2.5rem', 
          background: 'rgba(30, 41, 59, 0.85)', backdropFilter: 'blur(16px)', 
          borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>Welcome Back</h2>
          <p style={{ color: '#94a3b8' }}>Please enter your details to sign in.</p>
        </div>
        
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#93c5fd' }}>
          <strong>Demo Access:</strong> email: <code>demo@admin.com</code> | password: <code>admin123</code>
        </div>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="demo@admin.com"
              style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ 
            width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
            color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.05rem', 
            fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)'
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ marginTop: '2rem', textAlign: 'center', color: '#94a3b8' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '500' }}>Create one now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
