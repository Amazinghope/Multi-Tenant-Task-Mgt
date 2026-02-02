const jwt = require("jsonwebtoken")
const User = require("../models/user")


const checkAuth = async (req, res, next) =>{
let token;

// Check auth-header
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {// Extract token
        token = req.headers.authorization.split(" ")[1]

        // verify token
        const decoded = jwt.verify(process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        next();// move to next middleware
    } catch (error) {
        res.status(401).json({
            message: "Not Authorized, token failed"
        })
    }
}
   if(!token){
       return res.status(401).json({
        message: "Not authorized, no token"
       })
   }
}

module.exports = checkAuth