const {Router} = require("express");
const adminRouter  = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { courseModel ,adminModel } = require("../db");
const JWT_SECRET_A = process.env.JWT_SECRET_A;
const {adminMiddleware} = require("../middleware/adminmiddleware");

adminRouter.post("/signup", async function (req,res)  {
    const email = req.body.email;
    const password =  req.body.password;
    const firstName = req.body.firstname;
    const lastName = req.body.lastName;

    try{
        const response = await adminModel.findOne({ email });
        if(response) {
            res.status(403).json({
                message : "admin already exit on the system",
            });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 5);
        await adminModel.create({
            email : email,
            password : hashPassword,
            firstName : firstName,
            lastName : lastName,
        });

        res.json({
            message : "admin created successfully",
        })
    }
    catch(e){
        console.log(e);
        res.status(403).json({
            message : e,
        })
    }

    
    

});

adminRouter.post("/signin",async function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    
    try{
        const response =  await adminModel.findOne({email});
        if(response){
            const result = await bcrypt.compare(password,response.password);
            if(result){
                const token = jwt.sign({
                    id : response._id,
                },JWT_SECRET_A,{
                    expiresIn : "1h",
                })
                res.json({
                    token : token,
                    message : "login successfull",
                })
                return;
            }
        }
        else{
            res.json({
                message : "admin does not found",
            });
            return;
        }
        
    }
    catch(e){
        console.log(e);
    }
});

adminRouter.post("/Course", adminMiddleware, async function(req,res) {
    const adminId = req.userId;

    const {title ,description , imageUrl , price } = req.body;

    const course = await courseModel.create({
        title :title ,
        description : description,
        imageUrl : imageUrl,
        price : price,
        creatorId : adminId,
    });

    res.json({
        message : "course created successfully",
        courseId : course._id,

    })
});

adminRouter.put("/Course", adminMiddleware, async function(req,res) {
    const adminId = req.userId;

    const {title ,description , imageUrl , price, courseId } = req.body;

    const coursecheck = await courseModel.findOne({
        _id : courseId,
        creatorId : adminId,
    });
    if(!coursecheck){
        res.json("course not found or u cannot edit this course");
        return;
    }

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId,
    },{
        title :title ,
        description : description,
        imageUrl : imageUrl,
        price : price,
        creatorId : adminId,
    });

    res.json({
        message : "course updated successfully",
        courseId : course._id,

    })
});

adminRouter.get("/course/bulk", adminMiddleware , async function (req,res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId :adminId
    })

    res.json({
        message : "your courses are",
        courses,
    })
});
module.exports = {
    adminRouter : adminRouter,
}
