const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const BlogModal = require('./blogschema');

// GET request
router.get('/get', async (req, res) => {
    try {
        const posts = await BlogModal.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// POST request
router.post('/add-category', async (req, res) => {
    try {
        console.log(req.body);
        const slug = slugify(req.body.category, { lower: true });

        // Add the slug to the category data
        const post = new BlogModal({
            ...req.body,
            slug: slug // Add the slug field
        });

        const result = await post.save();
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// PUT request
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const slug = slugify(req.body.category, { lower: true });
        const updatedPost = { ...req.body, slug };
        const post = await BlogModal.findByIdAndUpdate(id, updatedPost, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        console.log('Data Updated');
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// DELETE request
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await BlogModal.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        console.log('Data Deleted');
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
