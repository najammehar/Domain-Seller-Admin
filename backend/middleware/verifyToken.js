import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
    const token = req.cookies.token
    
    if(!token){

        return res.status(401).json({success:false, message: "Unauthorized token"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        res.status(500).json({success:false, message: error.message});
    }
}