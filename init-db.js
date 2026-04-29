const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
    const pool = mysql.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    await pool.query(`USE \`${process.env.DB_NAME}\``);
    
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    
    await pool.query(`CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        description TEXT NOT NULL,
        file_url TEXT,
        priority VARCHAR(50) DEFAULT 'medium',
        category VARCHAR(100) DEFAULT 'general',
        status VARCHAR(50) DEFAULT 'pending',
        assigned_to INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
    )`);
    console.log("DB Init Success");
    process.exit(0);
}
initDB().catch(console.error);
