//express
const express = require('express');
const app = express();
// Import routes
const categoryRouter = require('./categoryroutes');
const blogRouter = require('./blogroutes');
const userRouter = require('./userroutes');

//database
const db = require('./db')
const bodyparser = require('body-parser')

app.use(bodyparser.json())
// app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use('/category', categoryRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
