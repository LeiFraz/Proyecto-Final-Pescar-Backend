import publicationModel from "./PublicationModel.js"

export const findAll = async(req,res) => {
    try {
        const response = await publicationModel.find()
        return response

    } catch(error) {
        return null
    }
}
export const findFilters = async(filtros, skip, limit, ordenar) => {
    try {
        let query = publicationModel.find(filtros || {});
        
        // Aplicar ordenamiento
        if (ordenar) {
            switch(ordenar) {
                case 'A-Z':
                    query = query.sort({ nombre: 1 });
                    break;
                case 'Z-A':
                    query = query.sort({ nombre: -1 });
                    break;
                case 'Baratos':
                    query = query.sort({ 
                        precio: 1,
                    });
                break;
                case 'Convenir':
                    query = query.sort({ 
                        precio: 1,
                    });
                break;
                case 'Caros':
                query = query.sort({ precio: -1 });
                break;
                case 'MasDescuento':
                query = query.sort({ descuento: -1 });
                break;
            }
        }
        
        // Aplicar paginación
        query = query.skip(skip).limit(limit);
        
        // Poblar categoría
        query = query.populate('id_categoria');
        
        const response = await query.exec();
        return response || [];
        
    } catch(error) {
        console.error('Error en findAll (servicio):', error);
        return [];
    }
};
export const getTotal = async(filtros) => {
    try {
        return await publicationModel.countDocuments(filtros || {});
    } catch(error) {
        console.error('Error en getTotal (servicio):', error);
        return 0;
    }
};

export const findById = async(id) => {
    try {
        const response = await publicationModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}

export const findTypePublication = async(tipo_publicacion) => {
    try {  
        const response = await publicationModel.find({tipo : tipo_publicacion})

        return response

    } catch (error) {
        return null
    }
}

export const createPublication = async(body) => {
    try {
        console.log('Datos recibidos en el servicio:', body); // Log temporal
        const eModel = new publicationModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const modifyPublication = async(id, body) => {
    try {

        const publication = await publicationModel.findById(id);

        if (!publication) {
            throw new Error('No se encontró el emprendimiento')
        }

        Object.keys(body).forEach(key => {
            publication[key] = body[key]
        })

        const response = await publication.save();
        
        return response
    } catch (error) {
        return null
    }
}

export const deletePublication = async(id) => {
    try {
        const response = await publicationModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}