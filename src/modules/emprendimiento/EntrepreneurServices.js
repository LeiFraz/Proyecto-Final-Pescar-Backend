import entrepreneurModel from "./EntrepreneurModel.js"

export const findAll = async(req,res) => {
    try {
        const response = await entrepreneurModel.find()
        return response

    } catch(error) {
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