const express = require('express');
const { suggestResolution } = require('../controllers/aiController');
const { verifyToken, requireAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/suggest', verifyToken, requireAdmin, suggestResolution);

module.exports = router;
