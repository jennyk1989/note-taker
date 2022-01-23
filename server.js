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
const notes = require("./db/db.json");

// GET /api/notes:
app.get('/api/notes', (req, res) => {
    // return all saved notes as JSON
    res.json(notes); //response turned into JSON & saved as "notes"
});

// POST /api/notes:
app.post('/api/notes', (req, res) => {
    // receive new note to save on req.body
    let newNote = req.body;
    notes.push(newNote); //saves the new note on notes array
    // give each note a unique id when it's saved
    newNote.id = notes.length; //// length of notes will always change so id will be unique
    // add it to db.json file
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return newNote;
})
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