
import usedMaterialModel from "./UsedMaterialModel.js"



export const createUsedMaterial = async(body) => {
    try {
        const eModel = new usedMaterialModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const modifyUsedMaterial = async(id, body) => {
    try {

        const material = await usedMaterialModel.findById(id);

        if (!material) {
            throw new Error('No se encontró el material')
        }

        Object.keys(body).forEach(key => {
            material[key] = body[key]
        })

        const response = await material.save();
        
        return response
    } catch (error) {
        return null
    }
}

export const deleteUsedMaterial = async(id) => {
    try {
        const response = await usedMaterialModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}
export const findById = async(id_publicacion) => {
    try {
        const response = await usedMaterialModel.find({ id_publicacion });
        return response;
    } catch (error) {
        return null
    }
}