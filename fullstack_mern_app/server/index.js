import express from 'express'
import mongoose  from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import path from "path"
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import multer  from 'multer'
import authRoute from "./routes/auth.js"
import userroutes from "./routes/user.js"
import  verifyToken from "./middelware/auth.js"
import createpost from "./routes/post.js"
import {register} from "./controllers/auth.js"
import postRoute  from './routes/post.js'
import {users,posts} from "./data/index.js"
import Post from './models/post.js'
import User from './models/User.js'

// Configuration 
const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
dotenv.config();
const app= express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use("/assets",express.static(path.join(__dirname,"public/assets")));
 
// storage 
 const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
 });
 const upload = multer({storage});
//routes with files 

app.post("/auth/register",upload.single("picture"),register);
app.post("/post",verifyToken,upload.single("picture"),createpost);
app.use("/auth",authRoute);
app.use("/users",userroutes);
app.use("/post",postRoute)

 // connect to database mongodb
 const PORT = process.env.PORT ;
 mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
 }).then(()=>{
    app.listen(PORT,()=>{console.log(`mongodb is connected \n the server is listening on port${PORT}`)});
 }).catch((err)=> console.log(err));