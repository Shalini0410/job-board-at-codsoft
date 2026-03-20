import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">Q</span>
                    Job Board
                </Link>
                
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Browse Job</Link></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Pages section coming soon!"); }}>Pages ▾</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Blog coming soon!"); }}>Blog ▾</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Contact us at contact@jobboard.com"); }}>Contact</a></li>
                </ul>

                <div className="nav-auth">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{padding: '8px 16px'}}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Log In</Link>
                            <Link to="/register" className="btn btn-secondary">Post A Job</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
