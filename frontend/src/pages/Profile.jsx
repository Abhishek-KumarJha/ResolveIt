import React from 'react';

const Profile = () => {
  const role = localStorage.getItem('role');
  
  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>My Profile</h2>
      <div style={{ marginTop: '2rem' }}>
        <div className="flex-between" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '1rem' }}>
          <strong style={{ color: '#94a3b8' }}>Account Role</strong>
          <span className="badge" style={{ borderColor: '#3b82f6', color: '#3b82f6' }}>{role}</span>
        </div>
        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
          You are currently logged in. To manage your specific account details or change your password, contact an administrator.
        </p>
      </div>
    </div>
  );
};

export default Profile;
