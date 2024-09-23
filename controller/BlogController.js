const Blogs = require("../blogschema");
// const nodemailer = require('nodemailer');
const slugify = require('slugify');

// Get controller
const getblogs = async (req, res) => {
    try {
        // Get filter, sort, limit, and skip from query parameters
        let filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        let sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        let limit = parseInt(req.query.limit) || 10;
        let skip = parseInt(req.query.skip) || 0;

        // Get total count of blogs matching the filter
        const totalBlogs = await Blogs.countDocuments(filter);

        // Fetch blogs with the given filter, sort, limit, and skip
        let blogs = await Blogs.find(filter).sort(sort).limit(limit).skip(skip);

        // Return the fetched blogs
        res.json({
            totalBlogs,
            limit,
            skip,
            currentPage: Math.ceil(skip / limit) + 1,
            totalPages: Math.ceil(totalBlogs / limit),
            data: blogs
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching blogs' });
    }
};

// Post controller
const addblogs = async (req, res) => {
    try {
        const slug = slugify(req.body.title, { lower: true });
        const post = new Blogs({
            ...req.body,
            slug: slug
        });
        const result = await post.save();
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465, 
        //     secure: true, 
        //     auth: {
        //         user: 'sipab23817@exweme.com',
        //         pass: 'Admin',
        //     },
        // })

        // // Send email notification
        // const mailOptions = {
        //     from: 'sipab23817@exweme.com',
        //     to: 'kumartarun2920@example.com',
        //     subject: 'New Blog Post Created',
        //     text: `A new blog post has been created:\n\nTitle: ${req.body.title}\nSlug: ${slug}\nContent: ${req.body.content}`,
        // };

        // await transporter.sendMail(mailOptions);

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
