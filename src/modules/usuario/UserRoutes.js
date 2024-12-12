//rutas establecidas para los usuarios
import express from 'express';
import * as user from './UserController.js'
import verifyToken from 'src\middleware\verifyToken.js';

const usersRouter = express.Router()

// usersRouter.get('/', user.findAll)
// usersRouter.post('/crear', user.createUser)
usersRouter.post('/login', verifyToken, user.login)
usersRouter.post('/registro', user.register)
// usersRouter.put('/:id', user.modifyUser)
// usersRouter.delete('/:id', user.deleteUser)

export default usersRouter;