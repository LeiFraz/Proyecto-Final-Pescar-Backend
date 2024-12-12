//aqui va lo de express, el puerto, el escuchador
import express from 'express';
import cors from 'cors'

//importacion de rutas
import usersRouter from '../modules/usuario/UserRoutes.js';
import entrepreneurRouter from '../modules/emprendimiento/EntrepreneurRoutes.js'
import publicationRouter from '../modules/publicacion/PublicationRoutes.js'
import categoryRouter from '../modules/categoria/CategoryRoutes.js';
import materialRouter from '../modules/material/MaterialRoutes.js';
import usedMaterialRouter from '../modules/materialUsado/UsedMaterialRoutes.js';
import orderRouter from '../modules/orden/OrderRoutes.js';

//instancia de express
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//MIDDLEWARE
app.use(cors())

//RUTAS
app.use('/api/usuario', usersRouter);
app.use('/api/emprendimiento', entrepreneurRouter)
app.use('/api/publicacion', publicationRouter)
app.use('/api/categoria', categoryRouter)
app.use('/api/material', materialRouter)
app.use('/api/materialusado', usedMaterialRouter)
app.use('/api/orden', orderRouter)

app.use(express.static('public'));

export default app;