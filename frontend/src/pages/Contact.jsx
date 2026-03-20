import React, { useState } from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="container contact-page animate-fade-in">
            <div className="section-header">
                <h1>Contact Us</h1>
                <p>Have questions? We'd love to hear from you.</p>
            </div>

            <div className="contact-grid">
                <div className="contact-info">
                    <div className="info-card">
                        <FaPhone className="info-icon" />
                        <div>
                            <h3>Call Us</h3>
                            <p>+1 (234) 567-890</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <FaEnvelope className="info-icon" />
                        <div>
                            <h3>Email Us</h3>
                            <p>contact@jobboard.com</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <FaMapMarkerAlt className="info-icon" />
                        <div>
                            <h3>Visit Us</h3>
                            <p>123 Career Street, Innovation Hub<br />San Francisco, CA 94103</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
