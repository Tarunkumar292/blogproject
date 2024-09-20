//express
const express = require('express')
const app = express()
// Import routes
const categoryRouter = require('./categoryroutes');
//database
const db = require('./db')
const bodyparser = require('body-parser')

app.use(bodyparser.json())
// app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/category', categoryRouter);

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})