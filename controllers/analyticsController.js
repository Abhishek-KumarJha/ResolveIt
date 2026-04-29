const Ticket = require('../models/ticketModel');

const getSummary = async (req, res, next) => {
    try {
        const summary = await Ticket.getAnalyticsSummary();
        res.status(200).json({
            message: 'Analytics summary fetched successfully.',
            data: summary
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryStats = async (req, res, next) => {
    try {
        const stats = await Ticket.getAnalyticsByCategory();
        res.status(200).json({
            message: 'Category analytics fetched successfully.',
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSummary,
    getCategoryStats
};
