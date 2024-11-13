//Aqui se usa el modelo para llamar a la base de datos y hacer la consulta

export const findAll = async(req, res) => {
    try {
        //busqueda de un usuario con fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        
        //comprobar el estado de la promesa
        if (!response.ok) return null

        //parsear la respuesta a un json
        const users = await response.json()
        // console.log(users)
        return users;

    } catch (error) {
        return null
    }
}