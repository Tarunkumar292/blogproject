const express = require('express');
const router = express.Router();
const { getblogs, addblogs, updateblogs, deleteblogs } = require('./controller/BlogController');

// GET request to fetch blogs
router.get('/get', getblogs);

// POST request to add a new blog
router.post('/add', addblogs);

// PUT request to update a blog by ID
router.put('/update/:id', updateblogs);

// DELETE request to delete a blog by ID
router.delete('/delete/:id', deleteblogs);

module.exports = router;
