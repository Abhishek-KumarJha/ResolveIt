const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { verifyToken, requireAdmin } = require('../middlewares/authMiddleware');
const { createTicket, getTickets, updateTicket } = require('../controllers/ticketController');

router.post('/', verifyToken, upload.single('file'), createTicket);
router.get('/', verifyToken, getTickets);
router.put('/:id', verifyToken, requireAdmin, updateTicket);

module.exports = router;
