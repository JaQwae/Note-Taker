const express = require('express');
const notesRouter = require('express').Router();
const fs = require('fs');
const util = require('util');

// Handles Async Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Get and joins notes saved
notesRouter.get("/", (req, res) => {
    readFileAsync("./db/db.json", "utf-8")
        .then((data) => {
            noteListItems = [].concat(JSON.parse(data));
            res.json(noteListItems);
    })
});

// Adding notes
notesRouter.post("/", (req, res) => {
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

// Deleting notes
notesRouter.delete("/:id", (req, res) => {
    const noteListItems = JSON.parse(readFileAsync("./db/db.json"));
    const deleteNote = noteListItems.filter((rmvNote) => rmvNote.id !== req.params.id);
    writeFileAsync("./db/db.json", JSON.stringify(deleteNote))
    res.json(deleteNote)
});

// Exports
module.exports = notesRouter;