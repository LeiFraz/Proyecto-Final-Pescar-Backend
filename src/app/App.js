//aqui va lo de express, el puerto, el escuchador
import express from 'express';
import cors from 'cors'

//importacion de rutas
import usersRouter from '../modules/usuario/UserRoutes.js';
import entrepreneurRouter from '../modules/emprendimiento/EntrepreneurRoutes.js'

//instancia de express
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//MIDDLEWARE
app.use(cors())

//RUTAS
app.use('/api/usuario', usersRouter);
app.use('/api/emprendimiento', entrepreneurRouter)

app.use(express.static('public'));

export default app;