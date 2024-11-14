import mongoose from 'mongoose'

const publicationSchema = mongoose.Schema({
    id_usuario: {
        type: ObjectId,
        required: true,
        unique: true
    },
    id_producto_servicio: {
        type: ObjectId,
        required: true,
        unique: true
    },
    fecha_publicacion: {
        //la fecha publicacion es de la publicacion o del producto/servicio
        //se repite en publicacion, servicio y producto
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    },
    precio: {
        //precio se establece en la publicacion o en el producto/servicio?
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    imagenes: {
        type: [String],
        validate: {
            validator: (arr) => {
                //^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$
                ///^(https?:\/\/)?([a-zA-Z0-9.-]+.[a-zA-Z]{2,})(\/.*)?$/
                return arr.every(url => /^(https?:\/\/)?([a-zA-Z0-9.-]+.[a-zA-Z]{2,})(\/.*)?$/.test(url))
            },
            message: 'Debe ingresar urls validas.'
        },
        maxlength: 3
    }
})

const publicationModel = mongoose.model('publicacion', publicationSchema)

export default publicationModel;