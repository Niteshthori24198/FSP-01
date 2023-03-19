const { Router } = require('express');

const fs = require('fs');

const { UserModel } = require("../model/user.model");

const userRouter = Router();


userRouter.post("/register", async (req,res)=>{

    const payload = req.body;

    try {
        
        const newuser = new UserModel(payload);

        await newuser.save()
        res.status(200).send(newuser);

    } catch (error) {
        
        res.status(400).send({
            "msg": error.message
        })

    }

})


async function UserAuthentication (req,res,next){

    const payload = req.body;

    try {
        
        const user = await UserModel.find(payload);

        fs.appendFileSync("logs.txt", `UserName :- ${user[0].username} , Role :- ${user[0].role}\n`);

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send({
            "msg":error.message
        })
    }

}


userRouter.post("/login", UserAuthentication)



userRouter.get("/fetchusers", async (req,res)=>{

    try {
        
        const user_display = await UserModel.find({});

        res.status(200).send(user_display);

    } catch (error) {
        res.status(400).send({

            "msg" : error.message

        })
    }

})


userRouter.get("/getuser/:userID", async (req,res)=>{

    const { userID } =req.params;

    try {
        
        const user_display = await UserModel.findById({_id:userID});

        res.status(200).send(user_display);

    } catch (error) {
        res.status(400).send({

            "msg" : error.message

        })
    }

})




async function validator(req,res,next){

    const { role } = req.query;

    if(role==="Admin"){
        next();
    }
    else{
        return res.status(400).send("Invalid Access to database. Only Admin can do specific tasks")
    }


}



userRouter.patch("/updateuser/:userID", validator,async (req,res)=>{

    const { userID } =req.params;
    const payload = req.body;

    try {
        
        await UserModel.findByIdAndUpdate({_id:userID},payload);

        const updateduser = await UserModel.findById({_id:userID});

        res.status(200).send(updateduser);

    } catch (error) {
        res.status(400).send({
            "msg":error.message
        })
    }

})


userRouter.delete("/deleteuser/:userID", validator,async (req,res)=>{

    const { userID } = req.params;

    try {

        await UserModel.findByIdAndDelete({_id:userID});

        res.status(200).send({
            "msg":"User has been deleted successfully."
        })
        
    } catch (error) {
        res.status(400).send({
            "msg":error.message
        })
    }


})


module.exports = {
    userRouter
}