//Modelo de usuarios, para el uso de mongoDB
import mongoose from 'mongoose';

//Creamos el boceto (esquema)
const materialSquema = mongoose.Schema({
    id_emprendimiento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'emprendimiento'
    },
    nombre: {
        type: String,
        required: true,
    },
    cantidad_base: {
        type: Number,
    },
    unidad_original: {
        type: String,
    },
    cantidad_original:{
        type: Number,
    },
    precio_base:{
        type: Number,
    }
})

//Creamos el molde de ese boceto (modelo)
const materialModel = mongoose.model('material', materialSquema)

export default materialModel;