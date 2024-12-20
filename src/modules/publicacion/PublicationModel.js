import mongoose from 'mongoose'

const publicationSchema = mongoose.Schema({
    id_emprendimiento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'emprendimiento'
    },
    nombre:{
        type:String,
        required:true
    },
    tipo:{
        type: String,
        enum: ['producto', 'servicio'],
        required: true
    },
    fecha_publicacion: {

        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    },
    precio_original: {
        type: Number,
    },
    precio_actual: {
        type: Number,
    },
    descuento:{
        type: Number,
    },
    descripcion: {
        type: String
    },
    id_categoria:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categoria'
    },
    imagenes: {
        type: [String],
        required: false,
        validate: {
            validator: (arr) => {
                //^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$
                ///^(https?:\/\/)?([a-zA-Z0-9.-]+.[a-zA-Z]{2,})(\/.*)?$/
                return arr.every(url => /^(https?:\/\/)?([a-zA-Z0-9.-]+.[a-zA-Z]{2,})(\/.*)?$/.test(url))
            },
            message: 'Debe ingresar urls validas.'
        },
        maxlength: 3
    },
    datos_venta: {
        veces_vendido: { type: Number, default: 0 }, 
        ganancia_total: { type: Number, default: 0 }, 
    },
    calculo_precio: {
        precio_transparente: { type: Boolean, default: false },
        ganancia: { type: Number, default: 0 },
    },
})

const publicationModel = mongoose.model('publicacion', publicationSchema)

export default publicationModel;