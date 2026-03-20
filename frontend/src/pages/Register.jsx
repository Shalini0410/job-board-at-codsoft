import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('candidate');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card animate-fade-in">
                <h2>Create an Account</h2>
                <p>Join our platform as a candidate looking for jobs, or an employer looking for talent.</p>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="user@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Create a strong password"
                        />
                    </div>
                    <div className="form-group">
                        <label>I am a...</label>
                        <div className="role-selector">
                            <label className={`role-option ${role === 'candidate' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="candidate" 
                                    checked={role === 'candidate'}
                                    onChange={() => setRole('candidate')}
                                />
                                Candidate
                            </label>
                            <label className={`role-option ${role === 'employer' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="employer" 
                                    checked={role === 'employer'}
                                    onChange={() => setRole('employer')}
                                />
                                Employer
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn">Register</button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
