import mongoose from 'mongoose';

// Creamos el boceto (esquema)
const orderSchema = mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    publicaciones: [
        {
            id_publicacion: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'publicacion',
                required: true
            },
            cantidad: {
                type: Number,
                required: true
            },
            precio: {
                type: Number,
                required: true
            }
        }
    ],
    precio_total:{
        type: Number,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    
});

// Creamos el molde de ese boceto (modelo)
const orderModel = mongoose.model('orden', orderSchema);

export default orderModel;
