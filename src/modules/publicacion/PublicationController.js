import * as services from './PublicationServices.js'

export const findAll = async(req, res) => {
    try {
        const data = await services.findAll()
    
        if (data.length === 0 || data === null) {
            res.status(404).json({message: 'No se encontraron publicaciones'})
            return;
        }
    
        res.status(200).json(data)
        return
    } catch(error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
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

export const findTypePublication = async(req,res) => {
    try {
        const tipo_publicacion= req.params.tipo_publicacion
        const data = await services.findTypePublication(tipo_publicacion)

        if(data.length === 0 || data === null){
            res.status(400).json({message: 'No se pudieron encontrar las publicaciones de ese tipo'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const createPublication = async(req,res) => {
    try {
        const body = req.body;
        const data = await services.createPublication(body);
        
        if(!data || data === null){ 
            res.status(400).json({message: error.message})
            return;
        }

        res.status(201).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const modifyPublication = async(req,res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await services.modifyPublication(id, body)

        if(!data){
            res.status(404).json({message: 'No se pudo modificar la publicación'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const deletePublication = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await services.deletePublication(id);

        if(data.deletedCount === 0 || data === null) {
            res.status(400).json({message: 'No se pudo eliminar la publicación.'})
            return;
        }

        res.status(200).json({message: 'Se elimino la publicación exitosamente.'})
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un problema con el servidor.'})
    }
}