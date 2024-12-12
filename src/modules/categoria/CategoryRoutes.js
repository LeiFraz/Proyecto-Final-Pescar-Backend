import express from 'express'
import * as category from './CategoryController.js'

const categoryRouter = express.Router()

categoryRouter.get('/', category.findAll)
categoryRouter.get('/filtros', category.findFilters)
categoryRouter.get('/limit/:limit', category.findLimit)
categoryRouter.get('/:id', category.findById)
categoryRouter.post('/crear', category.createCategory)
categoryRouter.put('/:id', category.modifyCategory)
categoryRouter.delete('/:id', category.deleteCategory)

export default categoryRouter;