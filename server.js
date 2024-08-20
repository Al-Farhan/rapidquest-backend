require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const connectDb = require('./config/dbConn');

const app = express();
const PORT = process.env.PORT || 3500;

connectDb();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/dashboard', require('./routes/dashboardRoutes'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 not found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})

mongoose.connection.on('error', err => {
    console.log(err);
})