const express = require('express');
const Candidate = require('../../Models/Candidate');

const app = express();
const UpdateWithdrawnReason = async (req, res, next) => {

    const { id, description } = req.body;
    
    if (!id || !description) {
      return res.status(400).json({ message: 'ID and description are required' });
    }

    try {
      const updatedItem = await Candidate.findByIdAndUpdate(
        id, 
        { withdrawn_reason: description }, 
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      return res.status(200).json({ 
        success: true,
        message: 'Updated successfully',
        data: updatedItem 
      });
      
    } catch (error) {
      console.error('Error updating withdrawn reason:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Internal server error',
        error: error.message 
      });
    }

}

module.exports = UpdateWithdrawnReason;