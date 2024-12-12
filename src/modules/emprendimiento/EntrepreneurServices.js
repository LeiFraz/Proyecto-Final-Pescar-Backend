import entrepreneurModel from "./EntrepreneurModel.js"

export const findAll = async(req,res) => {
    try {
        const response = await entrepreneurModel.find()
        return response

    } catch(error) {
        return null
    }
}
export const findFilters = async(filtros, skip, limit, ordenar) => {

    try {

        let query = entrepreneurModel.find(filtros || {});
        
        if (ordenar) {
            switch (ordenar) {
                case 'A-Z':
                    query = query.sort({ nombre_emprendimiento: 1 });
                    break;
                case 'Z-A':
                    query = query.sort({ nombre_emprendimiento: -1 });
                    break;
                default:
                    break;
            }
        }
        
        query = query.skip(skip).limit(limit);
        
        const response = await query.exec();
        return response || [];
        
    } catch(error) {
        console.error('Error en findAll (servicio):', error);
        return [];
    }
};
export const getTotal = async(filtros) => {

    try {
        return await entrepreneurModel.countDocuments(filtros || {});
    } catch(error) {
        console.error('Error en getTotal (servicio):', error);
        return 0;
    }
};
export const findById = async(id) => {
    try {
        const response = await entrepreneurModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}

export const findByUserId = async(id_usuario) => {
    try {
        const response = await entrepreneurModel.find({ id_usuario })
        return response;
    } catch (error) {
        return null
    }
}

export const findTypeEntrepreneur = async(tipo_emprendimiento) => {
    try {  
        const response = await entrepreneurModel.find({tipo_emprendimiento: tipo_emprendimiento})

        return response

    } catch (error) {
        return null
    }
}

export const createEntrepreneur = async(body) => {
    try {
        const eModel = new entrepreneurModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        return null
    }
}

export const modifyEntrepreneur = async(id, body) => {
    try {

        const entrepreneur = await entrepreneurModel.findById(id);

        if (!entrepreneur) {
            throw new Error('No se encontró el emprendimiento')
        }

        Object.keys(body).forEach(key => {
            entrepreneur[key] = body[key]
        })

        const response = await entrepreneur.save();
        
        return response
    } catch (error) {
        return null
    }
}

export const deleteEntrepreneur = async(id) => {
    try {
        const response = await entrepreneurModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}