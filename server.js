const express = require('express');
const path = require('path');
const fs = require('fs');

// setting up the server
const app = express();
const PORT = process.env.PORT || 3001;


// Data parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static Middleware
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    //'fs' to read file from db folder where users data is saved
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});



// GET Route for notes HTML page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// GET Route for landing page HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () =>
    console.log(`Running at http://localhost:${PORT}`)
);