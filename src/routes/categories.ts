const categoryRouter = require('express').Router();
let Category = require('../models/categories.model')
let TaskModel = require('../models/task.model')

type categoryRequestType = {
    body: TaskType
    params: any
};

type categoryResponceType = {
    status: (value: Number) => any,
    json: (value: Array<TaskType> | String | Object) => TaskType
};

categoryRouter.route('/').get((_req: categoryRequestType, res: categoryResponceType) => {
    Category.find()
        .then((categories: Array<Object>) => res.json(categories))
        .catch((err: string) => {
            return res.status(400).json('Error: ' + err);
        });
});

categoryRouter.route('/add').post((req: categoryRequestType, res: categoryResponceType) => {
    const title = req.body.title
    const time = req.body.time
    const icon = req.body.icon

    const newCategory = new Category({
        title,
        time,
        icon,
    });
    newCategory.save()
        .then(() => res.json('Category added!'))
        .catch((err: String) => res.status(400).json('Error: ' + err));
});

categoryRouter.route('/:id').get((req: categoryRequestType, res: categoryResponceType) => {
    Category.findById(req.params.id)
        .then((list: Object) => res.json(list))
        .catch((err: String) => res.status(400).json(err))
});

categoryRouter.route('/:id').delete((req: RequestType, res: ResponceType) => {
    const id = req.params.id

    Category.findByIdAndDelete(id)
        .then(() => {
            res.json('Category deleted')
        })
        .catch((err: String) => res.status(400).json(err))
})

module.exports = categoryRouter;