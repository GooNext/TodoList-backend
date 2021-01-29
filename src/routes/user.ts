const userRouter = require('express').Router();
const UserModel = require('../models/user.model');

console.log(UserModel)

// router.route('/').get(async (req, res, next) => {
//   try {
//     const users = await usersService.getAll();
//     res.status(200).json(users.map(user => User.toResponse(user)));
//   } catch (err) {
//     return next(err);
//   }
// });

// router.route('/:id').get(async (req, res, next) => {
//   try {
//     const user = await usersService.getUser(req.params.id);
//     if (user) res.status(200).send(User.toResponse(user));
//     else {
//       const err = new Error('Not Found');
//       err.status = 404;
//       return next(err);
//     }
//   } catch (err) {
//     return next(err);
//   }
// });

userRouter.route('/').post(async (req:any, res:any, next:any) => {
        const name = req.body.name
        const login = req.body.login
        const password = req.body.password
    
        const newUser = new UserModel({
            name,
            login,
            password
        });
    
        newUser.save()
            .then(() => res.json('User added'))
            .catch((err: String) => res.status(400).json(err))
});

// router.route('/:id').put(async (req, res, next) => {
//   try {
//     const user = await usersService.updateUser(req.params.id, req.body);
//     if (user) res.status(200).send(User.toResponse(user));
//     else {
//       const err = new Error('Not Found');
//       err.status = 404;
//       return next(err);
//     }
//   } catch (err) {
//     return next(err);
//   }
// });

// router.route('/:id').delete(async (req, res, next) => {
//   try {
//     const message = await usersService.deleteUser(req.params.id);

//     if (message) res.status(204).send(message);
//     else {
//       const err = new Error('Not Found');
//       err.status = 404;
//       return next(err);
//     }
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = userRouter;