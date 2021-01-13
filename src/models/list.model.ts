import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {type: String, required: true},
    icon: {type: String, required: true, default: ''},
    tasks: []
},
    {timestamps: true}
)

const List = mongoose.model('List', listSchema)

module.exports = List