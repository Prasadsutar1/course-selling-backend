const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(DB_URL);

const userSchema = Schema({
    email : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String,

})

const adminSchema = Schema({
    email : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String,
});

const courseSchema = Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId,

});

const purchaseSchema = Schema({
    userId : {
        type : ObjectId,
        ref : 'userModel',
    },
    courseId : {
        type : ObjectId,
        ref : 'courseModel',
    }
});

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,

}