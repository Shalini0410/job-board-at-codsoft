const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');
const dns = require('dns');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const seedMoreJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for bulk seeding...');

        let employer = await User.findOne({ role: 'employer' });
        if (!employer) {
            employer = await User.create({
                name: 'JobBoard Partner',
                email: 'partner@jobboard.com',
                password: 'password123',
                role: 'employer'
            });
        }

        const moreJobs = [
            { title: 'Full Stack React Developer', company: 'WebSolutions', location: 'Remote', category: 'Development', salary: '$90k - $120k', description: 'Experience in MERN stack required.', postedBy: employer._id },
            { title: 'Digital Marketing Specialist', company: 'GrowFast', location: 'New York', category: 'Marketing', salary: '$60k - $80k', description: 'Manage SEO and social media campaigns.', postedBy: employer._id },
            { title: 'Graphic Designer', company: 'PixelPerfect', location: 'Austin, TX', category: 'Design', salary: '$70k - $90k', description: 'Create stunning visuals for our brand.', postedBy: employer._id },
            { title: 'Customer Support Lead', company: 'HelpCenter', location: 'Remote', category: 'Customer Service', salary: '$50k - $70k', description: 'Lead our support team to success.', postedBy: employer._id },
            { title: 'Product Manager', company: 'Productively', location: 'San Francisco', category: 'Management', salary: '$140k - $180k', description: 'Drive product vision and roadmap.', postedBy: employer._id },
            { title: 'Data Scientist', company: 'LogicData', location: 'Chicago', category: 'Data Science', salary: '$130k - $170k', description: 'Analyze complex data sets for insights.', postedBy: employer._id },
            { title: 'Java Backend Developer', company: 'EnterpriseIT', location: 'Remote', category: 'Development', salary: '$110k - $140k', description: 'Build enterprise-grade Java applications.', postedBy: employer._id },
            { title: 'HR Manager', company: 'PeopleFirst', location: 'London, UK', category: 'Human Resources', salary: '£50k - £70k', description: 'Manage our global talent acquisition.', postedBy: employer._id },
            { title: 'QA Automation Engineer', company: 'Tested.io', location: 'Remote', category: 'Development', salary: '$80k - $110k', description: 'Ensure software quality with automation.', postedBy: employer._id },
            { title: 'Sales Executive', company: 'DealClose', location: 'Miami, FL', category: 'Sales', salary: '$60k + Commission', description: 'Drive sales growth in the SE region.', postedBy: employer._id }
        ];

        await Job.insertMany(moreJobs);
        console.log('Successfully added 10 more jobs!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedMoreJobs();
