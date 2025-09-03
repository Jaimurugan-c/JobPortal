const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');
     const dotenv = require('dotenv');
     const path = require('path');

     dotenv.config();

     const app = express();
     app.use(cors());
     app.use(express.json());
     app.use(express.urlencoded({ extended: true }));
     app.use('/uploads', express.static('uploads'));

     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.error(err));

     app.use('/api/auth', require('./routes/auth'));
     app.use('/api/users', require('./routes/users'));

     const PORT = process.env.PORT || 5000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));