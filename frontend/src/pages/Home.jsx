import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4rem', gap: '4rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 400px' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Resolve Issues Faster Than Ever.
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '3rem', lineHeight: '1.6' }}>
          The all-in-one ticketing and support platform designed to streamline your workflow and deliver exceptional customer experiences with enterprise-grade security.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/signup" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)' }}>
            Get Started
          </Link>
          <Link to="/login" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Login
          </Link>
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '4rem' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.2rem' }}>99.9%</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Uptime</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.2rem' }}>24/7</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Support</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.2rem' }}>10k+</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Users</p>
          </div>
        </div>
      </div>
      
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
            width: '100%', maxWidth: '550px', height: 'auto', aspectRatio: '1/1',
            backgroundImage: 'url(/home_hero.png)', backgroundSize: 'cover', backgroundPosition: 'center',
            borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)'
        }} />
      </div>
    </div>
  );
};

export default Home;
