import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({
    id_emprendimiento: {
        type: ObjectId,
        required: true,
        unique: true
    },
    nombre_servicio: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        //precio se establece en la publicacion o en el producto/servicio?
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: String
        //posibilidad de agregar que tipo de categorias se aceptan o tenemos
    },
    fecha_publicacion: {
        //la fecha publicacion es de la publicacion o del producto/servicio
        //se repite en publicacion, servicio y producto
        type: Date,
        default: Date.now
    }
})

const serviceModel = mongoose.model('servicio', serviceSchema)

export default serviceModel;