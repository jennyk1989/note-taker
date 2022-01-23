/* HTML routes that should be created:
GET /notes should return the notes.html file.
GET * should return the index.html file.
*/
//required packages
const path = require('path');
const router = require('express').Router();

// GET /notes should return the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET * should return the index.html file
router.get('/', (req, res) => { // * = / -> any route not defined will fall here
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;