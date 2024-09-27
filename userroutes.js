const express = require('express');
const router = express.Router();
const { signupuser, updatepass, loginuser } = require('./controller/UserController');
// const authMiddleware = require('./auth');  // Uncomment when ready

// Signup user
router.post('/signup', signupuser);

// Update user password by ID (protected route)
router.put('/updatepass/:id', updatepass); 

// Login user
router.post('/login', loginuser);

module.exports = router;
