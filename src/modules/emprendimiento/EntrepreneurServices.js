import entrepreneurModel from "./EntrepreneurModel.js"

export const findAll = async(req,res) => {
    try {
        const response = await entrepreneurModel.find()
        return response

    } catch(error) {
        return null
    }
}

export const findById = async(id) => {
    try {
        const response = await entrepreneurModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}

export const findTypeEntrepreneur = async(tipo_emprendimiento) => {
    try {  
        const response = await entrepreneurModel.find({tipo_emprendimiento: tipo_emprendimiento})

        return response

    } catch (error) {
        return null
    }
}

export const createEntrepreneur = async(body) => {
    try {
        const eModel = new entrepreneurModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        return null
    }
}

export const modifyEntrepreneur = async(id, body) => {
    try {

        const entrepreneur = await entrepreneurModel.findById(id);

        if (!entrepreneur) {
            throw new Error('No se encontró el emprendimiento')
        }

        Object.keys(body).forEach(key => {
            entrepreneur[key] = body[key]
        })

        const response = await entrepreneur.save();
        
        return response
    } catch (error) {
        return null
    }
}

export const deleteEntrepreneur = async(id) => {
    try {
        const response = await entrepreneurModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}