import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

const MOCK_DATA = [
  { id: 101, description: 'Cannot access the payment gateway in the production environment. It keeps throwing a 503 error.', status: 'pending', priority: 'high', category: 'technical', created_at: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: 102, description: 'Need to update the billing address for the enterprise account to our new corporate headquarters.', status: 'in_progress', priority: 'medium', category: 'billing', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 103, description: 'The UI on the mobile application is misaligned when using the dark mode theme on iOS 16.', status: 'resolved', priority: 'low', category: 'general', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 104, description: 'Requesting permission access for the new marketing contractor to view the analytics dashboard.', status: 'pending', priority: 'medium', category: 'general', created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 105, description: 'Critical security vulnerability found in the legacy authentication module. Immediate patch required.', status: 'in_progress', priority: 'high', category: 'technical', created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
];

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets');
        if (res.data?.data && res.data.data.length > 0) {
          setTickets(res.data.data);
        } else {
          setTickets(MOCK_DATA);
        }
      } catch (err) {
        console.error(err);
        setTickets(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const highPriorityCount = tickets.filter(t => t.priority === 'high').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Banner Section */}
      <div style={{ 
        width: '100%', 
        height: '250px', 
        borderRadius: '16px', 
        backgroundImage: 'url(/banner.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.2))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Command Center</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '500px' }}>Monitor incoming requests, prioritize critical tasks, and resolve issues with maximum efficiency.</p>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))' }}>
          <div style={{ background: 'rgba(59,130,246,0.2)', padding: '1rem', borderRadius: '12px', color: '#3b82f6', fontSize: '1.5rem' }}>📊</div>
          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Tickets</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{tickets.length}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))' }}>
          <div style={{ background: 'rgba(239,68,68,0.2)', padding: '1rem', borderRadius: '12px', color: '#ef4444', fontSize: '1.5rem' }}>🔥</div>
          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase' }}>High Priority</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{highPriorityCount}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))' }}>
          <div style={{ background: 'rgba(16,185,129,0.2)', padding: '1rem', borderRadius: '12px', color: '#10b981', fontSize: '1.5rem' }}>✅</div>
          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase' }}>Resolved</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{resolvedCount}</p>
          </div>
        </div>
      </div>

      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h2>Recent Activity</h2>
        <Link to="/create" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)' }}>+ New Ticket</Link>
      </div>

      <div className="card flex-between" style={{ marginBottom: '2rem', gap: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <input 
          type="text" 
          placeholder="Search issue descriptions..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ margin: 0, border: 'none', background: 'rgba(255,255,255,0.05)' }}
        />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ margin: 0, maxWidth: '200px', border: 'none', background: 'rgba(255,255,255,0.05)' }}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="grid">
        {filteredTickets.map(t => (
          <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(59,130,246,0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge" style={{ borderColor: t.status === 'resolved' ? '#10b981' : t.status === 'pending' ? '#3b82f6' : '#f59e0b', color: t.status === 'resolved' ? '#10b981' : t.status === 'pending' ? '#3b82f6' : '#f59e0b', background: 'rgba(0,0,0,0.3)' }}>{t.status.replace('_', ' ')}</span>
                {t.priority === 'high' && <span className="badge" style={{ borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}>High</span>}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>#{t.id} • {new Date(t.created_at).toLocaleDateString()}</span>
            </div>
            <p style={{ marginBottom: '1.5rem', color: '#e2e8f0', lineHeight: '1.6' }}>{t.description.length > 90 ? t.description.substring(0, 90) + '...' : t.description}</p>
            <div style={{ marginTop: 'auto' }}>
              <Link to={`/ticket/${t.id}`} className="btn" style={{ display: 'block', width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>View Ticket Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
