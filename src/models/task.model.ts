import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true},
    time: {type: String, required: true},
    icon: {type: String, required: true, default: ''},
    categoryId: {type: String, required: true},
    boardId: {type: String, required: true},
    description: {type: String, required: false},
    isCompleted: {type: Boolean, required: true}
},
    {timestamps: true}
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task