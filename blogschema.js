const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    shortdescription: {
        type: String
    },
    metatag: {
        type: String,
        required: true,
        unique: true
    },
    canonicalurl: {
        type: String,
        required: true,
        unique: true
    },
    metadescription: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }
});

let Blogs = mongoose.model('blogs', blogSchema);
module.exports = Blogs;
