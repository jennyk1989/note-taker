//import Express package
const express = require('express');
const app = express();

//import other packages
const path = require('path');
const fs = require('fs'); //file system package for reading & writing files

//port (app to use environment variable (.env) if it's been set or default port to 3000)
const PORT = process.env.PORT || 3000; 

//app.use to mount the middleware functions (express.urlencoded, express.json, & expres.static)
app.use(express.urlencoded({ extended: true })); //true: server needs to look deep for sub-array data
app.use(express.json()); //takes incoming JSON data 
app.use(express.static('public')); //use to make files in public folder static

//---------------------- API Routes ----------------------
// read db.json file
const { notesDB } = require("./db/db.json");

// GET /api/notes:
app.get('/api/notes', (req, res) => {
    // return all saved notes as JSON
    res.json(notesDB); //response turned into JSON & saved in notes database
});

// POST /api/notes:
app.post('/api/notes', (req, res) => {
    // receive new note to save on req.body
    notesDB.push(req.body); //saves the new note in notes db by adding to the array
    // give each note a unique id when it's saved
    req.params.id = req.params.id + 1; //length of notes will change with each new note so id will be unique
    // add it to db.json file
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notesDB), (err) => {
        if (err) {
            return console.log(err)
        }
    });
    return newNote;
});

// DELETE /api/notes:
// receive a query parameter containing the id of a note to delete
app.delete('/api/notes/:id', (req, res) => { // :id is the query parameter
    // read all notes from the db.json file 
    let notesFile = path.join(__dirname, './db/db.json'); 
    // remove the note with the given id property
    const deleteNote = req.params.id;
    if (notesDB.id == deleteNote) {
        const i = indexOf(notesDB);
        notesDB.splice(i,1);
    }
    // rewrite the notes to the db.json file
    fs.writeFile(notesFile, JSON.stringify(notesDB), (err) => {
        if (err) {
            return console.log(err)
        } else {
            res.json(notesDB);
        }
    });
});
//---------------------- HTML Routes ----------------------
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