import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            msg: "No token provided"
        });
    }
    const token = authHeader.substring(7);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        
    }
} 

export default authToken;