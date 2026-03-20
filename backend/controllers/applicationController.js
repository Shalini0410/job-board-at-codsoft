const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            candidate: req.user._id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        let resumePath = req.user.profile?.resume; // Default to existing resume

        if (req.file) {
            // If new resume is uploaded during application
            resumePath = `/${req.file.path.replace(/\\/g, '/')}`;
            
            // Optionally update user profile
            req.user.profile.resume = resumePath;
            await req.user.save();
        }

        if (!resumePath) {
            return res.status(400).json({ message: 'Resume is required' });
        }

        const application = await Application.create({
            job: jobId,
            candidate: req.user._id,
            resume: resumePath,
            coverLetter: req.body.coverLetter || ''
        });

        res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error check log' });
    }
};

// Employer fetches applicants for their jobs
const getJobApplications = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);

        if (!job) {
             return res.status(404).json({ message: 'Job not found' });
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized, you do not own this job' });
        }

        const applications = await Application.find({ job: jobId }).populate('candidate', 'name email profile');
        res.json(applications);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Candidate fetches all jobs they applied to
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ candidate: req.user._id }).populate('job', 'title company location salary');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('job');
        
        if(!application) return res.status(404).json({message: 'Application not found'});
        
        if (application.job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        application.status = status;
        await application.save();

        res.json(application);
    } catch (error) {
         res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { applyForJob, getJobApplications, getMyApplications, updateApplicationStatus };
