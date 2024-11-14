//Aqui se usa el modelo para llamar a la base de datos y hacer la consulta
import usersModel from './UserModel.js'

export const findAll = async(req, res) => {
    try {
        //busqueda de un usuario con fetch
        const response = await usersModel.find();

        return response;

    } catch (error) {
        return null
    }
}

export const createUser = async(body) => {
    try {
        const uModel = new usersModel(body)
        const response = await uModel.save()

        console.log("dentro del servicio")
        console.log(response)
        return response

    } catch (error) {
        return null
    }
}