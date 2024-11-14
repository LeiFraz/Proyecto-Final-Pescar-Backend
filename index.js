//se importa la conexion de la bbdd y las rutas con express de App
import app from './src/app/App.js'
import dbConnect from './src/datebase/dbConnect.js'

import { configDotenv } from 'dotenv'

//permitir variables de entorno
configDotenv();

const PORT = process.env.PORT || 5000;
const URI = process.env.URI || 'mongodb://localhost:27017/Grow';

//conexion con MongoDB
dbConnect(URI)

//escuchar servidor
app.listen(PORT, () => {console.log('Servidor ejecutandose')})