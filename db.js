//Database connection
const mongoose = require('mongoose')
const mongooseURL = mongoose.connect('mongodb://localhost:27017/blogdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb is connected"))
.catch(err => console.error("error"));

const db = mongoose.connection