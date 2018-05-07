const express = require('express');
const bp = require('body-parser');
const { Pool } = require('pg');

const { config } = require('./config/config');
const router = require('./routes/router');

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({extended: false}));

const pool = new Pool();

app.use('/api', router);

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});