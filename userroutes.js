const express = require('express');
const router = express.Router();
const { signupuser, updatepass, loginuser } = require('./controller/UserController');

// Signup user
router.post('/signup', signupuser);

// Get user profile (You can uncomment when needed)
// router.get('/profile', getuser);

// Update user password by ID
router.put('/profile/update-password/:id', updatepass);

// Login user (use POST instead of DELETE)
router.post('/login', loginuser);

module.exports = router;
