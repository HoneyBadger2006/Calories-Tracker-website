const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Serve login.html for /login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Serve register.html for /register route
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the website at:`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://10.128.19.190:${PORT}`);
}); 