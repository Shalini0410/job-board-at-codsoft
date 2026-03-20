const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        const { title, description, company, location, category, salary, requirements } = req.body;

        const job = await Job.create({
            title,
            description,
            company,
            location,
            category,
            salary,
            requirements,
            postedBy: req.user._id
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const location = req.query.location ? {
            location: {
                $regex: req.query.location,
                $options: 'i'
            }
        } : {};
        
        const category = req.query.category ? { category: req.query.category } : {};

        const jobs = await Job.find({ ...keyword, ...location, ...category }).populate('postedBy', 'name email');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { createJob, getJobs, getJobById, getEmployerJobs };
