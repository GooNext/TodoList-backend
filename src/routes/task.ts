const router = require('express').Router();
let Task = require('../models/task.model')

type TaskType = { title: String, time: String, icon: String, id: String, categoryId: String, boardId:String, description: String, isCompleted: Boolean }

type RequestType = {
    body: TaskType,
    params: TaskType
};

type ResponceType = {
    status: (value: Number) => any,
    json: (value: Array<TaskType> | String) => TaskType
};

router.route('/:id').get((req: RequestType, res: ResponceType) => {
    Task.findById(req.params.id)
        .then((task: Array<TaskType>) => res.json(task))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/').get((_req: RequestType, res: ResponceType) => {
    Task.find()
        .then((tasks: Array<TaskType>) => res.json(tasks))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/update/boardId/:id').put((req: RequestType, res: ResponceType) => {
    const boardId = req.body.boardId
    Task.findByIdAndUpdate(req.params.id, {boardId})
        .then((tasks: Array<TaskType>) => res.json(tasks))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/update/:id').put((req: RequestType, res: ResponceType) => {
    const title = req.body.title
    const description = req.body.description

    Task.findByIdAndUpdate(req.params.id, {title, description})
        .then((tasks: Array<TaskType>) => res.json(tasks))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/update-status/:id').put((req: RequestType, res: ResponceType) => {
    const isCompleted = req.body.isCompleted

    Task.findByIdAndUpdate(req.params.id, {isCompleted})
        .then((tasks: Array<TaskType>) => res.json(tasks))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/add').post((req: RequestType, res: ResponceType) => {
    const title = req.body.title
    const time = req.body.time
    const icon = req.body.icon
    const categoryId = req.body.categoryId
    const boardId = req.body.boardId
    const description = req.body.description
    const isCompleted = req.body.isCompleted

    const newTask = new Task({
        title,
        time,
        icon,
        categoryId,
        boardId,
        description,
        isCompleted
    });

    newTask.save()
        .then(() => res.json('Task added'))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/by-category/:categoryId').get((req: RequestType, res: ResponceType) => {
    const categoryId = req.body.categoryId

    Task.find()
        .then((tasks: Array<TaskType>) => {
            const filteredTasks = tasks.filter(e => e.categoryId === categoryId)
            res.json(filteredTasks)
        })
        .catch((err: String) => res.status(400).json(err))
})

router.route('/:id').delete((req: RequestType, res: ResponceType) => {
    const id = req.params.id

    Task.findByIdAndDelete(id)
        .then(() => res.json('Task deleted'))
        .catch((err: String) => res.status(400).json(err))
})



module.exports = router;