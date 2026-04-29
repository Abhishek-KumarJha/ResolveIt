import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  
  const role = localStorage.getItem('role');

  useEffect(() => {
    // MOCK FOR UI
    setTimeout(() => {
      setTicket({
        id: id,
        description: "This is a detailed mock description for ticket inspection. The issue involves a complex networking error routing our primary API traffic.",
        priority: "high",
        category: "technical",
        status: "pending",
        created_at: new Date().toISOString()
      });
      setStatus("pending");
      setLoading(false);
    }, 500);
  }, [id]);

  const handleUpdate = () => {
    alert('Status updated successfully');
    setTicket({ ...ticket, status });
  };

  if (loading) return <Loader />;
  if (!ticket) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '3rem', background: 'rgba(30,41,59,0.85)', borderRadius: '24px' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Ticket #{ticket.id}</h2>
            <p style={{ color: '#94a3b8' }}>Created on {new Date(ticket.created_at).toLocaleString()}</p>
          </div>
          <span className="badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem', background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6', color: '#3b82f6' }}>{ticket.status.toUpperCase()}</span>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h4 style={{ color: '#cbd5e1', marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Issue Description</h4>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#f8fafc', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>{ticket.description}</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>Priority Level</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: ticket.priority === 'high' ? '#ef4444' : '#f8fafc', textTransform: 'capitalize' }}>{ticket.priority}</p>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>Category</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'capitalize' }}>{ticket.category}</p>
          </div>
        </div>

        {role === 'admin' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.05))', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.3)' }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.5rem' }}>Admin Controls</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Update the operational status of this ticket.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select value={status} onChange={e => setStatus(e.target.value)} style={{ flex: 1, padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(59,130,246,0.5)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <button onClick={handleUpdate} className="btn" style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '12px', fontSize: '1rem' }}>Update Status</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;
