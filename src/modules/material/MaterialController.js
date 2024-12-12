import * as services from './MaterialServices.js'

export const findById = async(req,res) => {
    try {
        const id = req.params.id
        const data = await services.findById(id)

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
export const findByEntrepreneurId = async(req,res) => {
    try {
        const id_emprendimiento = req.params.id
        const data = await services.findByEntrepreneurId(id_emprendimiento)

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


export const createMaterial = async(req,res) => {
    try {
        const body = req.body;
        body.cantidad_original=parseFloat(body.cantidad_original.toFixed(2));
        body.precio_base=parseFloat(body.precio_base.toFixed(2));
        const unidad=body.unidad_original;
    
        if (unidad) {
            switch(unidad) {
                case 'kg':
                    body.cantidad_base=body.cantidad_original*1000
                    break;
                case 'l':
                    body.cantidad_base=body.cantidad_original*1000
                    break;
                case 'm':
                    body.cantidad_base=body.cantidad_original*100
                    break;
                default:
                    body.cantidad_base=body.cantidad_original;
            }   
        }
        const data = await services.createMaterial(body);
        
        if(!data || data === null){ 
            res.status(400).json({message: 'No se pudo crear el material'})
            return;
        }

        res.status(201).json(data)
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const modifyMaterial = async(req,res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await services.modifyMaterial(id, body)

        if(!data){
            res.status(404).json({message: 'No se pudo modificar el material'})
            return;
        }

        res.status(200).json(data)
        return;

    } catch (error) {
        res.status(500).json({error: 'Hubo un error con el servidor'})
    }
}

export const deleteMaterial = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await services.deleteMaterial(id);

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