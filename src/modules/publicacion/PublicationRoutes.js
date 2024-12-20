import express from 'express'
import * as publication from './PublicationController.js'

const publicationRouter = express.Router()

publicationRouter.get('/', publication.findAll)
publicationRouter.get('/filtros', publication.findFilters)
publicationRouter.get('/limit', publication.findLimit)
publicationRouter.get('/emprendedor/:id', publication.findByEntrepreneur)
publicationRouter.get('/:id', publication.findById)
publicationRouter.get('/tipo/:tipo_publicacion', publication.findTypePublication)
publicationRouter.post('/crear', publication.createPublication)
publicationRouter.put('/:id', publication.modifyPublication)
publicationRouter.delete('/:id', publication.deletePublication)

export default publicationRouter;