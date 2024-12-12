import materialModel from "./MaterialModel.js"

export const findById = async(id) => {
    try {
        const response = await materialModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}

export const findByEntrepreneurId = async(id_emprendimiento) => {
    try {
        const response = await materialModel.find({ id_emprendimiento });
        return response;
    } catch (error) {
        return null
    }
}


export const createMaterial = async(body) => {
    try {
        const eModel = new materialModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const modifyMaterial = async(id, body) => {
    try {

        const material = await materialModel.findById(id);

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

export const deleteMaterial = async(id) => {
    try {
        const response = await materialModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}