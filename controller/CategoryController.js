const CategoryModel = require("../categoryschema");
const slugify = require('slugify');

// Get controller
const getCategory = async (req, res) => {
    try {
        const posts = await CategoryModel.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: err.message });
    }
}

// Post controller
const addCategory = async (req, res) => {
    try {
        console.log(req.body);
        const slug = slugify(req.body.category, { lower: true });

        const post = new CategoryModel({
            ...req.body,
            slug: slug
        });

        const result = await post.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).json({ message: err.message });
    }
}

// Put controller
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const slug = req.body.title ? slugify(req.body.title, { lower: true }) : undefined;
        const updatedPost = { ...req.body, ...(slug && { slug }) };
        const post = await CategoryModel.findByIdAndUpdate(id, updatedPost, { new: true });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        console.log('Data Updated');
        res.status(200).json(post);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).json({ message: err.message });
    }
}

// Delete controller
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await CategoryModel.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        console.log('Data Deleted');
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: err.message });
    }
}

// Export all controllers
module.exports = { getCategory, addCategory, updateCategory, deleteCategory };
