const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
});

const upload = multer({ storage: storage });

// Handle image upload
router.post('/upload', upload.single('image'), (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded.'
            });
        }
    
        // Do something with the uploaded file, e.g., save its path to a database
        const imagePath = req.file.path;
        console.log("File Path: ", imagePath);
    
        res.status(200).json({data: "File Uploaded Successfully", imagePath});
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;