const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token , JWT_SECRET);

    if(decoded){
        req.userId = decoded.id;
        next();

        return;
    }else{
        res.json({
            message : " u r not signed in",
        });
        return;
    }
}

module.exports = {
    userMiddleware : userMiddleware,
}