import categoryModel from "./CategoryModel.js"

export const findAll = async(req,res) => {
    try {
        const response = await categoryModel.find()
        return response

    } catch(error) {
        return null
    }
}

export const findById = async(id) => {
    try {
        const response = await categoryModel.findById(id)
        return response;
    } catch (error) {
        return null
    }
}


export const createCategory = async(body) => {
    try {
        const eModel = new categoryModel(body);
        const response = await eModel.save()

        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const modifyCategory = async(id, body) => {
    try {

        const category = await categoryModel.findById(id);

        if (!category) {
            throw new Error('No se encontró la categoria')
        }

        Object.keys(body).forEach(key => {
            category[key] = body[key]
        })

        const response = await category.save();
        
        return response
    } catch (error) {
        return null
    }
}

export const deleteCategory = async(id) => {
    try {
        const response = await categoryModel.deleteOne({_id: id})
        
        return response;
    } catch (error) {
        return null
    }
}