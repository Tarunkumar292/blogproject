//blogschema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('slug')
var print = console.log.bind(console, '>')

const categorySchema = new Schema({
    category:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
    }
    })

    let CategoryModel =  mongoose.model('category', categorySchema)
    module.exports =CategoryModel

   
