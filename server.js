const express = require('express');

const { connection } = require("./db");

const { userRouter } = require("./routes/user.route");

require('dotenv').config();

var cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());


app.use("",userRouter);



app.all("*", (req,res)=>{
    
    res.status(404).send({
        "msg":"Error 404 ! Invalid URL"    
    })

})


app.listen(process.env.port , async()=>{


    try {

        await connection;
        console.log("connected to DB")

        
    } catch (error) {
        console.log(error);
    }

})