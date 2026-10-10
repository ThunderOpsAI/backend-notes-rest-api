const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const healthRoutes = require('./routes/health');
const notesRoutes = require('./routes/notes');

// Routes
app.use('/health', healthRoutes);
app.use('/notes', notesRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Backend Notes API' });
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
