const express = require('express');
const router = express.Router();
const { getCategory, addCategory, updateCategory, deleteCategory } = require('./controller/CategoryController');

// GET request to fetch blogs
router.get('/get', getCategory);

// POST request to add a new blog
router.post('/add-category', addCategory);

// PUT request to update a blog by ID
router.put('/update/:id', updateCategory);

// DELETE request to delete a blog by ID
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;
