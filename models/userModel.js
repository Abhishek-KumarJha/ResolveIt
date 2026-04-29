const pool = require('../config/db');

const User = {
    create: async (name, email, password, role = 'user') => {
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        return result.insertId;
    },
    findByEmail: async (email) => {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await pool.execute('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = User;
