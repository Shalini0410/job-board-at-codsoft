const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, getEmployerJobs } = require('../controllers/jobController');
const { protect, employerOnly } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, employerOnly, createJob);
router.route('/employer').get(protect, employerOnly, getEmployerJobs);
router.route('/:id').get(getJobById);

module.exports = router;
