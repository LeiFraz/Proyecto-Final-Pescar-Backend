import * as services from './CategoryServices.js'

export const findAll = async(req, res) => {
    try {
        const data = await services.findAll()
    
        if (data.length === 0 || data === null) {
            res.status(404).json({message: 'No se encontraron categorias'})
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
            res.satatus(404).json({message: 'No se pudo encontrar la categoria'})
            return;
        }

        res.status(200).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}


export const createCategory = async(req,res) => {
    try {
        const body = req.body;
        const data = await services.createCategory(body);
        
        if(!data || data === null){ 
            res.status(400).json({message: 'No se pudo crear la categoria'})
            return;
        }

        res.status(201).json(data)
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const modifyCategory = async(req,res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await services.modifyCategory(id, body)

        if(!data){
            res.status(404).json({message: 'No se pudo modificar la categoria'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const deleteCategory = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await services.deleteCategory(id);

        if(data.deletedCount === 0 || data === null) {
            res.status(400).json({message: 'No se pudo eliminar la categoria.'})
            return;
        }

        res.status(200).json({message: 'Se elimino la categoria exitosamente'})
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un problema con el servidor'})
    }
}