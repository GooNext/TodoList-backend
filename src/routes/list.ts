const listRouter = require('express').Router();
let List = require('../models/list.model')

type listRequestType = {
    body: any
    params: any
};

type listResponceType = {
    status: any,
    json: any
};

listRouter.route('/').get((_req: listRequestType, res:listResponceType) => {
    List.find()
        .then((lists: Array<Object>) => res.json(lists))
        .catch((err: string) => {
            return res.status(400).json('Error: ' + err);
        });
});

listRouter.route('/add').post((req: listRequestType, res:listResponceType) => {
    const title = req.body.title
    const time = req.body.time
    const icon = req.body.icon

    const newList = new List({
        title,
        time,
        icon,
    });
    newList.save()
        .then(() => res.json('List added!'))
        .catch((err:String) => res.status(400).json('Error: ' + err));
});

listRouter.route('/:id').get((req: listRequestType, res:listResponceType) => {
    List.findById(req.params.id)
        .then((list:Object | any) => res.json(list))
        .catch((err:String) => res.status(400).json(err))
});

module.exports = listRouter;