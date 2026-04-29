import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateTicket = () => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // MOCK SUBMISSION (since DB is down, we just simulate network latency)
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ 
            width: '100%', height: '550px', borderRadius: '24px', 
            backgroundImage: 'url(/create_ticket.png)', backgroundSize: 'cover', 
            backgroundPosition: 'center', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }} />
      </div>
      
      <div className="card" style={{ flex: '1 1 400px', background: 'rgba(30, 41, 59, 0.85)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: '#fff' }}>Submit Request</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Provide details about your issue and we'll get it sorted.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: '500' }}>Issue Description</label>
            <textarea 
              rows="5" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
              placeholder="Describe the problem in detail..."
              style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '1rem' }}
            />
          </div>
          
          <div className="flex-between" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: '500' }}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '1rem' }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: '500' }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '1rem' }}>
                <option value="general">General</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Sales</option>
              </select>
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: '500' }}>Attachments (Optional)</label>
            <input type="file" onChange={e => setFile(e.target.files[0])} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '12px', color: '#cbd5e1', cursor: 'pointer' }} />
          </div>
          
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(59,130,246,0.4)' }}>
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
