// Init
const express = require('express');
const path = require('path');

// Start app
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'build')));

// Set server to listen
app.listen(3000, () => console.log(`Server started on port 3000`));