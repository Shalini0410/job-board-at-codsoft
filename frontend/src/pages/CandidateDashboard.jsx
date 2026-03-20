import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const CandidateDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'candidate') {
            navigate('/login');
            return;
        }

        const fetchApplications = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://127.0.0.1:5000/api/applications/my-applications', config);
                setAppliedJobs(data);
            } catch (error) {
                console.error('Error fetching applications');
            }
        };

        fetchApplications();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="container dashboard-page animate-fade-in">
            <div className="dashboard-header">
                <h2>Candidate Dashboard</h2>
                <p>Welcome back, {user.name}. Track your job applications below.</p>
            </div>
            
            <div className="candidate-dashboard">
                <h3>Your Job Applications</h3>
                <div className="applied-jobs-list">
                    {appliedJobs.length === 0 ? (
                        <p className="no-data">You haven't applied to any jobs yet. <Link to="/jobs" style={{color: 'var(--primary)', textDecoration: 'underline'}}>Browse Jobs</Link></p>
                    ) : (
                        appliedJobs.map((app) => (
                            <div key={app._id} className="dashboard-item-card">
                                <div className="item-header">
                                    <h4><Link to={`/job/${app.job._id}`}>{app.job.title} at {app.job.company}</Link></h4>
                                    <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                                </div>
                                <div className="item-meta">
                                    <span>Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
                                    {app.resume && <span style={{marginLeft: '15px'}}><a href={`http://127.0.0.1:5000${app.resume}`} target="_blank" rel="noreferrer" style={{color: 'var(--primary)'}}>View Resume</a></span>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
