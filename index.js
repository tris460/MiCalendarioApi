require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

app.use(require('./routes/users'));

mongoose.connect(process.env.MONGODB_URI) //TODO: Update URL 
    .then(() => {
        console.log('Database online');
        app.listen(process.env.PORT, () => {
            console.log('Server online on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err);
    })
