const express = require('express');
const CandidateRemarks = require('../../Models/Comment.js');
const GetComments = async (req, res, next) => {
    try {
        const { id } = req.body;
        
        // Use async/await instead of callbacks
        const candidate = await CandidateRemarks.findOne({ CandidateID: id });
        
        if (!candidate) {
            return res.status(404).json({ message: "No comments found for this candidate" });
        }

        return res.status(200).json(candidate);
    } catch (error) {
        console.error("Error in GetComments:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
module.exports = GetComments;