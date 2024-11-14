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
