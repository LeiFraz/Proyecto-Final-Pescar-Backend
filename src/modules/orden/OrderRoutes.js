import express from 'express'
import * as order from './OrderController.js'

const orderRouter = express.Router()

orderRouter.get('/:id', order.findById)
orderRouter.get('/usuario/:id_usuario', order.findByUser)
orderRouter.post('/crear', order.createOrder)
orderRouter.delete('/:id', order.deleteOrder)

export default orderRouter;