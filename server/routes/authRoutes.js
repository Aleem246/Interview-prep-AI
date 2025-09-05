import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { protect } from "./authMiddleware.js";

const router = express.Router();

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "2d"});
}

router.post("/register",async(req , res)=>{
    try{
        const {name , email , password , avatar} = req.body;
        
        if(name.length < 3){
            return res.status(400).json({message : "Username must be more than 3 characters"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password must be greater than 5 characters "})
        }
        
        const hashpsswrd = await bcrypt.hash(password, 10);
        const newUser = new User({
            name ,
            email,
            password : hashpsswrd,
            avatar ,

        }) ;
        await newUser.save();
        
        return res.status(200).json({
            _id : newUser._id,
            name : newUser.name,
            email : newUser.email,
            token : generateToken(newUser._id)
        });

    }catch(Err){
        res.status(500).json({message:"Internal Server Error"});
    }
});


router.post("/login",async(req, res)=>{
    try{

        const { email , password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message : " User does not exist"});
        }
        const isMatch = await bcrypt.compare(password , existingUser.password);
        if(!isMatch){
            return res.status(400).json({message : "Incorrect Password"});
        }
        
        const token = generateToken(existingUser._id);
        
        return res.json({
            _id : existingUser._id,
            name : existingUser.name,
            email : existingUser.email,
            token : token
        })
    }catch(Err){
        console.log(Err.message);
        return res.status(500).json({message:"Internal Server Error", Err});
    }


});

router.get("/profile" ,protect , async(req , res)=>{
    try{
        const {id} = req.user;
        const user = await User.findById(id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.json({data:user});
    }catch(Err){
        return res.status(500).json({message:"Internal Server Error", Err});
    }
})

export {router};