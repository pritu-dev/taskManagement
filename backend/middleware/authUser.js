import jwt from "jsonwebtoken";

export const authUser = async(req,res,next) => {
 const token = req.headers.token;

 if(!token){
    return res.json({ message: " User Not Login"});
 }
 
 const decoded = jwt.verify(token, process.env.JWT_SCREAT);
 req.userId = decoded.id;

 next();
}