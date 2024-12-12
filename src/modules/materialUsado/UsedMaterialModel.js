//Modelo de usuarios, para el uso de mongoDB
import mongoose from 'mongoose';

//Creamos el boceto (esquema)
const usedMaterialSquema = mongoose.Schema({
    id_publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'publicacion'
    },
    id_material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'material',
        required: true
    },
    cantidad_usada: {
        type: Number,
    },
    unidad_original: {
        type: String,
    },
    cantidad_original:{
        type: Number,
    },
    precio:{
        type: Number,
    }
})

//Creamos el molde de ese boceto (modelo)
const usedMaterialModel = mongoose.model('materialUsado', usedMaterialSquema)

export default usedMaterialModel;