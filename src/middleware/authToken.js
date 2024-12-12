import jwt from 'jsonwebtoken'

//Para evitar que se hagan ciertas acciones cuando no se tienen los permisos
const authToken = (req, res, next) => {

    try {
        const existToken = req.headers['authorization']

        if (!existToken || !existToken.startsWith('Bearer ')){
            res.status('401').json({message: 'Acceso no autorizado'})
            return;
        }
    
        const token = existToken.split(' ')[1];

        const jwtoken = jwt.verify(token, process.env.SECRET_KEY)
        
        req.token = jwtoken;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(403).json({ error: 'El token ha expirado, por favor inicie sesión nuevamente' });
        } else {
            res.status(403).json({ error: 'Token invalido' });
        }
    }
}
export default authToken