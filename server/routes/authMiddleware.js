import jwt from "jsonwebtoken";

const protect = async(req, res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({message:"Unauthorized"});
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
            if(err){
                return res.status(403).json({message:"Forbidden, Invalid Token"});
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log("token error " , error);
        return res.status(500).json({message:"Token Failed",error: error});
    }
}

export {protect};