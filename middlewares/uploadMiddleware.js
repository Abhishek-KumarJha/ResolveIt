const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3');
require('dotenv').config();

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
        key: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    }),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;
