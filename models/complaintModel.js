const pool = require('../config/db');

const Complaint = {
    create: async (name, description, fileUrl) => {
        const [result] = await pool.execute(
            'INSERT INTO complaints (name, description, file_url) VALUES (?, ?, ?)',
            [name, description, fileUrl]
        );
        return result.insertId;
    },

    findAll: async () => {
        const [rows] = await pool.execute(
            'SELECT * FROM complaints ORDER BY created_at DESC'
        );
        return rows;
    },

    findById: async (id) => {
        const [rows] = await pool.execute(
            'SELECT * FROM complaints WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    updateStatus: async (id, status) => {
        const [result] = await pool.execute(
            'UPDATE complaints SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows;
    }
};

module.exports = Complaint;
