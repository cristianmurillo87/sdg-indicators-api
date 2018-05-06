const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send({
        name : "Cristian",
        likes : [
            "Coding",
            "Football",
            "Girls"
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : "Error procesing the request"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});