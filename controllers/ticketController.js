const Ticket = require('../models/ticketModel');

const createTicket = async (req, res, next) => {
    try {
        const { description, priority, category } = req.body;
        if (!description) return res.status(400).json({ message: 'Description is required.' });

        const fileUrl = req.file?.location || null;
        const insertId = await Ticket.create(req.user.id, description, fileUrl, priority, category);

        res.status(201).json({ message: 'Ticket created', data: { id: insertId, description, fileUrl, status: 'pending' } });
    } catch (error) { next(error); }
};

const getTickets = async (req, res, next) => {
    try {
        const tickets = req.user.role === 'admin' ? await Ticket.findAll() : await Ticket.findByUserId(req.user.id);
        res.status(200).json({ data: tickets });
    } catch (error) { next(error); }
};

const updateTicket = async (req, res, next) => {
    try {
        const { status, priority, assigned_to } = req.body;
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });

        await Ticket.update(req.params.id, status, priority, assigned_to);
        res.status(200).json({ message: 'Ticket updated successfully.' });
    } catch (error) { next(error); }
};

module.exports = { createTicket, getTickets, updateTicket };
