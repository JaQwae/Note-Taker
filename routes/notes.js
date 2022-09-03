const express = require('express');
const notes = express.Router();

notes
.route('/api/notes')
.get('/', (req, res) =>
readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
)
.post('/', (req, res) =>
readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
)
// .delete('/', (req, res) =>
// readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
// );


module.exports = notes;