//conexion con mongoose
import mongoose from 'mongoose'

const dbConnect = (URI) => {
    try {
        mongoose.connect(URI);  
        console.log("conectado a la base de datos")  
    } catch (error) {
        console.log(error)
    }  
} 

export default dbConnect;