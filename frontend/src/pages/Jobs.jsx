import React, { useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import { FaMapMarkerAlt, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';
import './Jobs.css';

const Jobs = () => {
    const { jobs, fetchJobs, loading } = useContext(JobContext);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const location = searchParams.get('location') || '';
        const category = searchParams.get('category') || '';
        fetchJobs(keyword, location, category);
    }, [searchParams]);

    return (
        <div className="container jobs-page animate-fade-in">
            <div className="jobs-header">
                <h2>Explore Latest Jobs</h2>
                <p>Showing {jobs.length} results based on your search</p>
            </div>

            {loading ? (
                <div className="loader">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="no-jobs">No jobs found matching your criteria.</div>
            ) : (
                <div className="job-grid">
                    {jobs.map(job => (
                        <div key={job._id} className="job-card">
                            <div className="job-card-header">
                                <div className="company-logo">
                                    {job.company.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="job-title"><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
                                    <div className="company-name"><FaBuilding /> {job.company}</div>
                                </div>
                            </div>
                            <div className="job-tags">
                                <span className="tag">{job.category}</span>
                                <span className="tag">{job.type}</span>
                            </div>
                            <div className="job-card-footer">
                                <div className="job-detail-item">
                                    <FaMapMarkerAlt /> {job.location}
                                </div>
                                <div className="job-detail-item">
                                    <FaMoneyBillWave /> {job.salary || 'Not specified'}
                                </div>
                            </div>
                            <Link to={`/job/${job._id}`} className="btn btn-primary full-width-btn">View Details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;
