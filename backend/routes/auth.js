const express = require('express');
     const bcrypt = require('bcryptjs');
     const jwt = require('jsonwebtoken');
     const User = require('../models/User');
     const Recruiter = require('../models/Recruiter');
     const router = express.Router();

     router.post('/user/register', async (req, res) => {
       try {
         const { username, password } = req.body;
         if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
         const existingUser = await User.findOne({ username });
         if (existingUser) return res.status(400).json({ message: 'Username already exists' });
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = new User({ username, password: hashedPassword });
         await newUser.save();
         res.status(201).json({ message: 'User registered' });
       } catch (err) {
         res.status(500).json({ message: 'Server error' });
       }
     });

     router.post('/user/login', async (req, res) => {
       try {
         const { username, password } = req.body;
         const user = await User.findOne({ username });
         if (!user || !await bcrypt.compare(password, user.password)) {
           return res.status(401).json({ message: 'Invalid credentials' });
         }
         const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
         res.json({ token });
       } catch (err) {
         res.status(500).json({ message: 'Server error' });
       }
     });

     router.post('/recruiter/register', async (req, res) => {
       try {
         const { username, password, type } = req.body;
         if (!username || !password || !['normal', 'premium'].includes(type)) {
           return res.status(400).json({ message: 'Invalid input' });
         }
         const existingRecruiter = await Recruiter.findOne({ username });
         if (existingRecruiter) return res.status(400).json({ message: 'Username already exists' });
         const hashedPassword = await bcrypt.hash(password, 10);
         const newRecruiter = new Recruiter({ username, password: hashedPassword, type });
         await newRecruiter.save();
         res.status(201).json({ message: 'Recruiter registered' });
       } catch (err) {
         res.status(500).json({ message: 'Server error' });
       }
     });

     router.post('/recruiter/login', async (req, res) => {
       try {
         const { username, password } = req.body;
         const recruiter = await Recruiter.findOne({ username });
         if (!recruiter || !await bcrypt.compare(password, recruiter.password)) {
           return res.status(401).json({ message: 'Invalid credentials' });
         }
         const token = jwt.sign({ id: recruiter._id, type: recruiter.type, role: 'recruiter' }, process.env.JWT_SECRET, { expiresIn: '1h' });
         res.json({ token });
       } catch (err) {
         res.status(500).json({ message: 'Server error' });
       }
     });

     module.exports = router;