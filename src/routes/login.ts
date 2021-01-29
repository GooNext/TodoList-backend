const loginRouter = require('express').Router();
const jwtLogin = require('jsonwebtoken');
const bcryptLogin = require('bcryptjs');
const UserModelLogin = require('../models/user.model')

const getLoginPasswordUser = async (login:any) => {
  const user = await UserModelLogin.findOne({ login });
  console.log(user)
  return user;
  };
  
console.log(jwtLogin)

loginRouter.route('/').post(async (req:any, res:any, next:any) => {
  try {
    const user = await getLoginPasswordUser(req.body.login);
    if (user && req.body.login && req.body.password) {
        bcryptLogin.compare(req.body.password, user.password, (err:any, result:any) => {
        if (err) {
          return next(err);
        }
        if (result) {
          const token = jwtLogin.sign(
            {
              userId: user.id,
              login: user.login
            },
            process.env.JWT_SECRET_KEY,
            { algorithm: 'HS256' },
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).send({ token });
        }
      });
    } else {
      const errors = new Error('User not found');
      return next(errors);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = loginRouter;