module.exports = (err, req, res, next) => {
    console.error(err.stack);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds the 10MB limit.' });
    }
    res.status(500).json({ message: err.message || 'Internal Server Error' });
};
