import jwt from 'jsonwebtoken'

//verificar si el Token existe, para que no inicie sesion 2 veces,
//también para que el front redirija como corresponda
const verifyToken = (req, res, next) => {

    try {
        const existToken = req.headers['authorization']
        console.log(existToken)
        if (existToken){
            res.status('401').json({message: 'Ya tiene una sesion iniciada'})
            return;
        }
    
        next();

    } catch (error) {
        res.status(403).json({error: 'Su token expiro'})
    }
}
export default verifyToken;