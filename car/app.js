
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);


const app  = express();

const carRoutes = require('./api/routes/cars');
const userRoutes = require('./api/routes/users');


mongoose.connect(
    'ConncectionStringPart1:' +
    process.env.hasloSamochodowe +
    'ConncectionStringPart2', 
    { useNewUrlParser: true, useUnifiedTopology: true}
);

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use('/cars',carRoutes);
app.use('/users', userRoutes);


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({komunikat: err.message });
});

module.exports = app;


