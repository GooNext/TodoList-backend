import express from 'express'
import mongoose from 'mongoose'
const cors = require('cors')
const taskRouter = require('./routes/task')
const categoriesRouter = require('./routes/categories')
const boardRouter = require('./routes/board')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const logAuth = require('./middleware/logAuth')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri: any = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,useFindAndModify: false})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

// app.use(logRequest);


app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/tasks', logAuth, taskRouter)
app.use('/categories', logAuth, categoriesRouter)
app.use('/boards', logAuth, boardRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})