const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const notesRouter = require('./routes/notes.js');

// Handles Async Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// setting up the server
const app = express();
const PORT = process.env.PORT || 3001;

// Data parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static Middleware
app.use(express.static('public'));

// Links to the routes
app.use('/api/notes', notesRouter);

// app.get("/api/notes", (req, res) => {
//     readFileAsync("./db/db.json", "utf-8")
//         .then((data) => {
//             noteListItems = [].concat(JSON.parse(data));
//             res.json(noteListItems);
//     })
// });

// app.post("/api/notes", (req, res) => {
//     const note = req.body;
//     readFileAsync("./db/db.json", "utf-8")
//         .then((data) => {
//             const noteListItems = [].concat(JSON.parse(data));
//             note.id = noteListItems.length + 1
//             noteListItems.push(note);
//             return noteListItems
//         }).then((noteListItems) => {
//             writeFileAsync("./db/db.json", JSON.stringify(noteListItems))
//             res.json(note)
//         });
// });

// app.delete("/api/notes/:id", (req, res) => {
//     const let deleteID = parseInt()
//     readFileAsync("./db/db.json", "utf-8")
//         .then((data) => {
//             const noteListItems = [].concat(JSON.parse(data));
//             note.id = noteListItems.length + 1
//             noteListItems.push(note);
//             return noteListItems
//         }).then((noteListItems) => {
//             writeFileAsync("./db/db.json", JSON.stringify(noteListItems))
//             res.json(note)
//         });
// });


// GET Route for notes page
app.get("/", (req, res) => {
    readFileAsync("./db/db.json", "utf-8")
        .then((data) => {
            noteListItems = [].concat(JSON.parse(data));
            res.json(noteListItems);
    })
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