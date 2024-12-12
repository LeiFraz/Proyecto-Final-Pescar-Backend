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
export const findLimit = async(req,res) => {
    try {
        const limit = req.params.limit
        const data = await services.findLimit(limit)

        if (data.length === 0 || data === null){
            res.status(404).json({message: 'No se pudo encontrar la categoria'})
            return;
        }

        res.status(200).json(data)
        return;
    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}
export const findFilters = async (req, res) => {
    try {
        const filtros = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30;
        const skip = (page - 1) * limit;

        const {nombre, ordenar } = req.query;

        if (nombre) {
            filtros.nombre = { $regex: nombre, $options: 'i' };
        }

        // Llamar al servicio con los filtros y paginación
        const total = await services.getTotal(filtros);
        const data = await services.findFilters(filtros, skip, limit, ordenar);

        res.status(200).json({
            data,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error('Error en findAll (controlador):', error);
        res.status(500).json({'Error en findAll (controlador):': error});
    }
};
export const findById = async(req,res) => {
    try {
        const id = req.params.id
        const data = await services.findById(id)

        if (data.length === 0 || data === null){
            res.status(404).json({message: 'No se pudo encontrar la categoria'})
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