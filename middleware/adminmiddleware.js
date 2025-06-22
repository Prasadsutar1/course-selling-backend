const jwt = require("jsonwebtoken");
const JWT_SECRET_A = process.env.JWT_SECRET_A;
console.log(JWT_SECRET_A);
function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token , JWT_SECRET_A);
    console.log(token)
    if(decoded){
        req.userId = decoded.id;
        next();

    }else{
        res.json({
            message : " u r not signed in",
        });
        return;
    }
}

module.exports = {
    adminMiddleware : adminMiddleware,
}