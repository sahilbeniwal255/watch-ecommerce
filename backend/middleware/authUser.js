import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success : false, message : 'no authorized'})
    }
    try {
        {/*initally while registering or login token is create using id and jwt secret key
            so here token is decoded and user id is extracted from it and verified*/}
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        {/*this sends id in body for further request*/}
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default authUser;