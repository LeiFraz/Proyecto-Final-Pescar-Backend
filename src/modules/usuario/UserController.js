//Controlador para las validaciones, en este se llama a los servicios
import * as servicesU from './UserServices.js'

export const findAll = async(req, res) => {
    try{
        //llamamos al servicio para que haga la consulta
        const data = await servicesU.findAll();
        //console.log(data)
        //comprobamos si trae o no algo
        if (data.length === 0 || data === null) {
            res.status(404).json({message: 'No se pudieron encontrar los usuario'})
            return;
        }

        //en caso de que todo este bien, se responde con los datos
        res.status(200).json(data);
        return;

    } catch(error){
        //tratamos el error y mandamos un mensaje adecuado
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}

export const createUser = async(req, res) => {
    try {
        //recibo un json del front, desde el body
        const body = req.body;
        //llamamos al servicio de crear un usuario
        const data = await servicesU.createUser(body)

        console.log("estoy en el controlador")
        console.log(data)
        if(!data || data === null){ return res.status(400).json({message: 'No se pudo crear el usuario'})}

        res.status(200).json({message: 'Se creó el usuario exitosamente'})
        return;

    } catch(error) {
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}

