// Import Mongoose
const mongoose = require('mongoose');

// Database connection URL
const dbURL = 'mongodb://localhost:27017/projectdata';

// Connect to the MongoDB database
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"))
.catch(err => console.error("Error connecting to MongoDB:", err));

const db = mongoose.connection;

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

db.once('open', () => {
    console.log("Connection to MongoDB is successful.");
});
