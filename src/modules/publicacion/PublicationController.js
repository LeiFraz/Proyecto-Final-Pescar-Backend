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

export const findFilters = async(req, res) => {
    try {
        const filtros = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;

        // Leer filtros desde los query params
        const { tipo, categoria, rangoPrecio, descuento, nombre, ordenar } = req.query;

        if (tipo && tipo !== 'Todo') {
            filtros.tipo = tipo.toLowerCase();
        }

        if (categoria) {
            filtros.id_categoria = categoria;
        }
        if(ordenar=="Baratos" || ordenar=="Caros"){
            filtros.precio_actual = { $gte: 1};
        }
        if (rangoPrecio) {
            const [min, max] = rangoPrecio.split('-').map(Number);
            filtros.precio_actual = { $gte: min, $lte: max };
        }

        if (descuento) {
            filtros.descuento = { $gte: Number(descuento) };
        }

        if (nombre) {
            filtros.nombre = { $regex: nombre, $options: 'i' };
        }

        // Obtener total de documentos para la paginación
        const total = await services.getTotal(filtros);
        
        // Llamar al servicio con los filtros y paginación
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
    } catch(error) {
        console.error('Error en findAll (controlador):', error);
        res.status(500).json({error: 'Hubo un error con el servidor'});
    }
};

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
        console.log(body)
        if (body.descuento>0 && body.precio) {
            // Calcular el precio con descuento
            const descuentoDecimal = body.descuento / 100; // Convertir porcentaje a decimal
            const precioConDescuento = body.precio * (1 - descuentoDecimal);

            // Redondear a dos decimales
            body.precio_actual = parseFloat(precioConDescuento.toFixed(2));
            body.precio_original=parseFloat(body.precio.toFixed(2));
        }
        else if(body.descuento==0 && body.precio){
            body.precio_actual = parseFloat(body.precio.toFixed(2));
        }
        else if(body.descuento==0 && body.precio==0){
            body.precio_actual=0;
            body.descuento=0;
        }
        
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