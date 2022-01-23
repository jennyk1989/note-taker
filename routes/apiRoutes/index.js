//import path and express/router packages
const fs = require('fs');
const path = require('path');
const router = require('express').Router();

//read db.json file
const notes = require('../../db/db.json');

// GET /api/notes -> 
router.get('/api/notes', (req, res) => {
    //return all saved notes as JSON
    res.json(notes); //response turned into JSON and saved as "notes"
})

// POST /api/notes ->
router.post('/api/notes', (req, res) => {
    // receive new note to save on req.body
    let newNote = req.body;
    notes.push(newNote);
    //give each note a unique id when it's saved
    newNote.id = notes.length // length of notes will always change so id will be unique
    // add it to db.json file
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"), 
        JSON.stringify({ notes }, null, 2)
    );
    return newNote;
});

module.exports = router;

/* functions: 
getNotes(), saveNote(), deleteNote(), 
renderActiveNote(),
handleNoteSave(), handleNoteDelete(), handleNoteView(),
handleNewNoteView(), handleRenderSaveBtn()
renderNoteList()
getAndRenderNotes()
*/

