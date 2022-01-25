//import path & file sys packages
const path = require('path');
const fs = require('fs'); //file system package for reading & writing files
//import Express package
const express = require('express');
const app = express();

// read db.json file and saved in notes object
const { notes } = require("./db/db.json");

//port (app to use environment variable (.env) if it's been set or default port to 3000)
const PORT = process.env.PORT || 3000; 

//app.use to mount the middleware functions (express.urlencoded, express.json, & expres.static)
app.use(express.urlencoded({ extended: true })); //true: server needs to look deep for sub-array data
app.use(express.json()); //takes incoming JSON data 
app.use(express.static('public')); //use to make files in public folder static

//---------------------- API Routes ----------------------

// GET /api/notes:
app.get('/api/notes', (req, res) => {
    let notesDB = notes;
    // return all saved notes as JSON
    res.json(notesDB); // .json used to send JSON data
});

// POST /api/notes:
app.post('/api/notes', (req, res) => {
    // receive new note to save on req.body
    const newNote = req.body;
    // give each note a unique id when it's saved
    newNote.id = (notes.length).toString();
    //req.params.id + 1; //gets current id (req.parmas.id) and sequentially adds to it by adding 1
    notes.push(newNote);
    res.json(newNote);
    // add it to db.json file
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
    });
});

// DELETE /api/notes:
// receive a query parameter containing the id of a note to delete
app.delete('/api/notes/:id', (req, res) => { // :id is the query parameter
    // read all notes from the db.json file 
    let notesFile = path.join(__dirname, './db/db.json'); 
    // remove the note with the given id property
    const deleteNote = req.params.id;
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == deleteNote) {
            notes.splice(i,1);
            break;
        }
    }
    // rewrite the notes to the db.json file
    fs.writeFile(notesFile, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            throw err;
        } else {
            res.json(notes);
        }
    });
});
//---------------------- HTML Routes ----------------------
app.get('/', (req,res) => { //route to home page
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET * should return the index.html file
app.get('*', (req, res) => { // * = wildcard -> any route not defined will fall here
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//listen method...tells server to listen at "PORT"
app.listen (PORT, () => {
    //display message in terminal when server is ready
    console.log(`API server is now ready on port ${PORT}`);
})