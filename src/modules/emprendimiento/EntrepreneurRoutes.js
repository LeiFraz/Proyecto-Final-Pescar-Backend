import express from 'express'
import * as entrepreneur from './EntrepreneurController.js'

const entrepreneurRouter = express.Router()

entrepreneurRouter.get('/', entrepreneur.findAll)
entrepreneurRouter.post('/crear', entrepreneur.createEntrepreneur)
entrepreneurRouter.put('/:id', entrepreneur.modifyEntrepreneur)
// entrepreneurRouter.delete('/:id', entrepreneur.deleteEntrepreneur)

export default entrepreneurRouter;