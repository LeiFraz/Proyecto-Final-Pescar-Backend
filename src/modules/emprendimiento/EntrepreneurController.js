import * as services from './EntrepreneurServices.js'

export const findAll = async(req, res) => {
    try {
        const data = await services.findAll()
    
        if (data.length === 0 || data === null) {
            res.status(404).json({message: 'No se encontraron emprendimientos'})
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
            res.satatus(404).json({message: 'No se pudo encontrar el emprendimiento'})
            return;
        }

        res.status(200).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const findTypeEntrepreneur = async(req,res) => {
    try {
        const tipo_emprendimiento = req.params.tipo_emprendimiento
        const data = await services.findTypeEntrepreneur(tipo_emprendimiento)

        if(data.length === 0 || data === null){
            res.status(400).json({message: 'No se pudieron encontrar los emprendimientos de ese tipo'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const createEntrepreneur = async(req,res) => {
    try {
        const body = req.body;
        const data = await services.createEntrepreneur(body);
        
        if(!data || data === null){ 
            res.status(400).json({message: 'No se pudo crear un emprendimiento'})
            return;
        }

        res.status(201).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const modifyEntrepreneur = async(req,res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await services.modifyEntrepreneur(id, body)

        if(!data){
            res.status(404).json({message: 'No se pudo modificar el emprendimiento'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const deleteEntrepreneur = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await services.deleteEntrepreneur(id);

        if(data.deletedCount === 0 || data === null) {
            res.status(400).json({message: 'No se pudo eliminar el emprendimiento.'})
            return;
        }

        res.status(200).json({message: 'Se elimino el emprendimiento exitosamente'})
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}