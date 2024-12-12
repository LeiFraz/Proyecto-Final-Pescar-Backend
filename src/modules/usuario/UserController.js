//Controlador para las validaciones, en este se llama a los servicios
import * as services from './UserServices.js'
import * as entrepreneurServices from '../emprendimiento/EntrepreneurServices.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// export const findAll = async(req, res) => {
//     try{
//         //llamamos al servicio para que haga la consulta
//         const data = await services.findAll();
//         //console.log(data)
//         //comprobamos si trae o no algo
//         if (data.length === 0 || data === null) {
//             res.status(404).json({message: 'No se pudieron encontrar los usuario'})
//             return;
//         }

//         //en caso de que todo este bien, se responde con los datos
//         res.status(201).json(data);
//         return;

//     } catch(error){
//         //tratamos el error y mandamos un mensaje adecuado
//         res.status(500).json({error: 'Hubo un problema con el servidor'})
//     }
// }

// export const createUser = async(req, res) => {
//     try {
//         //recibo un json del front, desde el body
//         const body = req.body;
//         //llamamos al servicio de crear un usuario
//         const data = await services.createUser(body)

//         console.log("estoy en el controlador")
//         console.log(data)
//         if(!data || data === null){ return res.status(400).json({message: 'No se pudo crear el usuario'})}

//         res.status(200).json({message: 'Se creó el usuario exitosamente'})
//         return;

//     } catch(error) {
//         res.status(500).json({error: 'Hubo un problema con el servidor'})
//     }
// }
export const findById = async(req,res) => {
    try {
        const id = req.params.id
        const data = await services.findById(id)

        if (data.length === 0 || data === null){
            res.satatus(404).json({message: 'No se pudo encontrar la publicación'})
            return;
        }

        res.status(200).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}
export const login = async(req,res) => {
    try {
        let id_emprendimiento="";
        let nombre_emprendimiento="";
        const body = req.body

        //DEBERIA HACER LAS VALIDACIONES PRIMERO
        
        if (!body.email || !body.contrasenia){
            res.status(400).json({message: 'No se ingresaron bien los datos.'})
            return;
        }
        
        //buscar el usuario
        const data = await services.login(body)
        
        if (!data || data === null){
            res.status(400).json({message: 'Lo sentimos no se encontró ese usuario.'})
            return;
        }
        const entrepreneurData= await entrepreneurServices.findByUserId(data._id);
        console.log(entrepreneurData)
        if(entrepreneurData.length>0){
            console.log("entra?")
            id_emprendimiento = entrepreneurData[0]._id;
            nombre_emprendimiento = entrepreneurData[0].nombre_emprendimiento;
        }
        console.log(id_emprendimiento)
        const token = jwt.sign({
            idUsuario: data._id,
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
        }, process.env.SECRET_KEY, {expiresIn: '1h'})
        
        res.status(200).json({data, token, id_emprendimiento, nombre_emprendimiento})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }    
}

export const register = async(req,res) =>{
    try {
        const body = req.body
        console.log(body)
        //DEBERIA HACER LAS VALIDACIONES PRIMERO
        if (!body.email || !body.contrasenia){
            res.status(400).json({message: 'Error faltaron datos para registrarse.'})
            return;
        }
        
        //Encriptar la contraseña
        body.contrasenia = await bcrypt.hash(req.body.contrasenia, 10)

        //realizamos el registro
        const data = await services.register(body)

        if (!data || data === null){
            res.status(400).json({message: 'No se pudo realizar el registro.'})
            return;
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}
export const modifyUser = async(req,res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await services.modifyUser(id, body)

        if(!data){
            res.status(404).json({message: 'No se pudo modificar el usuario'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}
