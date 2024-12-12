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
export const findFilters = async (req, res) => {
    try {
        const filtros = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30;
        const skip = (page - 1) * limit;

        const { tipo, nombre, ordenar } = req.query;

        // Filtrar por tipo, incluyendo "Ambos"
        if (tipo) {
            filtros.tipo_emprendimiento = { $in: [tipo, 'Ambos'] };  // Filtra por el tipo y "Ambos"
        }

        // Filtrar por nombre o descripción (usando $or)
        if (nombre) {
            filtros.$or = [
                { nombre_emprendimiento: { $regex: nombre, $options: 'i' } },
                { descripcion: { $regex: nombre, $options: 'i' } }
            ];
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