const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemon = require('nodemon');

// setting up the server
const app = express();
const PORT = process.env.PORT || 3001;


// Data parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static Middleware
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    const note = req.body;
    fs.readFile("./db/db.json", "utf-8").then(data) => {
        const noteListItems = [].concat(JSON.parse(data));
        note.id = noteListItems.length + 1
        noteListItems.push(note);
        return noteListItems
    }).then(noteListItems) => {
        fs.writeFile("./db/db.json", JSON.stringify(noteListItems))
        res.json(note)
    };
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