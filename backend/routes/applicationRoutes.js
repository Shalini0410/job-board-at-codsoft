const express = require('express');
const router = express.Router();
const { applyForJob, getJobApplications, getMyApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, employerOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Candidate routes
router.post('/:jobId/apply', protect, upload.single('resume'), applyForJob);
router.get('/my-applications', protect, getMyApplications);

// Employer routes
router.get('/job/:jobId', protect, employerOnly, getJobApplications);
router.put('/:id/status', protect, employerOnly, updateApplicationStatus);

module.exports = router;
