import mongoose from 'mongoose'

const entrepreneurSchema = mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    nombre_emprendimiento: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    tipo_emprendimiento: {
        type: String,
        enum: ['Producto','Servicio'],
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
})

const entrepreneurModel = mongoose.model('emprendimiento',entrepreneurSchema)

export default entrepreneurModel;