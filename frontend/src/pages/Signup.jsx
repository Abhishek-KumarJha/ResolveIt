import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>Create Account</h2>
          <p style={{ color: '#94a3b8' }}>Get started with your free account.</p>
        </div>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleSignup}>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>Full Name</label>
            <input 
              type="text" 
              onChange={e => setForm({...form, name: e.target.value})} 
              required 
              placeholder="John Doe"
              style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>Email Address</label>
            <input 
              type="email" 
              onChange={e => setForm({...form, email: e.target.value})} 
              required 
              placeholder="name@company.com"
              style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>Password</label>
            <input 
              type="password" 
              onChange={e => setForm({...form, password: e.target.value})} 
              required 
              minLength="6"
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p style={{ marginTop: '2rem', textAlign: 'center', color: '#94a3b8' }}>
          Already have an account? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '500' }}>Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
