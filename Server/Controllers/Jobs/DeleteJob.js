const Job = require('../../Models/JobModel');

const DeleteJob = async (req, res) => {
    const { job_id } = req.body;
    if (!job_id) {
        return res.status(400).json({ message: 'Job ID is required' });
    }
    try {
        const deleted = await Job.findByIdAndDelete(job_id);
        if (!deleted) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = DeleteJob; 