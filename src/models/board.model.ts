import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {type: String, required: true},
    categoryId: {type: String, required: true}
},
    {timestamps: true}
)

const Board = mongoose.model('Board', boardSchema)

module.exports = Board