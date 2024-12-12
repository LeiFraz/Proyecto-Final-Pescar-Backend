
import orderModel from "./OrderModel.js"



export const createOrder = async(body) => {
    try {
        const eModel = new orderModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        console.log(error)
        return null
    }
}


export const deleteOrder = async(id) => {
    try {
        const response = await orderModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}
export const findByUser = async(id_usuario) => {
    try {
        const response = await orderModel.find({ id_usuario });
        return response;
    } catch (error) {
        return null
    }
}

export const findById = async(id) => {
    try {
        const response = await orderModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}