import React from 'react';
import './Blog.css';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'How to Land Your Dream Job in 2026',
            excerpt: 'Finding a job in the modern era requires a mix of skill, networking, and the right tools. Here is our top 10 tips.',
            author: 'John Doe',
            date: 'March 15, 2026',
            category: 'Career Advice'
        },
        {
            id: 2,
            title: 'Top 5 Skills Every Developer Needs',
            excerpt: 'From React to Cloud computing, we dive into the most in-demand technical skills for this year.',
            author: 'Jane Smith',
            date: 'March 10, 2026',
            category: 'Tech'
        },
        {
            id: 3,
            title: 'Remote Work: The New Normal',
            excerpt: 'Exploring the benefits and challenges of working from home in the post-pandemic digital economy.',
            author: 'Mike Johnson',
            date: 'March 5, 2026',
            category: 'Workplace'
        }
    ];

    return (
        <div className="container blog-page animate-fade-in">
            <div className="section-header">
                <h1>Our Blog</h1>
                <p>Stay updated with the latest news, career tips, and hiring trends.</p>
            </div>

            <div className="blog-grid">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-card">
                        <div className="blog-category">{post.category}</div>
                        <div className="blog-content">
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <div className="blog-meta">
                                <span>By {post.author}</span>
                                <span>{post.date}</span>
                            </div>
                            <button className="btn-text">Read More →</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
