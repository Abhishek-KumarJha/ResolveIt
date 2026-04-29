const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { verifyToken, requireAdmin } = require('../middlewares/authMiddleware');
const {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus
} = require('../controllers/complaintController');

// Anyone can create a complaint
router.post('/', upload.single('file'), createComplaint);

// Only admins can view all complaints and update status
router.get('/', verifyToken, requireAdmin, getAllComplaints);
router.put('/:id', verifyToken, requireAdmin, updateComplaintStatus);

module.exports = router;
