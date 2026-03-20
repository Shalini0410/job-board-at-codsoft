import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Employer states
    const [postedJobs, setPostedJobs] = useState([]);
    const [newJob, setNewJob] = useState({ title: '', description: '', company: '', location: '', category: '', salary: '', type: 'Full-time' });
    const [showPostForm, setShowPostForm] = useState(false);
    
    // Candidate states
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                if (user.role === 'employer') {
                    const { data } = await axios.get('http://localhost:5000/api/jobs/employer', config);
                    setPostedJobs(data);
                } else {
                    const { data } = await axios.get('http://localhost:5000/api/applications/my-applications', config);
                    setAppliedJobs(data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data');
            }
        };

        fetchDashboardData();
    }, [user, navigate]);

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('http://localhost:5000/api/jobs', newJob, config);
            setPostedJobs([...postedJobs, data]);
            setShowPostForm(false);
            setNewJob({ title: '', description: '', company: '', location: '', category: '', salary: '', type: 'Full-time' });
        } catch (error) {
            console.error('Error posting job');
        }
    };

    if (!user) return null;

    return (
        <div className="container dashboard-page animate-fade-in">
            <div className="dashboard-header">
                <h2>Welcome, {user.name}</h2>
                <p>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>

            {user.role === 'employer' ? (
                <div className="employer-dashboard">
                    <div className="dashboard-actions">
                        <h3>Your Posted Jobs</h3>
                        <button className="btn btn-primary" onClick={() => setShowPostForm(!showPostForm)}>
                            {showPostForm ? 'Cancel' : 'Post New Job'}
                        </button>
                    </div>

                    {showPostForm && (
                        <div className="post-job-form">
                            <h4>Create a New Job Listing</h4>
                            <form onSubmit={handlePostJob}>
                                <div className="form-row">
                                    <div className="form-group"><label>Job Title</label><input type="text" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} required/></div>
                                    <div className="form-group"><label>Company</label><input type="text" value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} required/></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Location</label><input type="text" value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} required/></div>
                                    <div className="form-group"><label>Category</label><input type="text" value={newJob.category} onChange={(e) => setNewJob({...newJob, category: e.target.value})} required/></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Salary Range</label><input type="text" value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})}/></div>
                                    <div className="form-group">
                                        <label>Job Type</label>
                                        <select className="form-select" value={newJob.type} onChange={(e) => setNewJob({...newJob, type: e.target.value})}>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea rows="5" className="form-textarea" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-secondary mt-2">Publish Job</button>
                            </form>
                        </div>
                    )}

                    <div className="posted-jobs-list">
                        {postedJobs.length === 0 ? (
                            <p className="no-data">You haven't posted any jobs yet.</p>
                        ) : (
                            postedJobs.map((job) => (
                                <div key={job._id} className="dashboard-item-card">
                                    <div className="item-header">
                                        <h4><Link to={`/job/${job._id}`}>{job.title}</Link></h4>
                                        <span className={job.isActive ? 'status-active' : 'status-inactive'}>{job.isActive ? 'Active' : 'Closed'}</span>
                                    </div>
                                    <div className="item-meta">
                                        <span>{job.location}</span> | <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="candidate-dashboard">
                    <h3>Your Job Applications</h3>
                    <div className="applied-jobs-list">
                        {appliedJobs.length === 0 ? (
                            <p className="no-data">You haven't applied to any jobs yet. <Link to="/jobs">Browse Jobs</Link></p>
                        ) : (
                            appliedJobs.map((app) => (
                                <div key={app._id} className="dashboard-item-card">
                                    <div className="item-header">
                                        <h4><Link to={`/job/${app.job._id}`}>{app.job.title} at {app.job.company}</Link></h4>
                                        <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                                    </div>
                                    <div className="item-meta">
                                        <span>Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
