import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import {router as aiRoutes} from "./routes/aiRoutes.js";
import {router as authRoutes} from "./routes/authRoutes.js";
import {router as sessionRoutes} from "./routes/sessionRoutes.js";  
import {router as questionRoutes} from "./routes/questionRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json()); //middleware

app.get("/", async(req , res)=>{
    res.send("Server is running");
})

const front_end_port = 5173;
//middleware to handle cors 
app.use(cors());

app.use(cors({
    origin : "*",
}))
//routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);


//start server
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
    connectDB();
})


// bcrypt.hash(password, 10);
// bcrypt.compare(password, hashedpsswrd);
// jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "2d"});
//  const authHeader = req.headers["authorization"];
//  const token = authHeader && authHeader.split(" ")[1];
//   jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
//              if(err){
//                  return res.status(403).json({message:"Forbidden, Invalid Token"});
//              }
//              req.user = user;
//              next();
//          });

// moment for time formats
// {motion , animatepresence} from frame-motion for animations
