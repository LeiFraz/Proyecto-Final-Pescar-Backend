//Modelo de usuarios, para el uso de mongoDB
import mongoose from 'mongoose';

//Creamos el boceto (esquema)
const userSquema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['admin', 'emprendedor', 'consumidor'],
        default: 'consumidor'
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    direccion: {
        type: String
    },
    telefono: {
        type: Number
    },
})

//Creamos el molde de ese boceto (modelo)
const usersModel = mongoose.model('usuario', userSquema)

export default usersModel;