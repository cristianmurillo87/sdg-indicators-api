const express = require('express');
const bp = require('body-parser');
const { Pool } = require('pg');

const { config } = require('./config/config');
const router = require('./routes/router');

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

const pool = new Pool();

app.use('/api', router);

module.exports = app;