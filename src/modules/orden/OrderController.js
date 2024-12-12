import * as services from './OrderServices.js'

export const findByUser= async(req,res) => {
    try {
        const id_usuario = req.params.id_usuario
        const data = await services.findByUser(id_usuario)

        if (data.length === 0 || data === null){
            res.status(404).json({message: 'No se pudo encontrar el material'})
            return;
        }

        res.status(200).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}


export const createOrder = async (req, res) => {
    try {
        const body = req.body;
        console.log('Body original:', body);
        console.log(body.publicaciones[0])
        const data = await services.createOrder(body);

        if (!data || data === null) {
            return res.status(400).json({ message: 'No se pudo crear el material' });
        }

        res.status(201).json(data);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error con el servidor' });
    }
};



export const deleteOrder = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await services.deleteOrder(id);

        if(data.deletedCount === 0 || data === null) {
            res.status(400).json({message: 'No se pudo eliminar el material.'})
            return;
        }

        res.status(200).json({message: 'Se elimino el material exitosamente'})
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}

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