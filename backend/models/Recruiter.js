const mongoose = require('mongoose');
     const recruiterSchema = new mongoose.Schema({
       username: { type: String, unique: true, required: true },
       password: { type: String, required: true },
       type: { type: String, enum: ['normal', 'premium'], required: true },
     });
     module.exports = mongoose.model('Recruiter', recruiterSchema);                             