const express = require("express");
const mongoose = require("mongoose");
const { UserRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const {adminRouter} = require("./routes/admin");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/",(req,res)=> {
    res.send("This is the Express server");
});


app.use(express.json());
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

async function main(){
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT);
    console.log(`running on port ${PORT}`);
}

main();

