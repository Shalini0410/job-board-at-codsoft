import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaBriefcase } from 'react-icons/fa';
import './JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:5000/api/jobs/${id}`);
                setJob(data);
            } catch (error) {
                setMessage({ text: 'Error fetching job details', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        
        setApplying(true);
        try {
            const formData = new FormData();
            if (resumeFile) formData.append('resume', resumeFile);
            if (coverLetter) formData.append('coverLetter', coverLetter);
            
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            };
            
            await axios.post(`http://127.0.0.1:5000/api/applications/${id}/apply`, formData, config);
            setMessage({ text: 'Application submitted successfully!', type: 'success' });
            // Hide the apply form
            setApplying(false);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Error applying to job', type: 'error' });
            setApplying(false);
        }
    };

    if (loading) return <div className="loader">Loading...</div>;
    if (!job) return <div className="no-jobs">Job not found</div>;

    return (
        <div className="container job-details-page animate-fade-in">
            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}
            
            <div className="job-details-grid">
                <div className="job-main-content">
                    <div className="job-header-card">
                        <div className="job-title-section">
                            <div className="company-logo-large">
                                {job.company.charAt(0)}
                            </div>
                            <div>
                                <h1>{job.title}</h1>
                                <div className="job-meta">
                                    <span><FaBuilding /> {job.company}</span>
                                    <span><FaMapMarkerAlt /> {job.location}</span>
                                    <span><FaClock /> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="job-description-card">
                        <h2>Job Description</h2>
                        <p className="description-text">{job.description}</p>
                        
                        {job.requirements && job.requirements.length > 0 && (
                            <>
                                <h2>Requirements</h2>
                                <ul className="requirements-list">
                                    {job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>

                <div className="job-sidebar">
                    <div className="sidebar-card">
                        <h3>Job Overview</h3>
                        <div className="overview-item">
                            <FaMoneyBillWave className="icon" />
                            <div>
                                <h4>Salary</h4>
                                <p>{job.salary || 'Not specified'}</p>
                            </div>
                        </div>
                        <div className="overview-item">
                            <FaBriefcase className="icon" />
                            <div>
                                <h4>Job Type</h4>
                                <p>{job.type || 'Full-Time'}</p>
                            </div>
                        </div>
                        <div className="overview-item">
                            <FaMapMarkerAlt className="icon" />
                            <div>
                                <h4>Location</h4>
                                <p>{job.location}</p>
                            </div>
                        </div>

                        {!user ? (
                            <Link to="/login" className="btn btn-primary full-width-btn mt-4">Login to Apply</Link>
                        ) : user.role === 'candidate' ? (
                            applying ? (
                                <form className="apply-form mt-4" onSubmit={handleApply}>
                                    <h4>Apply for this job</h4>
                                    <div className="form-group">
                                        <label>Resume (PDF, DOC)</label>
                                        <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} required={!user.profile?.resume}/>
                                        {user.profile?.resume && <small>Leave empty to use existing resume.</small>}
                                    </div>
                                    <div className="form-group">
                                        <label>Cover Letter</label>
                                        <textarea 
                                            rows="4" 
                                            value={coverLetter} 
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            placeholder="Why are you a good fit?"
                                            style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-secondary full-width-btn">Submit Application</button>
                                    <button type="button" className="btn btn-outline full-width-btn mt-2" onClick={() => setApplying(false)}>Cancel</button>
                                </form>
                            ) : (
                                <button className="btn btn-primary full-width-btn mt-4" onClick={() => setApplying(true)}>Apply Now</button>
                            )
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
