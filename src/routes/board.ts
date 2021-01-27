const boardRouter = require('express').Router();
let Board = require('../models/board.model')

type BoardType = { title: String, time: String, icon: String, id: String, categoryId: String, boardId:String }

type BoardRequestType = {
    body: TaskType,
    params: TaskType
};

type BoardResponceType = {
    status: (value: Number) => any,
    json: (value: Array<TaskType> | String) => TaskType
};

boardRouter.route('/').get((req: RequestType, res: ResponceType) => {
    Board.find()
        .then((board: Array<TaskType>) => res.json(board))
        .catch((err: String) => res.status(400).json(err))
});

boardRouter.route('/add').post((req: RequestType, res: ResponceType) => {
    const title = req.body.title
    const categoryId = req.body.categoryId

    const newBoard = new Board({
        title,
        categoryId,
    });

    newBoard.save()
        .then(() => res.json('Board added'))
        .catch((err: String) => res.status(400).json(err))
});

boardRouter.route('/:id').delete((req: RequestType, res: ResponceType) => {
    const id = req.params.id

    Board.findByIdAndDelete(id)
        .then(() => res.json('Board deleted'))
        .catch((err: String) => res.status(400).json(err))
})


module.exports = boardRouter;