import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MOCK DATA FOR INSPECTION
    setTimeout(() => {
      setSummary({ total: 124, resolved: 89, pending: 35 });
      setCategories([
        { category: 'technical', count: 65 },
        { category: 'general', count: 40 },
        { category: 'billing', count: 19 }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Analytics Overview</h2>
        <p style={{ color: '#94a3b8' }}>Real-time insights into your organization's support performance.</p>
      </div>
      
      <div className="grid" style={{ marginBottom: '4rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(180deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
          <h3 style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Total Tickets</h3>
          <p style={{ fontSize: '4rem', fontWeight: '800', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>{summary?.total}</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(180deg, rgba(16,185,129,0.1), rgba(15,23,42,0.8))', borderColor: 'rgba(16,185,129,0.3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
          <h3 style={{ color: '#10b981', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Resolved</h3>
          <p style={{ fontSize: '4rem', fontWeight: '800', color: '#10b981', textShadow: '0 0 20px rgba(16,185,129,0.3)' }}>{summary?.resolved}</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(180deg, rgba(245,158,11,0.1), rgba(15,23,42,0.8))', borderColor: 'rgba(245,158,11,0.3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
          <h3 style={{ color: '#f59e0b', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Pending</h3>
          <p style={{ fontSize: '4rem', fontWeight: '800', color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,0.3)' }}>{summary?.pending}</p>
        </div>
      </div>

      <div className="card" style={{ padding: '3rem', background: 'rgba(30,41,59,0.5)', borderRadius: '24px' }}>
        <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem' }}>Tickets by Category</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {categories.map((c, i) => {
            const percentage = Math.round((c.count / summary.total) * 100);
            return (
              <div key={i}>
                <div className="flex-between" style={{ marginBottom: '0.8rem' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: '600', fontSize: '1.1rem' }}>{c.category} Support</span>
                  <span style={{ color: '#94a3b8', fontWeight: '500' }}>{c.count} tickets ({percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: i === 0 ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : i === 1 ? 'linear-gradient(90deg, #8b5cf6, #c084fc)' : 'linear-gradient(90deg, #ec4899, #f472b6)', borderRadius: '6px', transition: 'width 1s ease-out' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
