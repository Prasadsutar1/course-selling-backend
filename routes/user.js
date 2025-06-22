const bcrypt = require('bcrypt');
const { userModel, courseModel ,purchaseModel   } = require('../db');
const {Router} = require("express");
const UserRouter = Router();
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const { userMiddleware} = require("../middleware/usermiddleware");

//bcrypt zod jwttoken
UserRouter.post("/signup", async function (req,res)  {
    let email = req.body.email;
    let password = req.body.password;
    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    
    try {
        console.log(email);
        const response = await userModel.findOne({
            email,
        })
        if (response) {
            res.json({
                message : "user already exit on this email",
            })
            return;
        }
        console.log("what");

        const hashPassword = await bcrypt.hash(password, 5);
        await userModel.create({
            email : email,
            password : hashPassword, 
            firstName : firstName,
            lastName : lastName,
        });
        res.json({
            message : "Your account is created successfully",
        })
        return;
    }catch(e){
        console.error("Error during signup:", e);
        res.status(500).json({
            message : "Signup failed",
            error: e.message
        })
        
        return;
    }

    
    });
    
    UserRouter.post("/signin",async function(req,res) {
        const email = req.body.email;
        const password = req.body.password;

        const response = await userModel.findOne({
            email : email,
        });

        if(!response){
            res.json({
                message : "user does not exist ",
            })
            return;
        }
        const checkPass = await bcrypt.compare(password,response.password);
        if(checkPass){
            const token = jwt.sign({
                id: response._id.toString(),
            },JWT_SECRET, {
                expiresIn : '1h'
            });

            res.json({
                token : token,
                message : "login successfull",
            })
            return;
        }
        res.json({
            message : "signin failed",
        })
        return;
    });


    UserRouter.get("/purchases",userMiddleware, async function (req,res) {
        const userId = req.userId;
        const purchases = await purchaseModel.find({userId});
        const courseData = await courseModel.find({id : purchases.map(x => x.courseId)});
        res.json({
            message : "your purchased courses are",
            purchases,
            courseData,
        })
    })
    


module.exports = {
    UserRouter :UserRouter,
}
