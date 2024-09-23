//express
const express = require('express')
const app = express()
// Import routes
const categoryRouter = require('./categoryroutes');
const blogRouter = require('./blogroutes');
//authentication
// const passport = require('passport');
// const setupAuth = require('./auth'); // Import the setupAuth function
// setupAuth(app);  // Call the function to set up authentication

//users
// const userschema = require('./userschema')

//database
const db = require('./db')
const bodyparser = require('body-parser')

app.use(bodyparser.json())
// app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/category', categoryRouter);
app.use('/blog', blogRouter);

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})