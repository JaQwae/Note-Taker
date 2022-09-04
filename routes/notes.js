const express = require('express');
const notesRouter = require('express').Router();

const app = express();

app.get("/", (req, res) => {
    readFileAsync("./db/db.json", "utf-8")
        .then((data) => {
            noteListItems = [].concat(JSON.parse(data));
            res.json(noteListItems);
    })
});

app.post("/", (req, res) => {
    const note = req.body;
    readFileAsync("./db/db.json", "utf-8")
        .then((data) => {
            const noteListItems = [].concat(JSON.parse(data));
            note.id = noteListItems.length + 1
            noteListItems.push(note);
            return noteListItems
        }).then((noteListItems) => {
            writeFileAsync("./db/db.json", JSON.stringify(noteListItems))
            res.json(note)
        });
});

module.exports = notesRouter;