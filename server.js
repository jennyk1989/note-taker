//import Express package
const express = require('express');
const app = express();

//port (app to use environment variable (.env) if it's been set or default port to 3001)
const PORT = process.env.PORT || 3005; 

//import server routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//app.use to mount the middleware functions (express.urlencoded, express.json, & expres.static)
app.use(express.urlencoded({ extended: true })); //true: server needs to look deep for sub-array data
app.use(express.json()); //takes incoming JSON data 
app.use(express.static('public')); //use to make files in public folder static

//use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listen method...tells server to listen at "PORT"
app.listen (PORT, () => {
    //display message in terminal when server is ready
    console.log(`API server is now ready on port ${PORT}`);
})