const {Router} = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/usermiddleware");
const {purchaseModel, courseModel } = require("../db");

courseRouter.get("/", function(req,res)  {
    res.json({
        message : "Courses",
    })
})

courseRouter.post("/purchase", userMiddleware, async function(req,res)  {
    const userId = req.userId;
    const courseId = req.courseId;

    await purchaseModel.create({
        userId,
        courseId,
    });


    res.json({
        message : "you have succesfully boudht the course",
    })
});

courseRouter.get("/preview", async function(req,res)  {
    const courses = await courseModel.find({});

    res.json({
        message : "courses are",
        courses,
    })
})

module.exports = {
    courseRouter : courseRouter,
}