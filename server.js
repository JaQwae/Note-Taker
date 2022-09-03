const express = require('express');
const path = require('path');

// setting up the server
const app = express();
const PORT = process.env.PORT || 3001;


// Data parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Middleware
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});




app.listen(PORT, () =>
    console.log(`Running at http://localhost:${PORT}`)
);