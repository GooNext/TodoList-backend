const router = require('express').Router();
let Task = require('../models/task.model')
let listForTask = require('../models/list.model')

type RequestType = {
    body: any
};

type ResponceType = {
    status: any,
    json: any
};

router.route('/').get((_req: RequestType, res:ResponceType) => {
    let allTasks:Array<Object> = []
    listForTask.find()
        .then((task:Array<any>) => {
            task.map((item:Object | any) => allTasks = allTasks.concat(item.tasks))
            return res.json(allTasks)
        })
        .catch((err:String) => res.status(400).json(err))
});

router.route('/add').post((req: RequestType, res:ResponceType) => {
    const title = req.body.title
    const time = req.body.time
    const icon = req.body.icon
    const listId = req.body.id

    const newTask = new Task({
        title,
        time,
        icon,
    });

    listForTask.findById(listId)
        .then((list:any) => {
            list.tasks.push(newTask)
            list.save()
        })
        .then(() => res.json('Task added!'))
        .catch((err:String) => res.status(400).json(err))
    newTask.save()
        .catch((err:String) => res.status(400).json(err))
});

module.exports = router;