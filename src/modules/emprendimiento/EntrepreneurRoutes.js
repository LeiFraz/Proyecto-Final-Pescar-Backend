import express from 'express'
import * as entrepreneur from './EntrepreneurController.js'

const entrepreneurRouter = express.Router()

entrepreneurRouter.get('/', entrepreneur.findAll)
entrepreneurRouter.get('/filtros', entrepreneur.findFilters)
entrepreneurRouter.get('/limit/:limit', entrepreneur.findLimit)
entrepreneurRouter.get('/:id', entrepreneur.findById)
entrepreneurRouter.get('/tipo/:tipo_emprendimiento', entrepreneur.findTypeEntrepreneur);
entrepreneurRouter.post('/crear', entrepreneur.createEntrepreneur)
entrepreneurRouter.put('/:id', entrepreneur.modifyEntrepreneur)
entrepreneurRouter.delete('/:id', entrepreneur.deleteEntrepreneur)

export default entrepreneurRouter;