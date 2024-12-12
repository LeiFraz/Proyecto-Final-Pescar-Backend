import express from 'express'
import * as material from './MaterialController.js'

const materialRouter = express.Router()

materialRouter.get('/:id', material.findById)
materialRouter.get('/buscar/:id', material.findByEntrepreneurId)
materialRouter.post('/crear', material.createMaterial)
materialRouter.put('/:id', material.modifyMaterial)
materialRouter.delete('/:id', material.deleteMaterial)

export default materialRouter;