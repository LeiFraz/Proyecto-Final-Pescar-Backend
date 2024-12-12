//rutas establecidas para los usuarios
import express from 'express';
import * as user from './UserController.js'
// import verifyToken from 'src/middleware/verifyToken.js';

const usersRouter = express.Router()

usersRouter.get('/:id', user.findById)
usersRouter.post('/login', user.login)
usersRouter.post('/registro', user.register)
usersRouter.put('/:id', user.modifyUser)

export default usersRouter;