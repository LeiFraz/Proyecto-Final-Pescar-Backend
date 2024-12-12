import express from 'express'
import * as usedmaterial from './UsedMaterialController.js'

const usedMaterialRouter = express.Router()

usedMaterialRouter.get('/:id', usedmaterial.findById)
usedMaterialRouter.post('/crear', usedmaterial.createUsedMaterial)
usedMaterialRouter.put('/:id', usedmaterial.modifyUsedMaterial)
usedMaterialRouter.delete('/:id', usedmaterial.deleteUsedMaterial)

export default usedMaterialRouter;