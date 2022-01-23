//import path and express/router packages
const path = require('path');
const router = require('express').Router();

//read db.json file
const { notes } = require('../../db/db.json');

// GET /api/notes -> 
router.get('/api/notes', (req, res) => {
    //return all saved notes as JSON
    res.json(notes); //response turned into JSON and saved as "notes"
})

// POST /api/notes ->
router.post('/api/notes', (req, res) => {

    //give each note a unique id when it's saved
    
})
// receive new note to save on req.body

// add it to db.json file

// return new note to the client




