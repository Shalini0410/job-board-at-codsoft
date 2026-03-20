import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const EmployerDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [postedJobs, setPostedJobs] = useState([]);
    const [newJob, setNewJob] = useState({ title: '', description: '', company: '', location: '', category: '', salary: '', type: 'Full-time' });
    const [showPostForm, setShowPostForm] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'employer') {
            navigate('/login');
            return;
        }

        const fetchJobs = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://127.0.0.1:5000/api/jobs/employer', config);
                setPostedJobs(data);
            } catch (error) {
                console.error('Error fetching dashboard data');
            }
        };

        fetchJobs();
    }, [user, navigate]);

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('http://127.0.0.1:5000/api/jobs', newJob, config);
            setPostedJobs([...postedJobs, data]);
            setShowPostForm(false);
            setNewJob({ title: '', description: '', company: '', location: '', category: '', salary: '', type: 'Full-time' });
            alert("Job Posted Successfully!");
        } catch (error) {
            console.error('Error posting job');
            alert("Failed to post job");
        }
    };

    if (!user) return null;

    return (
        <div className="container dashboard-page animate-fade-in">
            <div className="dashboard-header">
                <h2>Employer Dashboard</h2>
                <p>Welcome back, {user.name}. Manage your job listings here.</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <span className="stat-value">{postedJobs.length}</span>
                    <span className="stat-label">Total Jobs</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{postedJobs.filter(j => j.isActive).length}</span>
                    <span className="stat-label">Active Listings</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">24</span>
                    <span className="stat-label">New Applications</span>
                </div>
            </div>

            <div className="dashboard-main-grid">
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
                                    <div className="form-group"><label>Job Title</label><input type="text" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} required /></div>
                                    <div className="form-group"><label>Company</label><input type="text" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} required /></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Location</label><input type="text" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} required /></div>
                                    <div className="form-group"><label>Category</label><input type="text" value={newJob.category} onChange={(e) => setNewJob({ ...newJob, category: e.target.value })} required /></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Salary Range</label><input type="text" value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} /></div>
                                    <div className="form-group">
                                        <label>Job Type</label>
                                        <select className="form-select" value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea rows="5" className="form-textarea" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} required></textarea>
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

                <div className="dashboard-sidebar">
                    <div className="sidebar-tip-card">
                        <h4>💡 Hiring Tips</h4>
                        <ul>
                            <li>Keep job titles clear and concise.</li>
                            <li>Include salary ranges to attract more quality candidates.</li>
                            <li>Respond to applications within 48 hours.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
