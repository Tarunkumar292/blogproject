const Blogs = require("../blogschema");
const slugify = require('slugify');

// Get controller
const getblogs = async (req, res) => {
    try {
        const blogs = await Blogs.find()
        res.status(200).json(blogs)
    } catch (err) {
        console.log("error in fetching data");
        res.status(500).json(err)
    }
}

// Post controller
const addblogs = async (req, res) => {
    try {
        const slug = slugify(req.body.title, { lower: true });
        const post = new Blogs({
            ...req.body,
            slug: slug
        });
        const result = await post.save();
        res.status(201).json(result);

    } catch (err) {
        console.log("Error in adding data:", err);
        res.status(500).json(err);
    }
};

// Put controller
const updateblogs = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const updatedBlog = await Blogs.findByIdAndUpdate(
            id,
            { title, slug, content },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete controller
const deleteblogs = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBlog = await Blogs.findByIdAndDelete(id);
        console.log("blog deleted successfully");
        res.status(200).json(deletedBlog);
    } catch (err) {
        console.log("Error in deleting data:", err);
        res.status(500).json(err);
    }
}

// Export all controllers
module.exports = { getblogs, addblogs, updateblogs, deleteblogs };
