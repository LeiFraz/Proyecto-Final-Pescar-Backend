//Controlador para las validaciones, en este se llama a los servicios
import * as servicesU from './UserServices.js'

export const findAll = async(req, res) => {
    try{
        //llamamos al servicio para que haga la consulta
        const data = await servicesU.findAll();

        //comprobamos si trae o no algo
        if (data.length === 0 || data === null) {
            res.status(404).json({message: 'No se pudieron encontrar los usuario'})
        }

        //en caso de que todo este bien, se responde con los datos
        res.status(200).json(data);

    } catch(error){
        //tratamos el error y mandamos un mensaje adecuado
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}