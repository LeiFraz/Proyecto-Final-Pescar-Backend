//Modelo de usuarios, para el uso de mongoDB
import mongoose from 'mongoose';

//Creamos el boceto (esquema)
const categorySquema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    imagen:{
        type: String
    }
})

//Creamos el molde de ese boceto (modelo)
const categoryModel = mongoose.model('categoria', categorySquema)

export default categoryModel;