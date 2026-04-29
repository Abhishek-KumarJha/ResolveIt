const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../middlewares/authMiddleware');
const { getSummary, getCategoryStats } = require('../controllers/analyticsController');

router.get('/summary', verifyToken, requireAdmin, getSummary);
router.get('/category', verifyToken, requireAdmin, getCategoryStats);

module.exports = router;
