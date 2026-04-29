const Complaint = require('../models/complaintModel');

const createComplaint = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required.' });
        }

        let fileUrl = null;
        if (req.file && req.file.location) {
            fileUrl = req.file.location;
        }

        const insertId = await Complaint.create(name, description, fileUrl);
        
        res.status(201).json({
            message: 'Complaint created successfully.',
            data: {
                id: insertId,
                name,
                description,
                file_url: fileUrl,
                status: 'pending'
            }
        });
    } catch (error) {
        next(error);
    }
};

const getAllComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.findAll();
        res.status(200).json({
            message: 'Complaints fetched successfully.',
            data: complaints
        });
    } catch (error) {
        next(error);
    }
};

const updateComplaintStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }

        const validStatuses = ['pending', 'in_progress', 'resolved', 'closed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided.' });
        }

        const affectedRows = await Complaint.updateStatus(id, status);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        res.status(200).json({
            message: 'Complaint status updated successfully.',
            data: { id, status }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus
};
