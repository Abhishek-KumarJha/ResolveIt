const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        if (!process.env.EMAIL_USER) {
            console.log(`[Mock Email] To: ${to} | Subject: ${subject} | Body: ${text}`);
            return;
        }
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Ticketing System" <noreply@example.com>',
            to,
            subject,
            text
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
