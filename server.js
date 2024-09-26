//express
const express = require('express');
const app = express();
// Import routes
const categoryRouter = require('./categoryroutes');
const blogRouter = require('./blogroutes');
const userRouter = require('./userroutes');

//database
const db = require('./db'); // Assuming this connects to the database

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
