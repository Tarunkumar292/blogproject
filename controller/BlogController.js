const Blogs = require("../blogschema");
const slugify = require('slugify');

// Get controller
const getblogs = async (req, res) => {
    try {
        // Filter, search, sort, and pagination
        const filter = req.query.filter || {};
        const search = req.query.search || '';
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        // 1. Create the filter object
        let filterObj = {};
        if (filter) {
            try {
                // filterObj = JSON.parse(filter);
            } catch (err) {
                console.log("Error parsing filter:", err);
                return res.status(400).json({ message: "Invalid filter format" });
            }
        }

        // 2. Search logic
        if (search) {
            filterObj.$or = [
                { title: { $regex: search, $options: 'i' } }
            ];
        }

        // 3. Sorting
        const sortObj = {};
        sortObj[sort] = order;

        // 4. Fetch filtered, sorted, and paginated blogs
        const blogs = await Blogs.find(filterObj)
            .sort(sortObj)
            .limit(limit)
            .skip(skip);

        // 5. Get total count of matching blogs
        const totalBlogs = await Blogs.countDocuments(filterObj);

        // 6. Return response
        res.status(200).json({
            totalBlogs,
            limit,
            skip,
            currentPage: Math.ceil(skip / limit) + 1,
            totalPages: Math.ceil(totalBlogs / limit),
            data: blogs
        });
    } catch (err) {
        console.log("Error in fetching data:", err);
        res.status(500).json({ message: "Internal server error" });
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
