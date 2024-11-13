//se importa la conexion de la bbdd y las rutas con express de App
import app from './src/app/App.js'
// import dbConnect from './src/datebase/dbConnect.js'
import { configDotenv } from 'dotenv'

//permitir variables de entorno
configDotenv();

const PORT = process.env.PORT || 5000;
// const URI = process.env.URI || 'https://jsonplaceholder.typicode.com/todos';

//conexion con MongoDB

app.listen(PORT, () => {console.log('Servidor ejecutandose')})