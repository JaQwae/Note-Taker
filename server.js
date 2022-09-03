const express = require('express');
const path = require('path');

// setting up the server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => res.send('Local server set up'));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);