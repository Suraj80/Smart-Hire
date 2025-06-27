const Job = require('../../Models/JobModel');

const UpdateJob = async (req, res) => {
    const { job_id, ...updateFields } = req.body;
    if (!job_id) {
        return res.status(400).json({ message: 'Job ID is required' });
    }
    try {
        const updatedJob = await Job.findByIdAndUpdate(job_id, updateFields, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json({ updatedJob });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = UpdateJob; 