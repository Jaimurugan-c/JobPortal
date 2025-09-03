const express = require('express');
     const User = require('../models/User');
     const jwt = require('jsonwebtoken');
     const multer = require('multer');
     const upload = multer({
       dest: 'uploads/',
       limits: { fileSize: 5 * 1024 * 1024, files: 7 },
       fileFilter: (req, file, cb) => {
         const allowedTypes = {
           'photo': ['image/jpeg', 'image/png'],
           'resume': ['application/pdf'],
           'certifications': ['application/pdf', 'image/jpeg'],
         };
         const isValid = allowedTypes[file.fieldname]?.includes(file.mimetype);
         cb(isValid ? null : new Error('Invalid file type'), isValid);
       }
     });
     const router = express.Router();

     const authMiddleware = (req, res, next) => {
       const token = req.header('Authorization')?.split(' ')[1];
       if (!token) return res.status(401).json({ message: 'No token' });
       try {
         req.user = jwt.verify(token, process.env.JWT_SECRET);
         next();
       } catch (err) {
         res.status(401).json({ message: 'Invalid token' });
       }
     };

     router.post('/submit', authMiddleware, upload.fields([
       { name: 'photo', maxCount: 1 },
       { name: 'resume', maxCount: 1 },
       { name: 'certifications', maxCount: 5 }
     ]), async (req, res) => {
       try {
         if (req.user.role !== 'user') return res.status(403).json({ message: 'Access denied' });
         const { name, email, address, experience } = req.body;
         const photo = req.files.photo ? `/uploads/${req.files.photo[0].filename}` : '';
         const resume = req.files.resume ? `/uploads/${req.files.resume[0].filename}` : '';
         const certifications = req.files.certifications ? req.files.certifications.map(file => `/uploads/${file.filename}`) : [];
         await User.findByIdAndUpdate(req.user.id, { name, email, address, photo, resume, experience, certifications }, { upsert: true });
         res.status(200).json({ message: 'Details updated' });
       } catch (err) {
         res.status(400).json({ message: err.message || 'Submission failed' });
       }
     });

     router.get('/', authMiddleware, async (req, res) => {
       try {
         if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Access denied' });
         const users = await User.find();
         if (req.user.type === 'premium') {
           return res.json(users);
         } else {
           const limitedUsers = users.map(user => ({ id: user._id, name: user.name, resume: user.resume }));
           return res.json(limitedUsers);
         }
       } catch (err) {
         res.status(500).json({ message: 'Server error' });
       }
     });

     module.exports = router;