import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const Home = () => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/jobs?keyword=${keyword}&location=${location}&category=${category}`);
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text animate-fade-in">
                        <span className="job-count">4536+ Jobs listed</span>
                        <h1 className="hero-title">Find your Dream Job</h1>
                        <p className="hero-subtitle">We provide online instant cash loans with quick approval that suit your term length</p>
                        <button className="btn btn-secondary" onClick={() => navigate('/register')}>Upload Your Resume</button>
                    </div>
                    <div className="hero-image animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="placeholder-illustration">
                            {/* Abstract mockup to represent the image */}
                            <div className="mock-window">
                                <div className="mock-header">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-chart"></div>
                                    <div className="mock-card"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Box */}
                <div className="search-box-container container animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <form className="search-box" onSubmit={handleSearch}>
                        <div className="search-input">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-input">
                            <FaMapMarkerAlt className="search-icon" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-input">
                            <FaBriefcase className="search-icon" />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Category</option>
                                <option value="Development">Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Design">Design</option>
                                <option value="Management">Management</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-secondary find-btn">Find Job</button>
                    </form>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="container categories-section animate-fade-in">
                <div className="section-header">
                    <h2>Popular Categories</h2>
                    <p>Browse jobs by your domain of expertise.</p>
                </div>
                <div className="category-grid">
                    <div className="category-card" onClick={() => navigate('/jobs?category=Development')}>
                        <div className="category-icon dev">💻</div>
                        <h4>Development</h4>
                        <span>12+ Jobs</span>
                    </div>
                    <div className="category-card" onClick={() => navigate('/jobs?category=Design')}>
                        <div className="category-icon design">🎨</div>
                        <h4>Design</h4>
                        <span>5+ Jobs</span>
                    </div>
                    <div className="category-card" onClick={() => navigate('/jobs?category=Marketing')}>
                        <div className="category-icon market">📈</div>
                        <h4>Marketing</h4>
                        <span>8+ Jobs</span>
                    </div>
                    <div className="category-card" onClick={() => navigate('/jobs?category=Management')}>
                        <div className="category-icon management">👔</div>
                        <h4>Management</h4>
                        <span>4+ Jobs</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section animate-fade-in">
                <div className="container cta-content">
                    <div className="cta-text">
                        <h2>Are you an Employer?</h2>
                        <p>Post your job today and find the best talent for your company.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/register')}>Post a Job Now</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
