//Aqui se usa el modelo para llamar a la base de datos y hacer la consulta
import usersModel from './UserModel.js'
import bcrypt from 'bcrypt'

// export const findAll = async(req, res) => {
//     try {
//         //busqueda de un usuario con fetch
//         const response = await usersModel.find();

//         return response;

//     } catch (error) {
//         return null
//     }
// }

// export const createUser = async(body) => {
//     try {
//         //creo el modelo y lo guardo en una constante
//         const uModel = new usersModel(body)
//         //ejecuto el modelo para guardar lo que viene en el body
//         const response = await uModel.save()

//         console.log("dentro del servicio")
//         console.log(response)
//         return response

//     } catch (error) {
//         return null
//     }
// }

export const login = async(body) => {
    try {
        //buscamos al usuario
        const response = await usersModel.findOne({
            email: body.email
        })

        //verificamos que exista con el correo
        if(!response){
            return null
        }

        //comparamos las contraseñas
        const compare = await bcrypt.compare(body.contrasenia, response.contrasenia);

        if(!compare){
            return null
        }

        return response

    } catch (error) {
        return null
    }
}
export const findById = async(id) => {
    try {
        const response = await usersModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}
export const register = async(body) => {
    try {

        const uModel = new usersModel(body)
        const response = await uModel.save()

        return response

    } catch (error) {
        return null
    }
}
export const modifyUser = async(id, body) => {
    try {

        const user = await usersModel.findById(id);

        if (!user) {
            throw new Error('No se encontró el usuario')
        }

        Object.keys(body).forEach(key => {
            user[key] = body[key]
        })

        const response = await user.save();
        
        return response
    } catch (error) {
        return null
    }
}