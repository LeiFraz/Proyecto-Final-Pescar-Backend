import * as services from './UsedMaterialServices.js'
import * as materialServices from '../material/MaterialServices.js'

export const findById = async(req,res) => {
    try {
        const id_publicacion = req.params.id
        const data = await services.findById(id_publicacion)

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


export const createUsedMaterial = async (req, res) => {
    try {
        const body = req.body;
        console.log('Body original:', body);

        // Asegurarse de que cantidad_usada es un número válido
        if (body.cantidad_usada) {
            // Convierte cantidad_usada a número flotante
            body.cantidad_usada = parseFloat(body.cantidad_usada);

            // Si la conversión no fue exitosa (NaN), devolver un error
            if (isNaN(body.cantidad_usada)) {
                return res.status(400).json({ message: 'Cantidad usada no válida' });
            }
        } else {
            return res.status(400).json({ message: 'Cantidad usada no proporcionada' });
        }

        // Verificar la unidad_original y ajustar la cantidad usada
        const unidad = body.unidad_original;
        if (unidad) {
            switch (unidad) {
                case 'kg':
                    body.cantidad_usada = body.cantidad_usada * 1000;
                    break;
                case 'g':
                    body.cantidad_usada = body.cantidad_usada; // No cambia si ya está en gramos
                    break;
                case 'm':
                    body.cantidad_usada = body.cantidad_usada * 100;
                    break;
                default:
                    body.cantidad_usada = body.cantidad_usada;  // No cambiar si no hay unidad
            }
        }

        console.log('Cantidad usada después de ajuste por unidad:', body.cantidad_usada);

        // Obtener el material original
        const material = await materialServices.findById(body.id_material);
        const precio_unitario = material.precio_base / material.cantidad_base;
        body.precio = parseFloat(precio_unitario * body.cantidad_usada).toFixed(2);  // Calcular el precio
        body.precio = parseFloat(body.precio);  // Convertir el precio a número

        const data = await services.createUsedMaterial(body);

        if (!data || data === null) {
            return res.status(400).json({ message: 'No se pudo crear el material' });
        }

        res.status(201).json(data);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error con el servidor' });
    }
};


export const modifyUsedMaterial = async(req,res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await services.modifyUsedMaterial(id, body)

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

export const deleteUsedMaterial = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await services.deleteUsedMaterial(id);

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