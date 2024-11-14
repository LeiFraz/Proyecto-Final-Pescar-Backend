//rutas establecidas para los usuarios
import express from 'express';
import * as user from './UserController.js'

const usersRouter = express.Router()

usersRouter.get('/', user.findAll)
usersRouter.post('/crear', user.createUser)
// usersRouter.put('/:id', user.modifyUser)
// usersRouter.delete('/:id', user.deleteUser)

export default usersRouter;