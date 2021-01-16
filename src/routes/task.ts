const router = require('express').Router();
let Task = require('../models/task.model')

type TaskType = { title: String, time: String, icon: String, id: String, categoryId: String }

type RequestType = {
    body: TaskType,
    params: TaskType
};

type ResponceType = {
    status: (value: Number) => any,
    json: (value: Array<TaskType> | String) => TaskType
};

router.route('/').get((_req: RequestType, res: ResponceType) => {
    Task.find()
        .then((tasks: Array<TaskType>) => res.json(tasks))
        .catch((err: String) => res.status(400).json(err))
});

router.route('/add').post((req: RequestType, res: ResponceType) => {
    const title = req.body.title
    const time = req.body.time
    const icon = req.body.icon
    const categoryId = req.body.categoryId

    const newTask = new Task({
        title,
        time,
        icon,
        categoryId
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

module.exports = router;