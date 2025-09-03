const mongoose = require('mongoose'); 
     const userSchema = new mongoose.Schema({
       username: { type: String, unique: true, required: true },
       password: { type: String, required: true },
       name: String,
       email: String,
       address: String,
       photo: String,
       resume: String,
       experience: String,
       certifications: [String],
     });
     module.exports = mongoose.model('User', userSchema);