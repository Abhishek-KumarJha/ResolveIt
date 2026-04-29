const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password required.' });
        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });

        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role === 'admin' ? 'admin' : 'user';
        const insertId = await User.create(name, email, hashedPassword, userRole);

        res.status(201).json({ message: 'User registered successfully', data: { id: insertId, name, email, role: userRole } });
    } catch (error) { next(error); }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token, user: { id: user.id, role: user.role } });
    } catch (error) { next(error); }
};

module.exports = { register, login };
