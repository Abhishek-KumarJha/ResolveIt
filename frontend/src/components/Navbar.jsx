import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ResolveIt</Link>
      <div className="nav-links">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create">New Ticket</Link>
            {role === 'admin' && <Link to="/analytics">Analytics</Link>}
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} style={{background:'transparent', border:'none', color:'#94a3b8', cursor:'pointer', marginLeft:'1.5rem', fontSize:'1rem'}}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
