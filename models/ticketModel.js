const pool = require('../config/db');

const Ticket = {
    create: async (userId, description, fileUrl, priority, category) => {
        const [result] = await pool.execute(
            `INSERT INTO tickets (user_id, description, file_url, priority, category, status) VALUES (?, ?, ?, ?, ?, 'pending')`,
            [userId, description, fileUrl, priority || 'medium', category || 'general']
        );
        return result.insertId;
    },
    findAll: async () => {
        const [rows] = await pool.execute('SELECT * FROM tickets ORDER BY created_at DESC');
        return rows;
    },
    findByUserId: async (userId) => {
        const [rows] = await pool.execute('SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM tickets WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, status, priority, assignedTo) => {
        let query = 'UPDATE tickets SET updated_at = NOW()';
        const params = [];
        if (status) { query += ', status = ?'; params.push(status); }
        if (priority) { query += ', priority = ?'; params.push(priority); }
        if (assignedTo) { query += ', assigned_to = ?'; params.push(assignedTo); }
        query += ' WHERE id = ?';
        params.push(id);
        const [result] = await pool.execute(query, params);
        return result.affectedRows;
    }
};

module.exports = Ticket;
